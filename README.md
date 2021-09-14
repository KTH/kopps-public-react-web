# Welcome to kopps-public-react-web 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-12.0.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Testing Against Local Kopps

Set the following in your .env: `KOPPS_API_BASEURL=http://localhost:80/api/kopps/v2/`

When this env variable is parsed, port seems to be hardcoded according to protocol used. So for http that's port 80. To work around this issue any proxy can be used if you want to use the normal kopps development port 9090.

Simple node-based proxy:

Note: install packages express and http-proxy-middleware.
```javascript
const express = require("express");
 const { createProxyMiddleware } = require("http-proxy-middleware");
 const app = express();
 app.use(
     createProxyMiddleware("/", {
       protocolRewrite: true,
       secure: false,
       changeOrigin: true,
       target: "http://localhost:9090",
       onProxyReq(proxyReq, req, res) {
         console.log("-------------------------------------")
         console.log(req.method)
         console.log("url:" + JSON.stringify(req.url))
         console.log("headers:" + JSON.stringify(req.headers))
         console.log("query:" + JSON.stringify(req.query))
         console.log("params:" + JSON.stringify(req.params))
         console.log("====================================")
         console.log()
       },
     })
 );
 app.listen(80);
```
