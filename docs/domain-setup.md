# 域名购买和指向服务器教程（阿里云服务器示例）

本教程目标：

1. 购买域名（推荐海外注册商）
2. 把域名解析到你的阿里云服务器
3. 完成基础的站点访问与 HTTPS 配置

## 一、域名购买推荐

推荐平台：<http://spaceship.com/>

推荐理由（适合本项目场景）：

- 海外注册流程简单，价格透明。
- 如果你的服务部署在中国大陆以外节点，通常不涉及中国大陆 ICP 备案流程。

> 注意：是否需要备案，核心取决于**服务实际部署位置**（是否在中国大陆机房），而不是域名在哪里买。

## 二、购买域名（Spaceship）

1. 打开 `spaceship.com`，搜索你要的域名。
2. 选择可注册后缀（如 `.com` / `.net`）并下单。
3. 开启域名隐私保护（WHOIS Privacy，如可选）。
4. 购买完成后进入该域名的 DNS 管理页。

## 三、准备阿里云服务器信息

在阿里云 ECS 控制台确认：

- 实例有公网 IP（IPv4）
- 安全组已放行：`80`、`443`（以及 `22`）

你将用到：

- 服务器公网 IP（例如 `47.x.x.x`）
- 你希望绑定的域名（例如 `example.com`）

## 四、配置域名解析到阿里云 ECS

你可以二选一：

### 方案 A：继续使用 Spaceship 的 DNS（最省事）

在 Spaceship 的 DNS 里新增记录：

- `A` 记录：`@` → `你的阿里云公网IP`
- `A` 记录：`www` → `你的阿里云公网IP`

如果只想用子域名（例如 `search.example.com`）：

- `A` 记录：`search` → `你的阿里云公网IP`

### 方案 B：切换到阿里云 DNS 托管（你需要的新增方案）

适合你已经在阿里云管理服务器，希望 DNS 也统一在阿里云管理的场景。

1. 在阿里云控制台打开 **云解析 DNS**，添加你的域名。
2. 阿里云会给出 2 条 Nameserver（NS）地址。
3. 回到 Spaceship 域名管理页，把域名 NS 改为阿里云提供的 NS。
4. 等待 NS 生效后（通常几分钟到数小时），在阿里云 DNS 新增解析记录：
   - `A` 记录：`@` → `你的阿里云公网IP`
   - `A` 记录：`www` → `你的阿里云公网IP`

> 提示：NS 切换后，最终以阿里云 DNS 中的记录为准；Spaceship 原 DNS 记录不再生效。

TTL 使用默认值即可。

## 五、等待生效并验证

DNS 生效时间通常几分钟到数十分钟（有时更久）。

可在本地执行：

```bash
nslookup example.com
nslookup www.example.com
```

返回 IP 与你的阿里云公网 IP 一致，说明解析已生效。

## 六、在阿里云服务器上配置站点（Nginx 示例）

先安装 Nginx：

```bash
apt update
apt -y install nginx
systemctl enable nginx
systemctl start nginx
```

创建站点配置（以 `example.com` 为例，反代到本机 `127.0.0.1:1888`，请按你的实际端口改）：

```nginx
server {
  listen 80;
  server_name example.com www.example.com;

  location / {
    proxy_pass http://127.0.0.1:1888;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

保存到：`/etc/nginx/sites-available/panbox.conf`，并启用：

```bash
ln -sf /etc/nginx/sites-available/panbox.conf /etc/nginx/sites-enabled/panbox.conf
nginx -t
systemctl reload nginx
```

## 七、配置 HTTPS（Let's Encrypt）

安装 certbot：

```bash
apt -y install certbot python3-certbot-nginx
```

签发并自动配置证书：

```bash
certbot --nginx -d example.com -d www.example.com
```

完成后访问：

- `https://example.com`
- `https://www.example.com`

## 八、故障排查

- 域名无法访问：先检查 DNS 是否生效、IP 是否正确。
- 如果使用阿里云 DNS 托管：确认域名 NS 已切到阿里云，且阿里云 DNS 里已有对应 A 记录。
- 能 ping 通但网页打不开：检查安全组与服务器防火墙端口（80/443）。
- HTTPS 失败：确认域名已正确解析到当前服务器，且 80 端口可从公网访问。
- 502/504：通常是 `proxy_pass` 目标端口不对，或应用未启动。
