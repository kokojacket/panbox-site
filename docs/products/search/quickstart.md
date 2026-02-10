# PanBox Search 快速开始

> 前置：Docker 20.10+，Docker Compose 2.0+（或兼容的 docker-compose）。

## 1) 获取项目

进入项目目录（示例）：

```bash
git clone https://github.com/kokojacket/panbox-search.git
cd panbox-search
```

如果你的仓库名不同，请以实际为准。

## 2) 准备环境变量（可选）

项目通常提供示例文件，例如：

```bash
cp .env.docker.example .env
```

生产环境务必修改数据库密码与盐值，见：/products/search/configuration

## 3) 启动

```bash
docker-compose up -d
```

查看日志：

```bash
docker-compose logs -f app
```

访问：

- 默认：`http://localhost`

## 验证清单

- 容器状态：`docker-compose ps`
- 首页能打开；若包含后台入口，确认后台路由可达。
