#!/usr/bin/env bash

#变量
PID_MSG=superplatform

echo "check if command 'sudo' exist"
SUDO=sudo
if command -v sudo >/dev/null 2>&1; then
    echo 'sudo exist'
else
    echo 'sudo not exist'
    SUDO=""
fi

#回到上级目录
cd ..

#删除已存在可执行文件和文件夹
if [ -d "$PID_MSG" ]; then
    echo "remove $PID_MSG"
    rm  $PID_MSG
fi

#生成linux可执行文件
echo "build executable file:GOOS=linux GOARCH=amd64 go build"
GOOS=linux GOARCH=amd64 go build
if [ $? -eq 0 ];then
    echo "build success"
else
    echo "build failed"
    exit 1;
fi

echo "build new docker image"
$SUDO docker rmi test.ubt.boshtc.com:5001/zx/web/superplatform_dev
$SUDO docker build -t test.ubt.boshtc.com:5001/zx/web/superplatform_dev .

echo "push docker image"
$SUDO docker push test.ubt.boshtc.com:5001/zx/web/superplatform_dev

echo "remove local files"
rm ${PID_MSG}
#更新远程服务器
ssh boshu@120.27.248.117 "cd /root/zx/common && docker-compose stop superplatform && docker-compose rm -f superplatform && docker rmi test.ubt.boshtc.com:5001/zx/web/superplatform_dev && docker-compose up -d"
# ssh boshu@120.27.248.117 "cd /root/zx/common && docker-compose up -d"
