# NginxWebUI 反向代理安装（阿里云示例）

本文仅说明 NginxWebUI 的安装方式，后续反向代理配置步骤可在此基础上补充。

## 前置条件

- 已有一台可 SSH 登录的阿里云 Linux 服务器
- 已安装 Docker

## 安装命令

```bash
docker run -d \
  --name nginxwebui \
  --network host \
  -v /opt/docker/nginxWebUI:/home/nginxWebUI \
  -e BOOT_OPTIONS="--server.port=8080" \
  --restart always \
  -t -i \
  cym1102/nginxwebui:latest
```

## 访问入口

- 安装后可通过 `http://<服务器IP>:8080` 访问 NginxWebUI。
