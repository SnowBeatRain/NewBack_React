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

echo "build executable file:GOOS=linux GOARCH=amd64 go build"
GOOS=linux GOARCH=amd64 go build
if [ $? -eq 0 ];then
    echo "build success"
else
    echo "build failed"
    exit 1;
fi
echo "build prod resource"
yarn run build

if [ $? -eq 0 ];then
    echo "yarn build success"
else
    echo "yarn build failed"
    exit 1;
fi

sed -i 's!/static!/superplatform/static!g' build/index.html
sed -i 's!/favicon.jpg!/superplatform/favicon.jpg!g' build/index.html

echo "remove current image"
cd ../..
cd server/common
$SUDO docker-compose stop superplatform
$SUDO docker-compose rm -f superplatform
$SUDO docker rmi test.ubt.boshtc.com:5001/zx/web/superplatform

echo "build docker image"
cd ../..
cd web/superplatform
$SUDO docker build -t test.ubt.boshtc.com:5001/zx/web/superplatform .


echo "restart docker container"
cd ../..
cd server/common
$SUDO docker-compose up -d