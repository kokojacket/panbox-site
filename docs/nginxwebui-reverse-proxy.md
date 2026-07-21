# NginxWebUI 反向代理与 HTTPS（阿里云示例）

本页使用 NginxWebUI 完成安装、通配符证书申请、PanBox 域名反向代理和 Nginx 配置启用。

## 前置条件

- 已完成[服务器购买与 Docker 安装](/server-purchase)。
- 已完成[域名购买与解析](/domain-setup)。
- 至少一个 PanBox 服务已安装，并已保存其内网访问地址。

教程截图中的公网 IP、域名和内网地址仅为示例，请替换成自己的信息。

## 1. 临时放行 8080 端口

进入云服务器防火墙或安全组，添加 TCP `8080` 入站规则。

![在阿里云防火墙中放行 8080 端口](/img/deployment/step-127.png)

::: danger 不要长期向所有人开放管理端口
NginxWebUI 是服务器管理界面。建议只允许自己的公网 IP 访问 `8080`；配置完成后关闭公网规则，或通过 VPN、SSH 隧道等受控方式访问。
:::

## 2. 安装 NginxWebUI

按[服务器远程连接步骤](/server-purchase#_4-远程连接服务器)进入终端，然后切换到 root 用户：

```bash
sudo -i
```

执行安装命令：

```bash
docker run -d \
  --name nginxwebui \
  --network host \
  -v /opt/docker/nginxWebUI:/home/nginxWebUI \
  -e BOOT_OPTIONS="--server.port=8080" \
  --restart always \
  -t -i \
  cym1102/nginxwebui:latest
```

命令执行后会返回容器 ID。

![NginxWebUI 容器启动结果](/img/deployment/step-141.png)

确认容器正在运行：

```bash
docker ps --filter name=nginxwebui
```

## 3. 初始化管理员

在浏览器打开：

```text
http://<服务器公网IP>:8080
```

![通过公网 IP 和 8080 端口访问 NginxWebUI](/img/deployment/step-145.png)

首次访问时创建管理员账号，使用强密码并妥善保存，然后登录管理后台。

## 4. 初始化 HTTP 与 Stream 配置

进入“HTTP 参数配置 -> 简易配置向导”。

![打开 HTTP 参数配置的简易配置向导](/img/deployment/step-148.png)

按教程勾选向导中的全部配置项并提交。

![提交 HTTP 简易配置向导](/img/deployment/step-150.png)

然后进入“Stream 参数配置 -> 简易配置向导”，开启日志跟踪并提交。

![在 Stream 简易配置向导中开启日志跟踪](/img/deployment/step-152.png)

## 5. 添加通配符证书

进入左侧“证书管理”，点击“添加证书”。

![进入 NginxWebUI 证书管理并添加证书](/img/deployment/step-155.png)

以 `example.com` 为例，域名栏填写：

```text
example.com,*.example.com
```

选择：

- 获取方式：`DNS 验证`
- 加密方式：`RSA`

然后提交。

![填写根域名和通配符域名并选择 DNS 验证](/img/deployment/step-159.png)

提交后开启自动续签。

![为证书开启自动续签](/img/deployment/step-161.png)

## 6. 添加 DNS 验证记录

点击“获取 DNS 记录”，复制 NginxWebUI 生成的记录值。

![从 NginxWebUI 获取 DNS 验证记录值](/img/deployment/step-163.png)

回到域名 DNS 管理页面，新增记录：

| 字段 | 值 |
| --- | --- |
| 记录类型 | `CNAME` |
| 主机记录 | `_acme-challenge` |
| 记录值 | NginxWebUI 页面生成的值 |

![在阿里云 DNS 中添加 acme-challenge CNAME 记录](/img/deployment/step-170.png)

保存后不要删除这条记录，自动续签仍会使用它。

## 7. 申请证书

等待约 5 到 10 分钟，让 DNS 记录生效。回到 NginxWebUI，点击“申请”。

![在 NginxWebUI 中申请证书](/img/deployment/step-175.png)

出现“申请成功”后，说明证书已经签发。

![NginxWebUI 证书申请成功](/img/deployment/step-177.png)

如果申请失败，先用 `nslookup -type=CNAME _acme-challenge.example.com` 检查记录是否生效，再核对记录值是否完整。

## 8. 添加反向代理

进入左侧“反向代理”，点击“添加反向代理”。

![在 NginxWebUI 中添加反向代理](/img/deployment/step-182.png)

填写域名与 HTTPS 配置：

- 转发类型：`http/https`
- 监听端口：`443`
- 域名：需要访问 PanBox 的域名，例如 `search.example.com`
- SSL：开启，并选择刚申请的证书
- HTTP 跳转 HTTPS：开启
- 代理目标：PanBox 安装脚本输出的内网地址，例如 `http://172.17.50.82:8888`

![填写域名、证书、监听端口和代理目标](/img/deployment/step-184.png)

确认代理目标地址和端口无误后提交。

![NginxWebUI 反向代理列表](/img/deployment/step-185.png)

::: tip 多个 PanBox 服务
Search、Autosave 和 Sync 应分别使用不同域名或子域名，并代理到各自安装脚本实际输出的内网端口。
:::

## 9. 启用 Nginx 配置

进入左侧“启用配置”。

![进入 NginxWebUI 启用配置页面](/img/deployment/step-188.png)

先点击“校验文件”，确认 Nginx 配置校验成功。

![在 NginxWebUI 中校验 Nginx 配置文件](/img/deployment/step-190.png)

![Nginx 配置文件校验成功](/img/deployment/step-191.png)

校验成功后依次点击：

1. 替换文件
2. 重新装载

![替换配置文件并重新装载 Nginx](/img/deployment/step-193.png)

## 10. 验证访问

新开浏览器标签页，通过配置好的 HTTPS 域名访问服务。例如 Search 后台地址：

```text
https://search.example.com/qfadmin
```

![通过 HTTPS 域名访问 PanBox Search 后台](/img/deployment/step-196.png)

验证成功后，回到云防火墙收紧或关闭 `8080` 公网访问规则。

## 故障排查

- `http://公网IP:8080` 无法访问：检查容器状态、防火墙规则和 `8080` 监听端口。
- 证书申请失败：检查 `_acme-challenge` CNAME 记录、DNS 生效时间和域名拼写。
- 配置校验失败：不要替换文件；先根据错误提示修正反向代理配置。
- 域名返回 502/504：检查 PanBox 容器是否运行，以及代理目标的内网 IP 和端口是否正确。
- HTTPS 可访问但跳转异常：检查域名对应的证书、监听端口和 HTTP 跳转 HTTPS 设置。

## 下一步

- Search 已上线且需要机器人入口：[接入腾讯元器机器人](/tencent-yuanqi)。
- 正式开放服务前：[检查上线安全基线](/risk/security-baseline)。
