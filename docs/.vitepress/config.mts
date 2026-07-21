import { defineConfig } from 'vitepress'

const base = process.env.VITEPRESS_BASE ?? '/'

export default defineConfig({
  base,
  lang: 'zh-CN',
  title: 'PanBox',
  description: '把搜索、转存、同步串成一条网盘资源自动化流水线',

  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    siteTitle: 'PanBox',

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    nav: [
      { text: '首页', link: '/' },
      {
        text: '文档',
        items: [
          {
            text: '开始使用',
            items: [
              { text: '从零部署', link: '/getting-started' },
              { text: '桌面版下载', link: '/desktop-download' }
            ]
          },
          {
            text: '产品概览',
            items: [
              { text: 'PanBox Search', link: '/products/search/overview' },
              { text: 'PanBox Autosave', link: '/products/autosave/overview' },
              { text: 'PanBox Sync', link: '/products/sync/overview' }
            ]
          }
        ]
      },
      { text: '使用边界', link: '/risk/disclaimer' }
    ],

    sidebar: {
      '/': [
        {
          text: '开始使用',
          items: [
            { text: '从零部署', link: '/getting-started' },
            { text: '桌面版下载', link: '/desktop-download' }
          ]
        },
        {
          text: '部署准备',
          items: [
            { text: '服务器购买与 Docker', link: '/server-purchase' },
            { text: '域名购买与解析', link: '/domain-setup' }
          ]
        },
        {
          text: '产品文档',
          items: [
            {
              text: 'PanBox Search',
              collapsed: true,
              items: [
                { text: '产品概览', link: '/products/search/overview' },
                { text: '脚本部署', link: '/products/search/quickstart' }
              ]
            },
            {
              text: 'PanBox Autosave',
              collapsed: true,
              items: [
                { text: '产品概览', link: '/products/autosave/overview' },
                { text: '脚本部署', link: '/products/autosave/quickstart' }
              ]
            },
            {
              text: 'PanBox Sync',
              collapsed: true,
              items: [
                { text: '产品概览', link: '/products/sync/overview' },
                { text: '脚本部署', link: '/products/sync/quickstart' }
              ]
            }
          ]
        },
        {
          text: '上线与扩展',
          items: [
            { text: 'NginxWebUI 与 HTTPS', link: '/nginxwebui-reverse-proxy' },
            { text: '腾讯元器机器人', link: '/tencent-yuanqi' }
          ]
        },
        {
          text: '安全与合规',
          items: [
            { text: '安全基线', link: '/risk/security-baseline' },
            { text: '使用边界与免责声明', link: '/risk/disclaimer' }
          ]
        }
      ]
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '未找到相关内容',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '向上键',
              navigateDownKeyAriaLabel: '向下键',
              closeText: '关闭',
              closeKeyAriaLabel: '退出键'
            }
          }
        }
      }
    },

    lastUpdated: {
      text: '最后更新于'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    sidebarMenuLabel: '文档目录',
    returnToTopLabel: '返回顶部',
    skipToContentLabel: '跳到正文',

    footer: {
      message: '请在遵守相关法律法规与平台规则的前提下使用。',
      copyright: 'Copyright © PanBox'
    }
  }
})
