import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h, onMounted, watch } from 'vue'
import ProductAsideNav from './components/ProductAsideNav.vue'
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

    latestExeCache.set(repo, exeAsset.browser_download_url)
    return exeAsset.browser_download_url
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

export default {
  extends: DefaultTheme,
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
    }

    onMounted(() => {
      patchPageEnhancements()
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
