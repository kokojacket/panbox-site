# 从零部署 PanBox

本页给出一条完整的服务器部署路线：准备服务器和域名，依次安装 PanBox 三件套，再配置 HTTPS 与可选的腾讯元器机器人。

::: tip 先体验还是长期使用
桌面版适合快速体验 Autosave 和 Sync；正式、长期使用时，更建议把 Search、Autosave 和 Sync 全部部署到服务器。只有服务器带宽、流量额度或磁盘空间不足时，才建议把 Sync 放在家庭宽带环境运行。
:::

[前往桌面版下载](/desktop-download)

## 1. 购买服务器并安装 Docker

准备一台可公网访问的 Linux 服务器，记录公网 IP，并完成 Docker 安装。

[查看服务器购买与 Docker 安装](/server-purchase)

## 2. 购买域名并解析到服务器

购买域名后，为根域名、`www` 或业务子域名添加解析记录，使其指向服务器公网 IP。

[查看域名购买与解析](/domain-setup)

## 3. 安装 PanBox 三件套

三个产品可以单独部署。长期运行时建议按 Search → Autosave → Sync 的顺序完成三件套：

::: tip 服务器配置
`2 核 2G` 仅建议单独部署低流量的 PanBox Search；三件套推荐从 `4 核 4G` 起步。大量同步、多个任务并行或访问量较高时，建议升级到 `4 核 8G` 及以上。
:::

| 需求 | 产品 | 部署入口 |
| --- | --- | --- |
| 搭建统一的网盘搜索入口 | PanBox Search | [脚本部署](/products/search/quickstart) |
| 自动追更与转存资源 | PanBox Autosave | [脚本部署](/products/autosave/quickstart) |
| 跨网盘同步、处理与转码 | PanBox Sync | [脚本部署](/products/sync/quickstart) |

::: warning PanBox Sync 资源要求
Sync 会产生较多下载、处理和上传流量。服务器部署前应确认带宽、流量额度和磁盘空间能够覆盖实际任务量；条件不足时再改用桌面版。
:::

## 4. 配置域名、HTTPS 与反向代理

通过 NginxWebUI 申请证书，并把域名反向代理到对应的 PanBox 服务。

[查看 NginxWebUI 反向代理教程](/nginxwebui-reverse-proxy)

## 5. 接入腾讯元器机器人（可选）

完成 Search 部署后，可以导入教程附件中的工作流，并配置腾讯元器机器人。

[查看腾讯元器机器人接入教程](/tencent-yuanqi)

## 上线前检查

- 域名解析结果与服务器公网 IP 一致。
- 公网只开放必要端口，应用内部端口不直接暴露。
- Nginx 配置校验通过，HTTPS 证书可正常续签。
- 数据库密码、管理员密码和访问 Token 已妥善保存并完成必要轮换。
- 数据库、配置和任务数据已有备份。
- 已阅读[安全基线](/risk/security-baseline)和[使用边界与免责声明](/risk/disclaimer)。
