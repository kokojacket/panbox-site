# PanBox Autosave 脚本部署教程

本页从进入云服务器控制台开始，完整演示如何使用官方脚本安装 PanBox Autosave 自动转存系统。

## 前置条件

- 一台已安装 Docker 和 Docker Compose 的 Linux 服务器。未准备时先完成[服务器购买与 Docker 安装](/server-purchase)。
- 已通过网页终端或 SSH 连接服务器。
- 与 Search、Sync 同机部署时，服务器建议从 `4 核 4G` 起步。

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
sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-autosave-open/main/panbox-autosave.sh -o panbox-autosave.sh
```

命令执行完成后，当前目录会生成 `panbox-autosave.sh`。

## 5. 添加执行权限

```bash
chmod +x panbox-autosave.sh
```

## 6. 运行脚本

```bash
sudo ./panbox-autosave.sh
```

脚本会检查 Docker 环境并显示以下管理菜单：

```text
1) 安装 PanBox
2) 更新 PanBox
3) 重启 PanBox
4) 停止 PanBox
0) 退出
```

## 7. 选择安装

输入 `1` 并回车。脚本将自动：

1. 创建 `/opt/panbox-autosave/logs` 和 `/opt/panbox-autosave/postgres` 数据目录。
2. 下载 Docker Compose 配置。
3. 从 `1888` 开始检测可用端口。
4. 配置 PostgreSQL、拉取镜像并启动服务。

镜像下载和数据库首次启动需要一些时间，请等待脚本显示“应用已成功启动”。

## 8. 保存访问地址

安装完成后，脚本会输出内网和公网访问地址，请立即保存。

- 默认从 `1888` 开始检测端口。
- 如果端口已被占用，会继续尝试 `1889`、`1890` 等端口。
- 配置反向代理时使用脚本实际输出的内网地址，不要自行猜测端口。

## 9. 检查容器状态

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

确认 `panbox-autosave` 和 `panbox-autosave-postgres` 均处于运行状态。

## 10. 配置域名访问

不要长期直接向公网开放 Autosave 应用端口。安装成功后，通过 NginxWebUI 将域名代理到脚本输出的内网地址，并启用 HTTPS。

[继续配置 NginxWebUI 反向代理](/nginxwebui-reverse-proxy)

## 常用管理操作

以后需要更新、重启或停止 Autosave 时，重新运行脚本：

```bash
sudo ./panbox-autosave.sh
```

然后在菜单中选择对应操作。
