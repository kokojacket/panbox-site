# 服务器购买与 Docker 安装（阿里云示例）

本页以阿里云轻量应用服务器为例，完成服务器购买、公网 IP 获取、远程连接和 Docker 安装。腾讯云的操作流程基本一致。

## 1. 选择服务器

优惠与活动入口：

- 阿里云：<https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=x9ytyfid>
- 腾讯云：<https://curl.qcloud.com/BhDhXSsh>

活动价格和库存会变化，以购买页面实时信息为准。不要只按活动价格选择配置，应根据实际部署的产品数量确定：

| 使用场景 | 建议配置 | 说明 |
| --- | --- | --- |
| 仅部署 PanBox Search | `2 核 2G` | 最低配置，适合低流量运行，不建议同时部署 Autosave 或 Sync |
| 部署 Search、Autosave、Sync 三件套 | `4 核 4G` | 推荐起步配置，适合常规使用和 Sync 低并发任务 |
| 大量同步、多个任务并行或访问量较高 | `4 核 8G` 及以上 | 根据任务量继续增加内存、磁盘和带宽 |

正式、长期使用时建议把三件套统一部署到服务器。Sync 会实际执行下载、处理和上传；即使服务器达到 `4 核 4G`，仍需根据文件大小准备充足磁盘空间与带宽。只有云服务器流量、带宽或磁盘不足时，才建议把 Sync 改为桌面版运行。

![阿里云轻量应用服务器活动套餐](/img/deployment/step-011.png)

购买时建议使用以下配置：

- 地域：如果不计划办理中国大陆 ICP 备案，选择中国大陆以外地域；腾讯云可优先考虑中国香港、日本或新加坡。
- 系统镜像：`Ubuntu 24.04 LTS`。
- 登录方式：优先使用 SSH 密钥；使用密码时务必设置强密码。

::: warning 中国大陆服务器
网站部署在中国大陆机房时，应按服务商要求完成 ICP 备案及相关合规手续。是否需要备案取决于服务器实际部署位置，而不是域名购买平台。
:::

![选择服务器地域与 Ubuntu 24.04 系统镜像](/img/deployment/step-014.png)

## 2. 获取公网 IP

购买并支付完成后进入服务器控制台。

![购买完成后进入服务器控制台](/img/deployment/step-016.png)

在服务器详情页找到并保存公网 IPv4 地址。后续域名解析、NginxWebUI 访问和服务排查都会用到它。

![在服务器详情页查看公网 IP](/img/deployment/step-018.png)

## 3. 配置防火墙

至少放行以下入站端口：

- `22`：SSH 管理。如果只使用云厂商网页终端，可按实际需要限制。
- `80`：HTTP，用于站点访问和部分证书验证流程。
- `443`：HTTPS。

NginxWebUI 使用的 `8080` 端口在[反向代理教程](/nginxwebui-reverse-proxy)中按需放行。不要直接对公网开放 PanBox 的应用容器端口。

## 4. 远程连接服务器

在阿里云服务器管理页面点击“远程连接”。

![进入阿里云服务器管理页面](/img/deployment/step-051.png)

选择网页终端并点击“立即登录”。

![选择远程连接并立即登录](/img/deployment/step-054.png)

浏览器会打开远程服务器终端。

![阿里云网页远程终端](/img/deployment/step-056.png)

切换到 root 用户：

```bash
sudo -i
```

终端提示符切换为 root 后即可继续。

![切换到 root 用户后的终端](/img/deployment/step-059.png)

也可以在本机使用 SSH：

```bash
ssh root@<服务器公网IP>
```

## 5. 安装 Docker

原教程使用 LinuxMirrors 的 Docker 安装与换源脚本：

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

::: warning 执行远程脚本前先审阅
远程脚本会以 root 权限修改系统。生产环境建议先下载并审阅脚本内容，确认来源和变更范围后再执行。
:::

出现交互式选项后，使用键盘方向键选择、回车确认。

![选择 Docker CE 软件源](/img/deployment/step-063.png)

教程中的选择顺序是：

1. Docker CE 源：`阿里云`
2. 访问方式：`公网`
3. Docker Registry：`官方 Docker Hub`
4. 网络协议：`HTTPS`
5. 是否安装最新版 Docker Engine：`是`

![Docker 安装脚本的源、网络和协议选项](/img/deployment/step-067.png)

![选择安装最新版 Docker Engine](/img/deployment/step-068.png)

等待脚本执行完成，然后验证安装：

```bash
docker --version
docker compose version
```

## 下一步

1. [购买域名并解析到服务器](/domain-setup)
2. [安装 PanBox Search](/products/search/quickstart)
3. [安装 PanBox Autosave](/products/autosave/quickstart)
4. [安装 PanBox Sync](/products/sync/quickstart)
