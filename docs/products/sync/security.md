# 安全建议（Sync）

## ⚠️ docker.sock 风险

部署 Compose 示例包含：

- `/var/run/docker.sock:/var/run/docker.sock`

这会让容器具备“控制宿主机 Docker”的能力，风险极高（接近宿主机 root）。

## 如果你必须使用 docker.sock

建议至少做到：

- 专机专用：把 Sync 放到隔离主机或隔离集群
- 网络隔离：限制容器可访问的网络范围
- 镜像与依赖审计：固定镜像版本、控制镜像来源
- 最小暴露面：只通过 HTTPS 反代暴露 Web，禁止直接暴露内部端口

## DOCKER_GID 与权限

Compose 使用 `group_add` 方式让容器内进程具备访问 Docker socket 的组权限。

- 不要把 `docker.sock` 设置成全局可写（例如 `chmod 666`）作为默认方案。
- 优先使用正确的 `docker` 组 GID，并只在确有需要时启用。

## 文件处理风险

- 处理阶段可能改变文件内容（哪怕只追加少量字节）。
- 对完整性、兼容性有要求的场景（例如媒体播放/哈希校验/签名文件）请谨慎启用。
