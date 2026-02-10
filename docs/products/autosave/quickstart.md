# PanBox Autosave 快速开始

> 前置：Linux（推荐），Docker 20.10+，Docker Compose。

## 方式一：在线一键安装（推荐）

国内网络可优先使用代理源：

```bash
# 方法 1: gh-proxy.org 代理（推荐）
curl -fsSL https://gh-proxy.org/https://raw.githubusercontent.com/kokojacket/panbox-autosave-open/main/install.sh | sudo bash
```

代理失败时可使用原始地址：

```bash
curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-autosave-open/main/install.sh | sudo bash
```

### 安全提示

- 脚本会联网下载文件，并可能使用代理镜像源。
- 建议先下载到本地审阅 `install.sh` 后再执行。

## 方式二：手动下载后安装

```bash
curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-autosave-open/main/install.sh -o install.sh
chmod +x install.sh
sudo ./install.sh
```

## 访问

- 默认端口从 `1888` 开始探测（1888/1889/1890...）。
- 安装完成后脚本会输出可访问地址。

## 常用命令

```bash
cd /opt/panbox-autosave

docker-compose ps

docker-compose logs -f panbox-autosave

docker-compose restart
```
