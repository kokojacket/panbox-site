# FAQ（Autosave）

## 配置文件下载失败

- 一键脚本会自动尝试多个下载源（含代理源）。
- 若全部失败：检查网络、DNS、防火墙；或手动下载 `docker-compose.yml` 到 `/opt/panbox-autosave/`。

## 端口被占用

- 脚本默认从 `1888` 开始探测递增。
- 手动改端口：编辑 `/opt/panbox-autosave/docker-compose.yml` 的 `ports` 映射后重启。

## 如何修改数据库密码？

- 同时修改 Postgres 的 `POSTGRES_PASSWORD` 与应用侧 `DB_PASSWORD`。
- 修改后执行：

```bash
cd /opt/panbox-autosave
docker-compose down
docker-compose up -d
```
