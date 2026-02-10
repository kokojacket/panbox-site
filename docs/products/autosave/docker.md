# Docker 部署（Autosave）

Autosave 的权威 Compose 口径来自部署目录的 `docker-compose.yml`。

## Compose 关键点

- 端口映射：`1888:8000`
- 日志持久化：`/opt/panbox-autosave/logs:/app/logs`
- PostgreSQL 数据：`/opt/panbox-autosave/postgres:/var/lib/postgresql/data`

## 镜像

- 应用：`kokojacket/panbox-autosave:latest`
- 数据库：`postgres:16-alpine`

## 启动与更新

```bash
cd /opt/panbox-autosave

docker-compose up -d

# 更新镜像
docker pull kokojacket/panbox-autosave:latest
docker-compose up -d
```
