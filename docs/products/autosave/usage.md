# 使用（Autosave）

## 访问 Web

安装完成后打开脚本输出的访问地址，默认端口从 `1888` 开始。

## 日志

```bash
cd /opt/panbox-autosave

docker-compose logs -f panbox-autosave

docker-compose logs -f postgres
```

## 更新

```bash
cd /opt/panbox-autosave

docker pull kokojacket/panbox-autosave:latest
docker-compose up -d
```

## 停止与卸载

```bash
cd /opt/panbox-autosave

docker-compose down

# 卸载（谨慎，会删除数据）
sudo rm -rf /opt/panbox-autosave
```
