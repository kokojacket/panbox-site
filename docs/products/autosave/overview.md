# PanBox Autosave - 自动转存系统 概览

PanBox Autosave 用于自动追更转存、定时转存等场景，核心目标是把外部分享资源持续沉淀到你自己的网盘中，减少手工补链、重复搬运和资源流失。

## 产品定位

Autosave 在 PanBox 体系中承担资源捕获与沉淀的角色，主要负责：

- 自动处理外部分享链接
- 将资源持续转存到自己的网盘目录
- 为 Search 提供可持续补充的资源来源

如果你的主要问题是“资源在别人手里，不方便长期沉淀和复用”，Autosave 往往是最关键的一环。

## 适用场景

- 需要定时转存、自动追更他人分享的资源
- 希望减少人工点击保存、人工整理和重复分发
- 希望把外部资源逐步沉淀为自己的长期库存

## 核心能力

- 支持自动追更转存与定时转存
- 适合批量沉淀分享资源到自己的网盘
- 可将沉淀后的结果继续回流到 Search，形成稳定的资源补给链路

Autosave 更关注“把别人的链接慢慢变成你的库存”，不是对外展示站点，也不是跨盘处理层。

## 部署形态

PanBox Autosave 更接近长期运行的后端服务：

- 默认以 Docker Compose 方式部署
- 通常由应用容器和 PostgreSQL 16 组成
- 安装脚本会从 `1888` 开始探测可用端口，若占用则递增

相关镜像与组件：

- 应用镜像：`kokojacket/panbox-autosave:latest`
- 数据库镜像：`postgres:16-alpine`

## 关键配置

默认文档中涉及以下配置口径：

- 数据库默认示例账号/密码：`panbox-autosave`
- `PANBOX_LICENSE_BASE_URL=https://license.panbox.online`
- `PANBOX_LICENSE_PRODUCT_NAME=panbox-autosave`

正式环境请按实际情况修改数据库凭据与 License 配置。

## 与其他产品的关系

- `Search`：负责对外展示和搜索入口
- `Autosave`：负责资源转存与持续沉淀
- `Sync`：负责跨网盘同步、处理、自动转码与保活

Autosave 更偏资源沉淀层，适合把外部资源逐步变成自己可控、可复用的库存。

## 下一步

- [查看快速开始](/products/autosave/quickstart)
- [查看使用说明](/products/autosave/usage)
