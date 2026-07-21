# 域名购买与解析（阿里云示例）

本页用于购买域名，并把根域名、`www` 和通配符子域名解析到 PanBox 服务器。教程以阿里云域名控制台为例，腾讯云或其他 DNS 服务商的记录配置方式相同。

## 1. 购买域名

可选择以下平台：

- 阿里云万网：<https://wanwang.aliyun.com/>
- 腾讯云域名注册：<https://buy.cloud.tencent.com/domain/>
- Spaceship：<http://spaceship.com/zh>

在阿里云或腾讯云购买时，按平台要求完成域名实名认证。购买后进入该域名的 DNS 解析页面。

### 相关视频

- [阿里云如何购买域名：实操全流程演示](https://www.bilibili.com/video/BV1E9eWzPENq)
- [什么是域名，域名和网址有什么区别？](https://www.bilibili.com/video/BV176cazuExr)
- [域名带 www 和不带 www 有什么区别？](https://www.bilibili.com/video/BV1TAcYzWEpW)

## 2. 准备解析信息

开始前准备：

- 已购买并完成实名认证的域名。
- [服务器购买教程](/server-purchase)中记录的公网 IPv4 地址。
- 需要使用的主机名，例如根域名、`www` 或 `search`。

本文截图中的域名和 IP 仅为示例，请替换成自己的信息。

## 3. 进入阿里云解析页面

打开[阿里云域名列表](https://dc.console.aliyun.com/next/index#/domain-list/all)，找到已购买的域名，然后点击右侧“解析”。

![在阿里云域名列表中进入解析设置](/img/deployment/step-042.png)

## 4. 添加 A 记录

可以使用阿里云“新手引导”一次添加多条记录，也可以逐条添加。教程中配置了以下 A 记录：

| 主机记录 | 记录类型 | 记录值 |
| --- | --- | --- |
| `@` | `A` | `<服务器公网IP>` |
| `www` | `A` | `<服务器公网IP>` |
| `*` | `A` | `<服务器公网IP>` |

- `@` 表示根域名，例如 `example.com`。
- `www` 表示 `www.example.com`。
- `*` 表示未单独配置的所有一级子域名，便于后续为 Search、Autosave 等服务分配子域名。

![在阿里云新手引导中填写主机记录和服务器公网 IP](/img/deployment/step-044.png)

提交后确认三条记录均处于启用状态。

![阿里云 DNS 解析记录配置结果](/img/deployment/step-046.png)

## 5. 验证解析

DNS 通常需要几分钟生效，最长时间取决于记录 TTL 和本地缓存。可在本地执行：

```bash
nslookup example.com
nslookup www.example.com
nslookup search.example.com
```

返回结果与服务器公网 IP 一致，说明 A 记录已生效。

## 6. 预留证书验证记录

在 NginxWebUI 中使用 DNS 方式申请通配符证书时，还需要按页面提示添加一条 `_acme-challenge` CNAME 记录。不要提前猜测记录值，应以 NginxWebUI 实际生成的值为准。

## 下一步

先安装至少一个 PanBox 产品，并保存脚本输出的内网访问地址：

- [安装 PanBox Search](/products/search/quickstart)
- [安装 PanBox Autosave](/products/autosave/quickstart)
- [安装 PanBox Sync](/products/sync/quickstart)

产品安装完成后，再[配置 NginxWebUI、HTTPS 与反向代理](/nginxwebui-reverse-proxy)。

## 故障排查

- 域名无法访问：先确认 A 记录已生效且记录值为当前服务器公网 IP。
- 根域名可访问但子域名不可访问：检查对应主机记录或 `*` 记录是否存在。
- 能解析但网页打不开：检查云防火墙、安全组和服务器防火墙的 `80`、`443` 端口。
- HTTPS 申请失败：检查 `_acme-challenge` CNAME 记录是否完全一致，并等待 DNS 缓存刷新。
- 反向代理返回 502/504：检查代理目标地址、端口和应用运行状态。
