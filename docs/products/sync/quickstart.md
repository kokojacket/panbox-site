# PanBox Sync 快速开始

> 前置：Linux（推荐）或 macOS；Docker 20.10+；Docker Compose。

## 服务器脚本部署（推荐）

1. 拉取脚本

```bash
curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-sync-deploy/main/panbox-sync.sh -o panbox-sync.sh
```

2. 赋予执行权限

```bash
chmod +x panbox-sync.sh
```

3. 运行脚本

```bash
sudo ./panbox-sync.sh
```

### 安全提示

- 脚本会联网下载文件，可能使用代理镜像源。
- 建议先下载并审阅脚本再执行。
