# node-web

In an attempt to simplify the process of starting up new node.js based projects, there exists two template projects to use as a foundation.

The two projects are [node-web](https://github.com/KTH/node-web), a web server with express and react, and [node-api](https://github.com/KTH/node-api), a RESTful api. Both of them use OpenID Connect and/or CAS as a mechanism for authorisation and authentication.

**The projects can be found here:**  
[https://github.com/KTH/node-web](https://github.com/KTH/node-web)  
[https://github.com/KTH/node-api](https://github.com/KTH/node-api)

It's important that we try to make changes that affect the template projects in the template projects themselves.

## Quickrun

1.  Clone the repo
    ```bash
    $ git clone git@github.com:KTH/node-web.git
    ```
2.  Install dependencies
    ```bash
    $ npm install
    ```
3.  Create a `.env` file in the root of the project [Read more](#Configuration)
4.  Add LDAP config in `.env` [Read more](#Where-do-you-keep-you-secrets)
5.  Start your Redis [Read more](#Redis---Mandatory)
6.  Start the server
    ```bash
    $ npm run start-dev
    ```

And go to http://localhost:3000/node

> Note: node-web is by deafult connected to a api. If you don't have it running when starting node-web there will be errors in your log. No fear, node-web is still working.

---

## Development

### How do I use node-web template project for a project of my own?

1. Create a new git repository on github.com/KTH (or other somewhere else).

2. Clone the node-web repository by using:

```bash
git clone git@github.com:KTH/node-web.git NEW_REPOSITORY_NAME
```

3. Navigate to the cloned project directory

4. Change remote repo

```bash
git remote add origin https://github.com/KTH/<NEW_REPOSITORY_NAME>.git
```

### Configuration

Configuration during local development are stored in a `.env`-file in the root of your project. **This file needs to be added by you.**

The .env file should **never** be pushed and is therefore included in the .gitignore file

When running the app in development mode it's configured to work out of the box except for the LDAP (authentication), [read more about this below](#Where-do-you-keep-you-secrets).

Most of the apps configuration resides in `./config/serverSettings.js`. Here you will find what is configured and how to override it.

Lets look at how to change the port the app is running on. Look for this line in `serverSettings.js`

```
port: getEnv('SERVER_PORT', devPort),
```

The getEnv function looks for an environment variable `SERVER_PORT`. This is the variable you can override in the .env file.

Simply add a line in the .env file:

```
SERVER_PORT=8080
```

If you want changes that should be used by everyone developing your project, change the default variables in the settings-files.

### Where do you keep you secrets?

Secrets during local development are **ALWAYS** stored in the `.env`-file in the root of your project. This file is included in .gitignore so that it's never added to the repository.

#### LDAP - Mandatory

It needs to contain at least ldap connection URI and password in order for authentication to work properly:

```
LDAP_URI=ldaps://[usertname]@ldap.ref.ug.kth.se
LDAP_PASSWORD=[password]
```

### Redis - Mandatory

We use [Redis](https://redis.io/) for storing sessions and data from Cortina (KTH.se CRM). You need to have a Redis running.

A recommended way to run Redis (and [Mongodb](https://www.mongodb.com/)) during development is [kth-node-backend](https://gita.sys.kth.se/Infosys/kth-node-backend)

Default configuration for connecting to redis is `redis://localhost:6379/`.

If you would like to change this configuration you can add

`REDIS_URI=<your-redis-uri>`

to you .env file

### If your application is going to be proxied

If your application is going to be proxied on www.kth.se/your-path make sure you set the following paths and properties.

1. Set a new value in your `.env`-file for SERVICE_PUBLISH e.g

```
SERVICE_PUBLISH=/your-path
```

### URL Path

If you want another path for your app i.e localhost:3000/myApp you need to change the public path for Parcel. Look at the build scripts in package.json

You need to change **/node** on both these lines. This is the path for the application.

```
    ...
    "build": "bash ./build.sh prod /node",
    "build-dev": "bash ./build.sh dev /node",
    ...
```

Example after change:

```
    ...
    "build": "bash ./build.sh prod /myApp",
    "build-dev": "bash ./build.sh dev /myApp",
    ...
```

### Starting the server

Always start by installing dependencies:

```bash
$ npm install
```

Then you need to start the server:

```bash
$ npm run start-dev
```

This will

1. run `parcel build` once to build SASS-files, and prepare browser JavaScript files
2. start `nodemon` which triggers restart when server-side files have been updated
3. run `parcel watch` which triggers a rebuild of browser assets when files have been updated

And go to http://localhost:3000/node

### IDE Setup

> Before you start coding it is important that you have both listed extensions installed in VS Code.

- Prettier
- Eslint

#### Linting - Eslint

> _From Wikipedia: lint, or a linter, is a static code analysis tool used to flag programming errors, bugs, stylistic errors, and suspicious constructs._

We use ESLint for our linting and our default config comes from the module [eslint-config-kth](https://github.com/KTH/eslint-config-kth)

See .eslintrc file

### Debugging

#### Debugging in VS Code

If you start Node.js from VS Code you can set breakpoints in your editor. The launch config will look like this:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch Program",
  "program": "${workspaceRoot}/app.js",
  "cwd": "${workspaceRoot}",
  "env": {
    "NODE_ENV": "development"
  }
}
```

Setting NODE_ENV is currently required.

### Stack

- Parcel (Alternative to webpack)
- Babel 7
- Eslint
- Prettier
- Husky (Pre-commit)
- Sass
- React
- Mobx (State management)
