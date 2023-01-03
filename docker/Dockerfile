FROM node:18.12.0-alpine as base

RUN apk add tzdata

RUN apk add python3 make g++

ENV TZ America/Sao_Paulo

MAINTAINER Ikaro C. Laborda <iclaborda@msn.com>

FROM base as dev

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["sh", "/app/docker/docker-entrypoint.sh"]