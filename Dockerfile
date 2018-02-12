FROM debian

MAINTAINER 9d77v:932099389@qq.com

COPY ./superplatform /root/superplatform
COPY ./build  /root/static

WORKDIR /root

EXPOSE 7000

CMD ["./superplatform"]