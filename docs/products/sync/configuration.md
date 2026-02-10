# 配置（Sync）

## 部署侧（.env）

部署脚本通常会生成 `/opt/panbox-sync/.env`，常见项：

```bash
DOCKER_GID=999
BACKEND_PORT=8000
OPENLIST_PORT=5244
TZ=Asia/Shanghai
ENABLE_INTERNAL_OPENLIST=true
```

## 应用侧（环境变量）

Compose 中的关键项：

- `ENVIRONMENT=production`
- `TZ` 时区
- `ENABLE_INTERNAL_OPENLIST`：是否启用内置 OpenList
- `OPENLIST_CONTAINER_NAME`：仅在使用外部 OpenList 容器时用于重启功能

## 并发与性能

流水线架构通常通过“Worker 数量”控制并发（下载/处理/上传分别独立）。

建议：先用默认配置跑通，再根据瓶颈逐步调参。
