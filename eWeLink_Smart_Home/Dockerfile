# ARG BUILD_FROM
# FROM $BUILD_FROM

ARG registry-mirrors=["http://hub-mirror.c.163.com"]
FROM node:14-slim
RUN mkdir -p /workspace/node_modules
COPY ["./dist", "./package.json", "/workspace/"]
WORKDIR /workspace
RUN yarn --production
COPY ["./node_modules", "/workspace/node_modules/"]
EXPOSE 3000
CMD npm start