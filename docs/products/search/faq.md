# FAQ（Search）

## 容器无法启动怎么办？

- 先看日志：`docker-compose logs app` / `docker-compose logs mysql`
- 检查端口占用：把 `APP_PORT` 换成未占用端口后重启

## 数据库连接失败

- 确认 `.env` 里的数据库账号密码与 compose 一致。
- 首次启动需要等待数据库初始化完成，再访问站点。

## 如何清空数据重来？

> 谨慎：这会删除所有数据。

```bash
docker-compose down -v
rm -rf data/
docker-compose up -d
```
