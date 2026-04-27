#!/bin/bash
# 婚礼邀请函 — 服务器一键部署脚本
# 在服务器上执行：bash setup.sh

set -e

echo ">>> 安装 Nginx..."
if command -v apt &> /dev/null; then
    sudo apt update && sudo apt install -y nginx
elif command -v yum &> /dev/null; then
    sudo yum install -y nginx
fi

echo ">>> 创建网站目录..."
sudo mkdir -p /var/www/wedding

echo ">>> 部署 Nginx 配置..."
sudo cp /tmp/wedding-nginx.conf /etc/nginx/conf.d/wedding.conf

# 移除默认站点（如果存在）
sudo rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true

echo ">>> 检查 Nginx 配置..."
sudo nginx -t

echo ">>> 启动 Nginx..."
sudo systemctl enable nginx
sudo systemctl restart nginx

echo ">>> 完成！请上传 out/ 目录内容到 /var/www/wedding/"
