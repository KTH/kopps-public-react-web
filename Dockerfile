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
    npm install --development && \
    npm run build && \
    npm prune --production && \
    apk stats

EXPOSE 3000
EXPOSE 9229

ENV TZ Europe/Stockholm

CMD ["npm", "start"]
