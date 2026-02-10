# PanBox Autosave 概览

PanBox Autosave 用于“自动追更转存 / 定时转存”类场景。

## 你会得到什么

- 一键脚本创建目录、下载 Compose、探测端口、拉取镜像并启动。
- Docker Compose 形态：应用容器 + PostgreSQL 16。

## 已确认口径（部署关键点）

- 默认对外端口：从 **1888** 开始探测，若占用则递增。
- 应用镜像：`kokojacket/panbox-autosave:latest`
- 数据库：`postgres:16-alpine`
- 默认数据库账号/密码示例：`panbox-autosave`（生产环境必须修改）
- License 配置：
  - `PANBOX_LICENSE_BASE_URL=https://license.panbox.online`
  - `PANBOX_LICENSE_PRODUCT_NAME=panbox-autosave`

## 下一步

- /products/autosave/quickstart
- /products/autosave/docker
- /products/autosave/configuration
