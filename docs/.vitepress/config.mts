import { defineConfig } from 'vitepress'

const githubRepository = process.env.GITHUB_REPOSITORY ?? ''
const [githubOwner, githubRepo] = githubRepository.split('/')
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const isUserOrOrgPages =
  !!githubOwner &&
  !!githubRepo &&
  githubRepo.toLowerCase() === `${githubOwner.toLowerCase()}.github.io`

const base = isGithubActions && githubRepo && !isUserOrOrgPages ? `/${githubRepo}/` : '/'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'PanBox',
  description: '自托管的网盘工具套件：搜索 / 自动转存 / 同步',

  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    siteTitle: 'PanBox',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '文档',
        items: [
          { text: '服务器购买', link: '/server-purchase' },
          { text: '域名购买与指向', link: '/domain-setup' },
          { text: 'NginxWebUI 反向代理安装', link: '/nginxwebui-reverse-proxy' },
          { text: 'PanBox Search', link: '/products/search/overview' },
          { text: 'PanBox Autosave', link: '/products/autosave/overview' },
          { text: 'PanBox Sync', link: '/products/sync/overview' }
        ]
      },
      { text: '免责', link: '/risk/disclaimer' }
    ],

    sidebar: {
      '/': [
        {
          text: '文档',
          items: [
            { text: '服务器购买', link: '/server-purchase' },
            { text: '域名购买与指向', link: '/domain-setup' },
            { text: 'NginxWebUI 反向代理安装', link: '/nginxwebui-reverse-proxy' },
            { text: 'PanBox Search', link: '/products/search/overview' },
            { text: 'PanBox Autosave', link: '/products/autosave/overview' },
            { text: 'PanBox Sync', link: '/products/sync/overview' },
            { text: '免责声明', link: '/risk/disclaimer' },
            { text: '安全基线', link: '/risk/security-baseline' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: '请在遵守相关法律法规与平台规则的前提下使用。',
      copyright: 'Copyright © PanBox'
    }
  }
})
