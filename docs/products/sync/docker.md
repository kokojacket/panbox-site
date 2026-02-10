# Docker 部署（Sync）

本页基于部署目录中的 `docker-compose.yml` 口径整理。

## 端口

```yaml
ports:
  - "${BACKEND_PORT:-8000}:8000"
  - "${OPENLIST_PORT:-5244}:5244"
```

## 数据与挂载

- `./data:/app/backend/data`：数据库、下载、日志、上传文件等。
- `./openlist-data:/app/openlist-data`：仅当启用内置 OpenList 时使用。

## ⚠️ docker.sock 挂载（高权限）

Compose 示例包含：

```yaml
- /var/run/docker.sock:/var/run/docker.sock
```

用于容器管理（例如重启 OpenList）。这会带来宿主机级别权限风险，详见：/products/sync/security

## Docker 组权限

Compose 使用：

```yaml
group_add:
  - "${DOCKER_GID:-999}"
```

脚本通常会自动检测宿主机 `docker` 组 GID 并写入 `.env`。
