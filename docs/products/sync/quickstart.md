# PanBox Sync 脚本部署教程

PanBox Sync 会执行下载、处理和上传任务，对网络带宽、流量额度和磁盘空间要求较高。本页同时提供桌面版入口和完整的服务器脚本部署流程。

::: tip 选择部署方式
正式、长期使用时建议部署服务器版。云服务器流量受限、带宽较低或磁盘空间不足时，再考虑在家庭宽带环境使用桌面版。
:::

## 桌面版下载

[前往桌面版下载页](/desktop-download)

## 服务器部署前提

- 一台已安装 Docker 和 Docker Compose 的 Linux 服务器。未准备时先完成[服务器购买与 Docker 安装](/server-purchase)。
- 三件套同机部署建议从 `4 核 4G` 起步。
- 磁盘可用空间应覆盖正在下载、处理和等待上传的文件。

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
sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-sync-deploy/main/panbox-sync.sh -o panbox-sync.sh
```

命令执行完成后，当前目录会生成 `panbox-sync.sh`。

## 5. 添加执行权限

```bash
chmod +x panbox-sync.sh
```

## 6. 运行脚本

```bash
sudo ./panbox-sync.sh
```

脚本会显示以下管理菜单：

```text
1) 安装 PanBox Sync
2) 更新 PanBox Sync
3) 重启 PanBox Sync
4) 停止 PanBox Sync
5) 增加空间
6) 卸载 PanBox Sync（删除本地全部数据）
7) 应用网络优化（BBR / FQ / TCP Fast Open）
0) 退出
```

## 7. 选择安装

输入 `1` 并回车。脚本将自动：

1. 创建 `/opt/panbox-sync` 数据目录。
2. 检测 Docker 组权限。
3. 下载 Docker Compose 配置。
4. 从 `8000` 开始检测后端端口，从 `5244` 开始检测内置 OpenList 端口。
5. 创建 `.env`、拉取镜像并启动 PanBox Sync、SmartDNS 和内置 OpenList。

## 8. 选择是否应用网络优化

首次安装时，脚本会询问是否应用 BBR、FQ 和 TCP Fast Open 网络优化：

```text
是否应用推荐网络优化？[Y/n]
```

- 直接回车或输入 `y`：修改宿主机 `/etc/sysctl.conf` 并立即应用网络参数。
- 输入 `n`：跳过网络优化，继续安装。

如果服务器还承载其他业务，建议先了解这些系统参数的影响再选择。

## 9. 保存访问地址

安装完成后，脚本会输出内网和公网访问地址，并提示首次使用时注册账号、激活后登录。

- 后端端口默认从 `8000` 开始检测。
- 内置 OpenList 端口默认从 `5244` 开始检测。
- 如果端口被占用，脚本会自动选择后续可用端口，应以实际输出为准。
- 配置 NginxWebUI 时使用 Sync 的内网访问地址。

## 10. 检查容器状态

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

确认 `panbox-sync` 和 `panbox-smartdns` 处于运行状态；启用内置 OpenList 后，还应能通过脚本输出的 OpenList 端口访问对应服务。

## 11. 配置域名访问

不要长期直接向公网开放 Sync 后端和 OpenList 端口。安装成功后，通过 NginxWebUI 将域名代理到脚本输出的内网地址，并启用 HTTPS。

[继续配置 NginxWebUI 反向代理](/nginxwebui-reverse-proxy)

## 常用管理操作

以后需要更新、重启、停止、增加空间或应用网络优化时，重新运行脚本：

```bash
sudo ./panbox-sync.sh
```

::: danger 卸载会删除数据
菜单中的“卸载 PanBox Sync”会删除本地全部数据。执行前必须确认已经完成备份。
:::
