# PanBox Site

这是一个独立的静态站点（VitePress），用于承载 PanBox 系列 3 个产品的综合落地页与多页文档站。

- 首页：综合落地页（产品卡片 + Quickstart 入口 + 风险提示）
- 文档：按产品分区（search/autosave/sync）+ 通用风险/免责声明 + 安全基线
- 语言：简体中文

## 本地开发

```bash
pnpm install
pnpm docs:dev
```

启动后按终端输出的地址访问（通常是 `http://localhost:5173` 或类似端口）。

## 构建与预览

```bash
pnpm docs:build
pnpm docs:preview
```

构建产物默认输出到：

- `docs/.vitepress/dist/`

## 目录结构

- `docs/`：站点内容
- `docs/index.md`：综合落地页
- `docs/getting-started.md`：全家桶总览与快速开始
- `docs/products/`：产品文档
  - `docs/products/search/`：PanBox Search（PHP/ThinkPHP6 形态）
  - `docs/products/autosave/`：PanBox Autosave（转存追更）
  - `docs/products/sync/`：PanBox Sync（同步流水线）
- `docs/risk/`：通用风险与安全基线
- `docs/.vitepress/`：VitePress 配置与主题

## 部署

这是纯静态站点，可部署到任意静态托管环境：

- Nginx：将 `docs/.vitepress/dist/` 作为站点 root
- GitHub Pages：按实际仓库路径配置 base（如需）

## 风险提示（摘要）

- 一键脚本可能会联网下载文件并使用代理源，建议先审阅脚本再执行。
- Cookie/Token/密码属于敏感凭据，建议只在受控网络暴露并启用 HTTPS 与访问控制。
- 若部署涉及挂载 `docker.sock`，等同于给予容器宿主机级别权限，务必评估并隔离。
