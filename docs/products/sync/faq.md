# FAQ（Sync）

## 端口被占用

- 脚本部署通常会自动检测端口冲突（默认从 8000 开始）。
- 手动改端口：编辑 `/opt/panbox-sync/.env` 的 `BACKEND_PORT` 后重启。

## docker.sock 权限问题

表现：容器内无法访问 Docker API 或无法重启 OpenList。

- 确认 `.env` 里的 `DOCKER_GID` 与宿主机一致。
- 宿主机查看：

```bash
getent group docker
```

> 不建议用 `chmod 666 /var/run/docker.sock` 作为默认解法。

## 数据目录权限错误

- 按部署说明修复数据目录所有者与权限，然后重启。
