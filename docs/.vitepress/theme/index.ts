import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h, onMounted, watch } from 'vue'
import ProductAsideNav from './components/ProductAsideNav.vue'
import HomeProductGrid from './components/HomeProductGrid.vue'
import './custom.css'

type GitHubReleaseAsset = {
  name: string
  browser_download_url: string
}

type GitHubReleaseResponse = {
  assets?: GitHubReleaseAsset[]
}

const latestExeCache = new Map<string, string>()

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fallback to execCommand below.
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', 'true')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

const PROXY_PREFIX = 'https://gh.llkk.cc/'

async function getLatestExeUrl(repo: string): Promise<string | null> {
  if (latestExeCache.has(repo)) {
    return latestExeCache.get(repo) ?? null
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as GitHubReleaseResponse
    const assets = data.assets ?? []

    const exeAsset =
      assets.find((asset) => /setup/i.test(asset.name) && /\.exe$/i.test(asset.name)) ??
      assets.find((asset) => /\.exe$/i.test(asset.name))

    if (!exeAsset?.browser_download_url) {
      return null
    }

    // 添加代理前缀
    const proxyUrl = `${PROXY_PREFIX}${exeAsset.browser_download_url}`

    latestExeCache.set(repo, proxyUrl)
    return proxyUrl
  } catch {
    return null
  }
}

function hydrateCopyableCommands(): void {
  if (typeof document === 'undefined') {
    return
  }

  const blocks = Array.from(document.querySelectorAll<HTMLElement>('pre[data-copyable-cmd]'))
  if (blocks.length === 0) {
    return
  }

  blocks.forEach((block) => {
    if (block.dataset.copyHydrated === 'true') {
      return
    }

    const code = block.querySelector('code')
    if (!code) {
      return
    }

    const hostList = block.previousElementSibling
    const hostItem =
      hostList?.tagName === 'OL' && hostList.classList.contains('pb-steps')
        ? hostList.lastElementChild
        : null

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'pb-step-copy-btn'
    button.textContent = '复制'

    button.addEventListener('click', async () => {
      const text = code.textContent?.trim() ?? ''
      if (!text) {
        return
      }

      const ok = await copyTextToClipboard(text)
      button.textContent = ok ? '已复制' : '复制失败'
      window.setTimeout(() => {
        button.textContent = '复制'
      }, 1400)
    })

    if (hostItem instanceof HTMLLIElement) {
      hostItem.classList.add('pb-step-copy-host')
      hostItem.appendChild(button)
    } else {
      // Fallback: if list item is missing, still keep copy capability.
      block.appendChild(button)
    }

    block.dataset.copyHydrated = 'true'
  })
}

async function hydrateLatestExeLinks(): Promise<void> {
  if (typeof document === 'undefined') {
    return
  }

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-latest-exe-repo]'))
  if (links.length === 0) {
    return
  }

  await Promise.all(
    links.map(async (link) => {
      const repo = link.dataset.latestExeRepo?.trim()
      if (!repo) {
        return
      }

      const latestExeUrl = await getLatestExeUrl(repo)
      if (!latestExeUrl) {
        return
      }

      link.href = latestExeUrl
      link.setAttribute('data-latest-exe-ready', 'true')
    })
  )
}

function syncHomeContentBounds(): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  const root = document.documentElement

  if (window.innerWidth < 960) {
    root.style.removeProperty('--pb-home-bound-left')
    root.style.removeProperty('--pb-home-bound-right')
    return
  }

  const brandLink = document.querySelector<HTMLElement>('header a[href="/"]')
  const disclaimerLink = document.querySelector<HTMLElement>('header a[href="/risk/disclaimer"]')
  const navBody = document.querySelector<HTMLElement>('.VPNavBar .content-body')

  if (!brandLink || (!disclaimerLink && !navBody)) {
    root.style.removeProperty('--pb-home-bound-left')
    root.style.removeProperty('--pb-home-bound-right')
    return
  }

  const brandRect = brandLink.getBoundingClientRect()
  const rightAnchorRect = (disclaimerLink ?? navBody)?.getBoundingClientRect()
  if (!rightAnchorRect) {
    root.style.removeProperty('--pb-home-bound-left')
    root.style.removeProperty('--pb-home-bound-right')
    return
  }

  const viewportWidth = root.clientWidth
  root.style.setProperty('--pb-home-bound-left', `${Math.round(brandRect.left)}px`)
  root.style.setProperty('--pb-home-bound-right', `${Math.max(0, Math.round(viewportWidth - rightAnchorRect.right))}px`)
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    DefaultTheme.enhanceApp?.({ app, router, siteData })
    app.component('HomeProductGrid', HomeProductGrid)
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-before': () => h(ProductAsideNav)
    })
  },
  setup() {
    const route = useRoute()

    const patchPageEnhancements = () => {
      void hydrateLatestExeLinks()
      hydrateCopyableCommands()
      syncHomeContentBounds()
    }

    onMounted(() => {
      patchPageEnhancements()
      window.addEventListener('resize', patchPageEnhancements)
    })

    watch(
      () => route.path,
      () => {
        if (typeof window !== 'undefined') {
          window.setTimeout(patchPageEnhancements, 0)
        }
      }
    )
  }
}
