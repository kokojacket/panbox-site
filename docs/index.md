---
layout: home

hero:
  name: PanBox
  text: 自托管网盘工具套件
  tagline: 搜索 / 自动转存 / 同步。面向工程部署，可观测、可扩展。
  actions:
    - theme: brand
      text: 快速开始
      link: /products/search/overview

features:
  - title: PanBox Search
    details: 一键部署网盘搜索聚合站点
    link: /products/search/overview
  - title: PanBox Autosave
    details: 网盘资源自动追更转存 / 定时转存
    link: /products/autosave/overview
  - title: PanBox Sync
    details: 网盘资源自动转码、规避资源违规，跨网盘同步
    link: /products/sync/overview
---

<div class="pb-section">
  <h2>快速开始（按需选择）</h2>
  <div class="pb-grid">
    <div class="pb-card">
      <div class="pb-kicker">PanBox Search<span class="pb-kicker-cn">搜索站</span></div>
      <p><strong>服务器脚本部署</strong></p>
      <ol class="pb-steps">
        <li>拉取脚本</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-search-deploy/main/panbox-search.sh -o panbox-search.sh</code></pre>
      <ol class="pb-steps" start="2">
        <li>赋予执行权限</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>chmod +x panbox-search.sh</code></pre>
      <ol class="pb-steps" start="3">
        <li>运行脚本</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>sudo ./panbox-search.sh</code></pre>
      <p><a href="https://github.com/kokojacket/panbox-search-deploy" target="_blank" rel="noreferrer">查看 Search 部署仓库 →</a></p>
    </div>
    <div class="pb-card">
      <div class="pb-kicker">PanBox Autosave<span class="pb-kicker-cn">网盘自动转存</span></div>
      <p><strong>A. 服务器脚本部署</strong></p>
      <ol class="pb-steps">
        <li>拉取脚本</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-autosave-open/main/panbox-autosave.sh -o panbox-autosave.sh</code></pre>
      <ol class="pb-steps" start="2">
        <li>赋予执行权限</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>chmod +x panbox-autosave.sh</code></pre>
      <ol class="pb-steps" start="3">
        <li>运行脚本</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>sudo ./panbox-autosave.sh</code></pre>
      <p><a href="https://github.com/kokojacket/panbox-autosave-open" target="_blank" rel="noreferrer">查看 Autosave 仓库 →</a></p>
      <p><strong>B. Windows App</strong></p>
      <p><a href="https://github.com/kokojacket/panbox-autosave-open/releases/latest" data-latest-exe-repo="kokojacket/panbox-autosave-open" target="_blank" rel="noreferrer">下载最新版 Setup.exe（直链）→</a></p>
    </div>
    <div class="pb-card">
      <div class="pb-kicker">PanBox Sync<span class="pb-kicker-cn">网盘自动转码</span></div>
      <p><strong>A. 服务器脚本部署</strong></p>
      <ol class="pb-steps">
        <li>拉取脚本</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-sync-deploy/main/panbox-sync.sh -o panbox-sync.sh</code></pre>
      <ol class="pb-steps" start="2">
        <li>赋予执行权限</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>chmod +x panbox-sync.sh</code></pre>
      <ol class="pb-steps" start="3">
        <li>运行脚本</li>
      </ol>
      <pre class="pb-cmd" data-copyable-cmd><code>sudo ./panbox-sync.sh</code></pre>
      <p><a href="https://github.com/kokojacket/panbox-sync-deploy" target="_blank" rel="noreferrer">查看 Sync 部署仓库 →</a></p>
      <p><strong>B. Windows App</strong></p>
      <p><a href="https://github.com/kokojacket/panbox-sync-deploy/releases/latest" data-latest-exe-repo="kokojacket/panbox-sync-deploy" target="_blank" rel="noreferrer">下载最新版 Setup.exe（直链）→</a></p>
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
