# PanBox Autosave 快速开始

PanBox Autosave - 自动转存系统 适合把外部分享资源持续沉淀成自己的网盘库存，减少手工补链、重复搬运和资源流失。

> 前置：Linux（推荐），Docker 20.10+，Docker Compose。

## 服务器脚本部署（推荐）

1. 拉取脚本

```bash
sudo curl -fsSL https://raw.githubusercontent.com/kokojacket/panbox-autosave-open/main/panbox-autosave.sh -o panbox-autosave.sh
```

2. 赋予执行权限

```bash
chmod +x panbox-autosave.sh
```

3. 运行脚本

```bash
sudo ./panbox-autosave.sh
```

### 安全提示

- 脚本会联网下载文件，并可能使用代理镜像源。
- 建议先下载并审阅 `panbox-autosave.sh` 后再执行。

## 访问

- 默认端口从 `1888` 开始探测（1888/1889/1890...）。
- 安装完成后脚本会输出可访问地址。
