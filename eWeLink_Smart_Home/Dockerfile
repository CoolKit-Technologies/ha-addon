ARG BUILD_FROM
FROM ${BUILD_FROM}

ENV LANG=C.UTF-8
ENV CK_API_ENV=prod

RUN apk add --no-cache \
    nodejs \
    npm \
    python3 \
    build-base

WORKDIR /workspace
RUN mkdir -p /workspace/node_modules

COPY ["./dist", "./package.json", "/workspace/"]
RUN npm install --production --save-exact
COPY ["./node_modules", "/workspace/node_modules/"]

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "start"]