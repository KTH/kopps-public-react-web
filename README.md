# Welcome to kopps-public-react-web 👋

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?cacheSeconds=2592000)
![Prerequisite](https://img.shields.io/badge/node-16.0.0-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Build Status](https://dev.azure.com/kth-integration/team%20studadm/_apis/build/status/kopps-public-react-web/kopps-public-react-web%20reference?repoName=KTH%2Fkopps-public-react-web&branchName=master)](https://dev.azure.com/kth-integration/team%20studadm/_build/latest?definitionId=134&repoName=KTH%2Fkopps-public-react-web&branchName=master)

## Start development

### Secrets for Development

Secrets during local development are stored in a gitignored `.env` file (`env.in` can be used as template for your `.env` file). More details about environment variable setup and secrets can be found in [confluence](https://confluence.sys.kth.se/confluence/x/OYKBDQ).

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

If it plans to use Docker images locally, then install Docker as well.

### Usage

There are several options

#### In terminal, locally in development _watch_ mode (rebuilds if any changes)

```sh
npm run start-dev
```

#### To run locally as a _docker_ image, _read more in section_ [Use Docker](#use-docker-)

```sh
 npm run docker:start-dev
```

#### To run in debug mode in Visual Studio Code

It's possible to use debugging options available in Visual Studio Code
Add a file `launch.json` to `.vscode` directory :

- _Microsoft_

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

## Run tests

### Jest unit tests

```sh
npm run test
```

### Performance test

Read more in section [Performance test in docker](#performance-test-in-docker)

## Use Docker 🐳

Use Dockerfile for each container.
In project exist several Dockerfile:

- `Dockerfile` to start web service
- `Dockerfile-dev` to start web service in _dev_ mode inside built docker image
- `test/performance-artillery-dev/Dockerfile`

### Build and run docker locally

To build an image, run docker image locally and start the app service inside a docker image in a `dev` mode, use next command:

```sh
npm run docker:start-dev
```

### Performance test in docker

Copy `test/performance-artillery-dev/docker-compose.yml.in` to `test/performance-artillery-dev/docker-compose.yml` (and make necessary changes, if any).

#### Option 1

Install Docker

To build and run 2 docker images (web app and load test images) use next commands in separate terminals:

1. Run built web service image and wait until it builds and runs the web service and ready to be used:

```sh
npm run docker:start-dev
```

2. Run performance tests to test a load (it will run in a separate docker image):

```sh
npm run test-dev:load
```

- it uses `test-dev:load` which builds artillery test docker image and runs load tests
- it runs load tests to a service located on a separate image, therefore target can't be `localhost/0.0.0.0`. It uses `target: 'http://host.docker.internal:3000'`

_OR_

#### Option 2

To imitate _DEV_ and run tests by using one command

```sh
npm run docker:test-dev:performance
```

To imitate _PROD_ and run tests by using one command

```sh
npm run docker:test-dev:performance
```

### Docker compose

Copy `docker-compose.yml.in` to `docker-compose.yml` and make necessary changes, if any.

```sh
docker-compose up
```

Example:

- test/performance-artillery-dev/docker-compose.yml to start artillery image for load tests
- docker-compose.yml.in to start app related docker images

## Developing and Testing Against Local Kopps

_This is optional_

Set the following in your .env: `KOPPS_API_BASEURL=http://localhost:80/api/kopps/v2/`

When this env variable is parsed, port seems to be hardcoded according to protocol used. So for http that's port 80. To work around this issue any proxy can be used if you want to use the normal kopps development port 9090.

Simple node-based proxy:

Note: install packages express and http-proxy-middleware.

```javascript
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
app.use(
  createProxyMiddleware('/', {
    protocolRewrite: true,
    secure: false,
    changeOrigin: true,
    target: 'http://localhost:9090',
    onProxyReq(proxyReq, req, res) {
      console.log('-------------------------------------')
      console.log(req.method)
      console.log('url:' + JSON.stringify(req.url))
      console.log('headers:' + JSON.stringify(req.headers))
      console.log('query:' + JSON.stringify(req.query))
      console.log('params:' + JSON.stringify(req.params))
      console.log('====================================')
      console.log()
    },
  })
)
app.listen(80)
```

## Publish service (KTH related)

- Documentation about routing rules exists in [Kopps Public migration and Traefik 2 Routing](https://confluence.sys.kth.se/confluence/x/jQ9wBw)
- Documentation about pipeline exists in [Evolene](https://github.com/KTH/https://github.com/KTH/evolene#readme)

## In production

Secrets and docker-compose are located in cellus-registry.

Used:

```sh
npm run start
```

### Traefik 2 and path rules

More details on [Kopps Public migration and Traefik 2 Routing](https://confluence.sys.kth.se/confluence/x/jQ9wBw)

```
- "traefik.http.routers.${APPLICATION_NAME}.rule=PathPrefix(`/kp-react`,`/student/kurser/org`,`/student/kurser/program`,`/student/kurser/kurser-inom-program`,`/student/kurser/program`,`/student/kurser/sokkurs`,`/student/kurser/intern-api/sok/`,`/student/program/shb`,`/student/kurser/static`,`/utbildning/forskarutbildning/kurser/sok`,`/utbildning/forskarutbildning/kurser/avdelning`,`/utbildning/forskarutbildning/kurser/org`,`/utbildning/forskarutbildning/kurser`,`/student/kurser/lit`, `/student/kurser/kurser-per-avdelning`, `/student/kurser/avdelning/{departmentCode}/kurser`) || Path(`/student/kurser`)"
```

#### Explanations:

- PathPrefix(`/kp-react`) under this url is served embedded pages used by polopoly, this path is not published on `www`
- There is used a combination of rules PathPrefix || Path. Which means: use some of these rules. If you replace || (OR) with &&(AND), it will stop support all url and support only one '/student/kurser/' (not even '/student/kurser'). AND means use url which you meet in both rules, while OR means use all of them which are specified.
- Path(`/student/kurser`) is used instead of PathPrefix to prevent it from a conflicting with kursinfo-web's path `/student/kurser/kurs`. Path is used for exact urls, not for umbrella url, that's why it will not override /student/kurser/kurs.
- Other deeper urls which are safe for other services served with PathPrefix, because PathPrefix is serving umbrellas urls
- `/student/kurser/static` is used for all static files like scripts and css styles
- `/student/kurser/intern-api/sok/` is used for internal server-side api for course search page

## Exposed routes

| Controller                                                                           | Page                                                                                   | URL (Ref)                                                                                | URL (Prod)                                                                 |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [server/controllers/objectivesCtrl.js](server/controllers/objectivesCtrl.js)         | [public/js/app/pages/Objectives.jsx](public/js/app/pages/Objectives.jsx)               | [ref](https://www-r.referens.sys.kth.se/student/kurser/program/CLGYM/20252/mal)          | [prod](https://www.kth.se/student/kurser/program/CLGYM/20252/mal)          |
| [server/controllers/extentCtrl.js](server/controllers/extentCtrl.js)                 | [public/js/app/pages/Extent.jsx](public/js/app/pages/Extent.jsx)                       | [ref](https://www-r.referens.sys.kth.se/student/kurser/program/CLGYM/20252/omfattning)   | [prod](https://www.kth.se/student/kurser/program/CLGYM/20252/omfattning)   |
| [server/controllers/eligibilityCtrl.js](server/controllers/eligibilityCtrl.js)       | [public/js/app/pages/Eligibility.jsx](public/js/app/pages/Eligibility.jsx)             | [ref](https://www-r.referens.sys.kth.se/student/kurser/program/CLGYM/20252/behorighet)   | [prod](https://www.kth.se/student/kurser/program/CLGYM/20252/behorighet)   |
| [server/controllers/implementationCtrl.js](server/controllers/implementationCtrl.js) | [public/js/app/pages/Implementation.jsx](public/js/app/pages/Implementation.jsx)       | [ref](https://www-r.referens.sys.kth.se/student/kurser/program/CLGYM/20252/genomforande) | [prod](https://www.kth.se/student/kurser/program/CLGYM/20252/genomforande) |
| [server/controllers/appendix1Ctrl.js](server/controllers/appendix1Ctrl.js)           | [public/js/app/pages/Appendix1.jsx](public/js/app/pages/Appendix1.jsx)                 | [ref](https://www-r.referens.sys.kth.se/student/kurser/program/CLGYM/20252/kurslista)    | [prod](https://www.kth.se/student/kurser/program/CLGYM/20252/kurslista)    |
| [server/controllers/appendix2Ctrl.js](server/controllers/appendix2Ctrl.js)           | [public/js/app/pages/Appendix2.jsx](public/js/app/pages/Appendix2.jsx)                 | [ref](https://www-r.referens.sys.kth.se/student/kurser/program/CLGYM/20252/inriktningar) | [prod](https://www.kth.se/student/kurser/program/CLGYM/20252/inriktningar) |
| [server/controllers/curriculumCtrl.js](server/controllers/curriculumCtrl.js)         | [public/js/app/pages/Curriculum.jsx](public/js/app/pages/Curriculum.jsx)               | [ref](https://www-r.referens.sys.kth.se/student/kurser/program/CLGYM/20252/arskurs1)     | [prod](https://www.kth.se/student/kurser/program/CLGYM/20252/arskurs1)     |
| [server/controllers/schoolsListCtrl.js](server/controllers/schoolsListCtrl.js)       | [public/js/app/pages/DepartmentsList.jsx](public/js/app/pages/DepartmentsList.jsx)     | [ref](https://www-r.referens.sys.kth.se/student/kurser/org)                              | [prod](https://www.kth.se/student/kurser/org)                              |
| [server/controllers/departmentCtrl.js](server/controllers/departmentCtrl.js)         | [public/js/app/pages/DepartmentCourses.jsx](public/js/app/pages/DepartmentCourses.jsx) | [ref](https://www-r.referens.sys.kth.se/student/kurser/org/ADD)                          | [prod](https://www.kth.se/student/kurser/org/ADD)                          |
