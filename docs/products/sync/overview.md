# PanBox Sync 概览

PanBox Sync 是一个面向“跨盘同步 + 可选文件处理”的自托管系统，核心是 **流水线并发**：

- 下载 → 处理（可选）→ 上传
- 三队列（download/transcode/upload）
- 多 Worker 并发，吞吐量更高
- 通过 **SSE** 推送实时进度

## 文件处理的真实含义（请注意）

文档与实现中常把该阶段称为“转码”，但其效果可能只是对文件做轻量处理（例如追加随机字节以改变指纹/MD5）。

- 这**不等同于**媒体重新编码（re-encode）。
- 可能引入兼容性/完整性风险，请先在小范围验证。

## Docker 部署关键点

- 镜像：`kokojacket/panbox-sync:latest`
- 后端端口：默认 `8000`（可通过 `.env` 调整）
- 可选：内置 OpenList 端口 `5244`
- 数据目录：Compose 将 `./data` 挂载到容器内 `/app/backend/data`
- ⚠️ Compose 示例包含挂载 `docker.sock` 用于容器管理（高权限风险）

## 截图

![任务页（当前任务）](/img/sync/current_tasks_page.png)

## 下一步

- /products/sync/quickstart
- /products/sync/usage
- /products/sync/security
- /products/sync/risk
