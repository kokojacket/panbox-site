# 快速开始

PanBox 是一组面向自托管场景的网盘工具：

- **PanBox Search**：网盘搜索与聚合检索 Web 站点（PHP/ThinkPHP6 形态）。
- **PanBox Autosave**：自动追更转存 / 定时转存（Docker 一键安装脚本）。
- **PanBox Sync**：同步 + 可选文件处理的流水线（下载 → 处理 → 上传），SSE 实时进度。

## 你该选哪个？

| 需求 | 推荐产品 | 说明 |
| --- | --- | --- |
| 想快速搭一个“搜索站” | Search | 部署形态是 PHP/ThinkPHP6 站点，不是前端构建产物 |
| 想定时追更、自动转存 | Autosave | 默认对外端口从 1888 开始探测递增，内置 Postgres 16 |
| 想做跨盘同步、并发流水线 | Sync | 三队列 + 多 Worker 并发，适合吞吐量与可观测性优先 |

## 部署路径建议

- **单产品**：先按各产品的 `快速开始 → Docker 部署 → 配置` 走通。
- **多产品同机**：建议用 Nginx/Caddy 反向代理到不同内部端口；数据库与数据目录分开；统一做 HTTPS 与访问控制。
- **公网暴露**：强烈建议只暴露反代层（HTTPS + 鉴权），把应用容器端口限制在内网。

## 文档入口

- Search：/products/search/overview
- Autosave：/products/autosave/overview
- Sync：/products/sync/overview

## 重要提醒

- 安装脚本、镜像拉取、License/心跳等行为可能涉及联网依赖，请先阅读对应产品的“风险提示”。
- 生产环境务必修改默认密码与盐值；敏感凭据不要写进公开仓库。
