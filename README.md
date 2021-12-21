# Welcome to kopps-public-react-web 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-12.0.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

## Start development

### Install

First time you might need to use options `--ignore-scripts` because of npm resolutions:
```sh
npm install --ignore-scripts
```
or 

```sh
npm install

```
You might need to install as well:

```sh
npm install cross-env
npm install concurrently
```

### Usage


```sh
npm run start-dev
```

### Debug in Visual Studio Code
It's possible to use debugging options available in Visual Studio Code
Add a file `launch.json` to `.vscode` directory :
- *Microsoft*
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",           
            "request": "launch",
            "name": "Debug kopps-public-react-web",
            "program": "${workspaceFolder}\\app.js",
            "envFile": "${workspaceFolder}\\.env",
            "env": {
              "NODE_ENV": "development"
            }
        }
    ]
}
```
- _Mac, Unix and so on_
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",           
            "request": "launch",
            "name": "Debug kopps-public-react-web",
            "program": "${workspaceFolder}/app.js",
            "envFile": "${workspaceFolder}/.env",
            "env": {
              "NODE_ENV": "development"
            }
        }
    ]
}
```

## Publish service (KTH related)
Documentation about routing rules exists in [Kopps Public migration and Traefik 2 Routing](https://confluence.sys.kth.se/confluence/display/TFI/Kopps+Public+migration+and+Traefik+2+Routing)


## In production

Secrets and docker-compose are located in cellus-registry.

Used:

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Use 🐳

Copy `docker-compose.yml.in` to `docker-compose.yml` and make necessary changes, if any.

```sh
docker-compose up
```

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

