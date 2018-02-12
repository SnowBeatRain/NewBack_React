#!/usr/bin/env bash

#变量
PID_MSG=utms-ui

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

echo "remove current image"
cd ../utms
$SUDO docker-compose stop ui
$SUDO docker-compose rm ui
$SUDO docker rmi test.ubt.boshtc.com:5001/utms/ui

echo "build new docker image"
cd ../utms-ui
$SUDO docker build -t test.ubt.boshtc.com:5001/utms/ui .

echo "push docker image"
$SUDO docker push test.ubt.boshtc.com:5001/utms/ui

echo "remove local files"
rm ${PID_MSG}

echo "restart local servers"
cd ../utms
$SUDO docker-compose up -d
#更新远程服务器
ssh root@ubt.boshtc.com "cd /root/utms && docker-compose stop ui && docker-compose rm -f ui && docker rmi 10.26.202.198:5001/utms/ui && docker-compose up -d"

