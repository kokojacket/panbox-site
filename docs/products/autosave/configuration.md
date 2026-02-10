# 配置（Autosave）

以下配置项整理自部署 Compose（环境变量）。

## 数据库（PostgreSQL 16）

默认示例：

- `DB_USER=panbox-autosave`
- `DB_PASSWORD=panbox-autosave`
- `DB_NAME=panbox-autosave`

> 生产环境必须修改数据库密码，并保持应用与 Postgres 一致。

## License

```bash
PANBOX_LICENSE_BASE_URL=https://license.panbox.online
PANBOX_LICENSE_PRODUCT_NAME=panbox-autosave
LICENSE_CACHE_TTL_SECONDS=300
```

## 日志与调试

- `LOG_LEVEL=INFO`
- `DEBUG=false`

## 生产环境必做

1) 修改 `POSTGRES_PASSWORD` 与 `DB_PASSWORD`
2) 通过防火墙限制访问
3) 使用 HTTPS 反向代理
