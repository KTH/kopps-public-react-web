FROM kthse/kth-nodejs:12.0.0

LABEL maintainer="KTH-Webb web-developers@kth.se"

RUN mkdir -p /application
WORKDIR /application
ENV NODE_PATH /application

COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]
RUN npm install --production --no-optional

# Add the code and copy over the node_modules-catalog
COPY ["config", "config"]
COPY ["public", "public"]
COPY ["i18n", "i18n"]
COPY [".babelrc", ".babelrc"]
RUN mkdir -p server/views/system server/views/layouts

# (Node-gyp and parcel temporarily need Python and some build-essentials.)
RUN apk add --no-cache --virtual .gyp-dependencies python make g++ util-linux && \
  npm run docker && \
  apk del .gyp-dependencies

# Copy source files, not processed by build.
COPY ["app.js", "app.js"]
COPY ["server", "server"]

EXPOSE 3000

CMD ["node", "app.js"]
