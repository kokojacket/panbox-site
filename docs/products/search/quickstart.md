# PanBox Search 快速开始

> 前置：Linux（推荐）或 macOS；Docker 20.10+；Docker Compose。

## 1) 购买服务器

建议先完成云服务器购买与基础初始化。

<a class="VPButton medium brand" href="/server-purchase">阅读服务器购买指引</a>

## 2) 购买域名

建议准备一个可控域名，后续用于反向代理与 HTTPS。

<a class="VPButton medium brand" href="/domain-setup">阅读域名购买与指向指南</a>

## 3) 服务器脚本部署（推荐）

1. 拉取脚本

```bash
sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-search-deploy/main/panbox-search.sh -o panbox-search.sh
```

2. 赋予执行权限

```bash
chmod +x panbox-search.sh
```

3. 运行脚本

```bash
sudo ./panbox-search.sh
```

## 4) 配置反向代理

部署完成后，建议通过域名 + HTTPS 暴露服务，不直接开放应用端口。

<a class="VPButton medium brand" href="/nginxwebui-reverse-proxy">阅读 NginxWebUI 反向代理安装步骤</a>

## 首次访问

- 部署完成后，按脚本输出的访问地址打开服务。
