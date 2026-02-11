---
layout: home

hero:
  name: PanBox
  text: 自托管网盘工具套件
  tagline: 搜索 / 自动转存 / 同步。面向工程部署，可观测、可扩展。
  actions:
    - theme: brand
      text: 快速开始
      link: /getting-started
    - theme: alt
      text: 查看文档
      link: /getting-started

features:
  - title: PanBox Search
    details: 网盘搜索与聚合检索 Web 站点（PHP/ThinkPHP6 形态）。部署路径与 autosave/sync 不同。
    link: /products/search/overview
  - title: PanBox Autosave
    details: 自动追更转存 / 定时转存。Docker 一键安装，默认端口从 1888 开始探测递增。
    link: /products/autosave/overview
  - title: PanBox Sync
    details: 三段流水线（下载→处理→上传）+ 三队列 + 多 Worker 并发，SSE 实时进度。文件“处理”不等同于媒体重编码。
    link: /products/sync/overview
---

<div class="pb-section">
  <h2>快速开始（3 步以内）</h2>
  <div class="pb-grid">
    <div class="pb-card">
      <div class="pb-kicker">PanBox Search</div>
      <ol class="pb-steps">
        <li>准备 <code>docker</code> + <code>docker compose</code></li>
        <li>（可选）复制并修改 <code>.env</code>（生产务必改密码）</li>
        <li>执行 <code>docker-compose up -d</code>，访问 <code>http://localhost</code></li>
      </ol>
      <p><a href="/products/search/quickstart">进入 Search 快速开始 →</a></p>
    </div>
    <div class="pb-card">
      <div class="pb-kicker">PanBox Autosave</div>
      <ol class="pb-steps">
        <li>先审阅安装脚本（会联网下载文件，可能使用代理源）</li>
        <li>执行 <code>curl -fsSL .../install.sh | sudo bash</code></li>
        <li>默认端口从 <code>1888</code> 开始，浏览器访问 <code>http://&lt;IP&gt;:1888</code></li>
      </ol>
      <p><a href="/products/autosave/quickstart">进入 Autosave 快速开始 →</a></p>
    </div>
    <div class="pb-card">
      <div class="pb-kicker">PanBox Sync</div>
      <ol class="pb-steps">
        <li>启动服务（Docker / Compose）并完成基础配置</li>
        <li>创建任务：源目录 → 目标目录，选择是否启用文件处理</li>
        <li>通过 SSE 查看实时进度与队列状态</li>
      </ol>
      <p><a href="/products/sync/quickstart">进入 Sync 快速开始 →</a></p>
    </div>
  </div>
</div>

<div class="pb-section pb-risk">
  <h2>风险提示（请先读）</h2>
  <p><strong>合规与平台策略</strong>：请在遵守相关法律法规与平台规则的前提下使用。</p>
  <p><strong>敏感凭据</strong>：Cookie / Token / 密码属于敏感信息，建议只在内网或受控网络暴露，并配合 HTTPS 与访问控制。</p>
  <p><strong>高权限部署</strong>：若部署方案涉及挂载 <code>docker.sock</code>，等同于给予容器宿主机级别权限，务必评估风险并做隔离。</p>
  <p><a href="/risk/disclaimer">进入统一免责声明 →</a></p>
</div>
