# PanBox Search 脚本部署教程

本页从进入云服务器控制台开始，完整演示如何使用官方脚本安装 PanBox Search 网盘搜索站。

## 前置条件

- 一台已安装 Docker 和 Docker Compose 的 Linux 服务器。未准备时先完成[服务器购买与 Docker 安装](/server-purchase)。
- `2 核 2G` 仅适合 Search 单独低流量运行；与 Autosave、Sync 同机部署建议从 `4 核 4G` 起步。
- 建议提前完成[域名购买与解析](/domain-setup)，后续用于 HTTPS 和反向代理。

## 1. 进入服务器管理页面

登录云服务商控制台，进入已购买服务器的管理页面。

![进入阿里云服务器管理页面](/img/deployment/step-051.png)

## 2. 连接服务器

点击“远程连接”，选择网页终端并点击“立即登录”。

![选择远程连接并立即登录](/img/deployment/step-054.png)

浏览器会打开远程服务器终端。

![阿里云网页远程终端](/img/deployment/step-056.png)

## 3. 切换到 root 用户

输入以下命令并回车：

```bash
sudo -i
```

终端提示符切换为 root 后继续操作。

![切换到 root 用户后的终端](/img/deployment/step-059.png)

## 4. 下载部署脚本

```bash
sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-search-deploy/main/panbox-search.sh -o panbox-search.sh
```

命令执行完成后，当前目录会生成 `panbox-search.sh`。

## 5. 添加执行权限

```bash
chmod +x panbox-search.sh
```

## 6. 运行脚本

```bash
sudo ./panbox-search.sh
```

脚本会检查 Docker 环境并显示管理菜单。

![PanBox Search 部署脚本菜单](/img/deployment/step-092.png)

## 7. 选择安装

在菜单中输入 `1` 并回车，选择“安装 Panbox-Search 系统”。脚本将自动：

1. 从 `8888` 开始检测可用端口。
2. 下载 Docker Compose 配置并创建环境配置。
3. 拉取 Search、MySQL、Redis 和 Poller 镜像。
4. 启动全部容器并完成应用初始化。

镜像下载和首次初始化需要一些时间，请等待脚本显示“应用已成功启动”。

## 8. 保存访问地址

安装完成后，脚本会输出内网和公网访问地址。

![PanBox Search 安装完成后的访问地址](/img/deployment/step-095.png)

请保存这两个地址：

- 公网地址：用于临时确认 Search 能否访问。
- 内网地址：配置 NginxWebUI 反向代理时使用。

如果 `8888` 已被占用，脚本会自动使用 `8889`、`8890` 等后续可用端口，应以实际输出为准。

## 9. 检查容器状态

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

确认 `panbox-search-app`、`panbox-search-mysql`、`panbox-search-redis` 和 `panbox-openilink-poller` 均处于运行状态。

## 10. 配置域名访问

不要长期直接向公网开放 Search 应用端口。安装成功后，通过 NginxWebUI 将域名代理到脚本输出的内网地址，并启用 HTTPS。

[继续配置 NginxWebUI 反向代理](/nginxwebui-reverse-proxy)

## 常用管理操作

以后需要更新、启动、停止或重启 Search 时，重新运行脚本：

```bash
sudo ./panbox-search.sh
```

然后在菜单中选择对应操作。
