# 配置（Search）

Search 通常通过 `.env` 文件配置运行参数。

下面是常见配置项（以项目文档为准）：

```bash
# 应用端口
APP_PORT=80

# 调试开关（生产环境建议 false）
APP_DEBUG=false

# 数据库配置（生产务必改密码）
DB_NAME=www_dj_com
DB_USER=root
DB_PASSWORD=root
DB_PORT=3306
DB_PREFIX=qf_

# 时区
APP_TIMEZONE=Asia/Chongqing

# 系统盐值（建议修改）
SYSTEM_SALT=YAdmin
```

## 生产环境必做

- 改 `DB_PASSWORD`、`SYSTEM_SALT`。
- 关闭 `APP_DEBUG`。
- 结合反向代理启用 HTTPS，并限制后台访问。
