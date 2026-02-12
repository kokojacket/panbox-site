# 服务器购买（阿里云示例）

本页用于从 0 到 1 完成：服务器购买、基础环境准备、以及 PanBox 部署。

## 补贴/优惠链接

- 阿里云：<https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=x9ytyfid>
- 腾讯云：<https://curl.qcloud.com/BhDhXSsh>

## 一、阿里云购买建议（ECS）

以阿里云 ECS 为示例：

1. 进入上面的阿里云链接，选择 **ECS 云服务器**。
2. 地域选择离你用户更近的区域（例如华东/华南）。
3. 配置建议（个人/轻量业务起步）：
   - CPU/内存：`2核2G` 起步
   - 系统盘：`40GB` 以上（推荐 ESSD）
   - 带宽：`3Mbps` 起步（按并发和预算调整）
4. 操作系统建议：`Ubuntu 22.04 LTS`。
5. 设置登录方式：优先使用 **密钥登录**，其次为强密码。
6. 完成购买并开通实例。

## 二、安全组与网络

在阿里云控制台给实例配置安全组入站规则：

- `22`（SSH 管理）
- `80`（HTTP，可选）
- `443`（HTTPS，建议）

不建议直接对公网开放应用容器端口（如 1888、9000 等），建议通过 Nginx/Caddy 反代并加 HTTPS。

## 三、登录服务器并初始化

先通过 SSH 登录：

```bash
ssh root@<你的服务器公网IP>
```

更新系统并安装常用工具：

```bash
apt update && apt -y upgrade
apt -y install curl wget git ca-certificates
```

（可选）设置时区：

```bash
timedatectl set-timezone Asia/Shanghai
```

## 四、安装 Docker 与 Compose

```bash
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker
docker --version
docker compose version
```

## 五、部署示例（PanBox Search）

按脚本方式部署 Search：

```bash
curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-search-deploy/main/panbox-search.sh -o panbox-search.sh
chmod +x panbox-search.sh
sudo ./panbox-search.sh
```

部署完成后，按脚本提示访问服务。

## 六、其他产品部署命令

### PanBox Autosave

```bash
curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-autosave-open/main/panbox-autosave.sh -o panbox-autosave.sh
chmod +x panbox-autosave.sh
sudo ./panbox-autosave.sh
```

### PanBox Sync

```bash
curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-sync-deploy/main/panbox-sync.sh -o panbox-sync.sh
chmod +x panbox-sync.sh
sudo ./panbox-sync.sh
```

## 七、生产环境建议

- 反向代理统一入口（Nginx/Caddy）+ HTTPS。
- 所有默认密码、密钥、Token 首次启动后立即修改。
- 重要数据目录定期备份（数据库、配置、任务数据）。
- 对外暴露最小化：仅开放必要端口。
