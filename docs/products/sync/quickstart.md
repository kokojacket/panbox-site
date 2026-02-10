# PanBox Sync 快速开始

> 前置：Linux（推荐）或 macOS；Docker 20.10+；Docker Compose。

## 方法 1：一键脚本（推荐）

国内网络可使用代理源：

```bash
curl -fsSL https://gh-proxy.org/https://raw.githubusercontent.com/kokojacket/panbox-sync-deploy/main/panbox-sync.sh | sudo bash
```

或原始地址：

```bash
curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-sync-deploy/main/panbox-sync.sh | sudo bash
```

### 安全提示

- 脚本会联网下载文件，可能使用代理镜像源。
- 建议先下载并审阅脚本再执行。

## 方法 2：手动运行脚本

```bash
wget -O panbox-sync.sh https://gh-proxy.org/https://raw.githubusercontent.com/kokojacket/panbox-sync-deploy/main/panbox-sync.sh
sudo bash panbox-sync.sh
```

## 首次访问

脚本部署完成后会输出访问地址，例如：

- `http://<your-ip>:8000`

首次使用通常需要：

1) 在 Web 界面注册账号
2) 激活后登录
3) 配置任务与 OpenList 相关参数

## 配置文件位置

部署脚本会生成：

- `/opt/panbox-sync/.env`
- `/opt/panbox-sync/docker-compose.yml`

修改后重启：

```bash
cd /opt/panbox-sync
sudo docker-compose restart
```
