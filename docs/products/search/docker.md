# Docker 部署（Search）

本页整理自项目的 Docker 部署说明（本产品为 PHP/ThinkPHP6 站点形态）。

## 方式一：使用预构建镜像（推荐）

```bash
docker-compose up -d
```

更新：

```bash
docker-compose pull
docker-compose up -d
```

## 方式二：本地构建镜像

如果你需要改代码或无法拉取远端镜像，可使用构建版 Compose：

```bash
docker-compose -f docker-compose.build.yml up -d --build
```

## 常用命令

```bash
# 查看日志
docker-compose logs -f app

docker-compose logs -f mysql

# 停止
docker-compose down
```

## 生产建议

- 只把 Web 端口绑定到 `127.0.0.1`，通过 Nginx/Caddy 反代并启用 HTTPS。
- 生产环境务必修改默认密码（不要使用 root/root）。
