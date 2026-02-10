import { defineConfig } from 'vitepress'

export default defineConfig({
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
        text: '产品',
        items: [
          { text: 'PanBox Search', link: '/products/search/overview' },
          { text: 'PanBox Autosave', link: '/products/autosave/overview' },
          { text: 'PanBox Sync', link: '/products/sync/overview' }
        ]
      },
      { text: '文档', link: '/getting-started' },
      { text: '部署', link: '/getting-started#部署路径建议' },
      { text: '风险', link: '/risk/disclaimer' },
      {
        text: 'GitHub',
        items: [
          { text: 'panbox-search', link: 'https://github.com/kokojacket/panbox-search' },
          { text: 'panbox-autosave', link: 'https://github.com/kokojacket/panbox-autosave' },
          { text: 'panbox-sync', link: 'https://github.com/kokojacket/panbox-sync' }
        ]
      }
    ],

    sidebar: {
      '/products/search/': [
        {
          text: 'PanBox Search',
          items: [
            { text: '概览', link: '/products/search/overview' },
            { text: '快速开始', link: '/products/search/quickstart' },
            { text: 'Docker 部署', link: '/products/search/docker' },
            { text: '配置', link: '/products/search/configuration' },
            { text: '使用', link: '/products/search/usage' },
            { text: 'FAQ', link: '/products/search/faq' },
            { text: '风险提示', link: '/products/search/risk' }
          ]
        }
      ],
      '/products/autosave/': [
        {
          text: 'PanBox Autosave',
          items: [
            { text: '概览', link: '/products/autosave/overview' },
            { text: '快速开始', link: '/products/autosave/quickstart' },
            { text: 'Docker 部署', link: '/products/autosave/docker' },
            { text: '配置', link: '/products/autosave/configuration' },
            { text: '使用', link: '/products/autosave/usage' },
            { text: 'FAQ', link: '/products/autosave/faq' },
            { text: '风险提示', link: '/products/autosave/risk' }
          ]
        }
      ],
      '/products/sync/': [
        {
          text: 'PanBox Sync',
          items: [
            { text: '概览', link: '/products/sync/overview' },
            { text: '快速开始', link: '/products/sync/quickstart' },
            { text: 'Docker 部署', link: '/products/sync/docker' },
            { text: '配置', link: '/products/sync/configuration' },
            { text: '使用', link: '/products/sync/usage' },
            { text: '架构', link: '/products/sync/architecture' },
            { text: '安全建议', link: '/products/sync/security' },
            { text: 'FAQ', link: '/products/sync/faq' },
            { text: '风险提示', link: '/products/sync/risk' }
          ]
        }
      ],
      '/risk/': [
        {
          text: '风险与声明',
          items: [
            { text: '免责声明', link: '/risk/disclaimer' },
            { text: '安全基线', link: '/risk/security-baseline' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kokojacket' }
    ],

    footer: {
      message: '请在遵守相关法律法规与平台规则的前提下使用。',
      copyright: 'Copyright © PanBox'
    }
  }
})
