# PanBox Sync 快速开始

PanBox Sync - 跨网盘同步自动转码系统 适合把已有资源做进一步同步、处理和保活，尽量减少屏蔽、失效和单盘波动带来的影响。

> 前置：Linux（推荐）或 macOS；Docker 20.10+；Docker Compose。

## 服务器脚本部署（推荐）

1. 拉取脚本

```bash
sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-sync-deploy/main/panbox-sync.sh -o panbox-sync.sh
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
