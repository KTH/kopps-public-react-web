FROM kthse/kth-nodejs:14.0.0
LABEL maintainer="KTH-studadm studadm.developers@kth.se"

WORKDIR /application
ENV NODE_PATH /application

COPY ["config", "config"]
COPY ["i18n", "i18n"]
COPY ["public", "public"]
COPY ["server", "server"]
COPY ["domain", "domain"]

COPY ["app.js", "app.js"]
COPY ["build.sh", "build.sh"]
COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]

RUN apk stats && \
    chmod a+rx build.sh && \
    apk add --no-cache bash && \
    apk add --no-cache --virtual .gyp-dependencies python make g++ util-linux && \
    npm install --development && \
    npm run build && \
    npm prune --production && \
    apk del .gyp-dependencies && \
    apk stats

EXPOSE 3000

ENV TZ Europe/Stockholm

CMD ["node", "app.js"]
