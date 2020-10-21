#!/bin/bash

ENV=$1
PROXY_PREFIX_PATH=$2

trap avoidZombieProcessesAfterControlC SIGINT

function main() {
  intro

  if [[ "$ENV" == "dev" || "$ENV" == "prod" ]]; then
    if [ -n "$PROXY_PREFIX_PATH" ]; then
      if [ "$ENV" == "dev" ]; then
        export NODE_ENV=development
      else
        export NODE_ENV=production
      fi

      build
      exit 0
    fi
  fi

  usage
}

function intro() {
  echoYellow "|--------------------------------------------------------|" 1
  echoYellow "| Building the application with Bash and Parcel          |"   
  echoYellow "|--------------------------------------------------------|\n"
}

function build() {
  echoYellow "  1. Cleaning up & copying files"

  # Removing the dist folder
  if [ -d ./dist ]; then
    echoYellow "     -> Removing all files from the /dist folder"
    rm -rf ./dist/*
  fi

  # Creating the server views folder with sub folders systems and layouts
  echoYellow "     -> Creating the server view folders"
  mkdir -p ./server/views/system ./server/views/layouts

  # Copy error.handlebars page to this project
  echoYellow "     -> Copying error.handlebars to server/views/system folder"
  cp -R ./node_modules/kth-node-web-common/lib/handlebars/pages/views/. server/views/system

  # Copy errorLayout.handlebars layout to this project
  echoYellow "     -> Copying errorLayout.handlebars to server/views/layouts folder"
  cp -R ./node_modules/kth-node-web-common/lib/handlebars/pages/layouts/. server/views/layouts

  # Run parcel build on the vendor.js file and put the optimized file into the /dist folder.
  echoYellow "  2. Bundling vendor.js into the /dist folder\n" 1
  parcel build ./public/js/vendor.js --public-url $PROXY_PREFIX_PATH/static &
  memorizePidAndWaitForProcessToFinish $!

  if [ "$ENV" == "prod" ]; then
    # Run parcel build on the /public/js files and put the optimized files into the /dist folder.
    echoYellow "  3. Bundling the client app into the /dist folder\n" 1
    parcel build ./public/js/app/app.jsx ./public/js/app/ssr-app.js --public-url $PROXY_PREFIX_PATH/static &
    memorizePidAndWaitForProcessToFinish $!
  fi

  # Only run Parcel watch in development
  if [ "$ENV" == "dev" ]; then
    # Run parcel build on the /public/js files and put the optimized files into the /dist folder.
    echoYellow "  3. Bundling the client app into the /dist folder to list results\n" 1
    parcel build --no-minify ./public/js/app/app.jsx ./public/js/app/ssr-app.js --public-url http://localhost:3000$PROXY_PREFIX_PATH/static &
    memorizePidAndWaitForProcessToFinish $!

    # Run parcel watch on the js and sass files and put the optimized files into the /dist folder.
    echoYellow "  4. Running watch on jsx,js views and sass files. Check /dist for changes\n" 1
    parcel watch ./public/js/app/app.jsx ./public/js/app/ssr-app.js --public-url http://localhost:3000$PROXY_PREFIX_PATH/static &
    memorizePidAndWaitForProcessToFinish $!
  fi
}

function memorizePidAndWaitForProcessToFinish() {
  PID=$1
  export BUILD_SH_LAST_PID=$PID
#  while ps -p $PID > /dev/null; do
  while kill -0 $PID > /dev/null 2>&1; do
    sleep 1;
  done
}

function avoidZombieProcessesAfterControlC() {
  if [ -n "$BUILD_SH_LAST_PID" ]; then
    # if ps -p $BUILD_SH_LAST_PID > /dev/null; then
    if kill -0 $BUILD_SH_LAST_PID > /dev/null 2>&1; then
      sleep 2
      if kill -0 $BUILD_SH_LAST_PID > /dev/null 2>&1; then
        echo -e "\n\n(Killing process with PID $BUILD_SH_LAST_PID...)"
        kill $BUILD_SH_LAST_PID
      fi
    fi
  fi
  exit 0
}

function echoYellow() {
  MSG=$1
  NUMBER_OF_LINES_ABOVE_AVOIDING_SOME_PREFIX_DISABLES_COLORS=$2
  for (( I=${NUMBER_OF_LINES_ABOVE_AVOIDING_SOME_PREFIX_DISABLES_COLORS:-0}; I>0; I-- )); do
    echo
  done
  printf "\033[1;33m$MSG\033[0m\n"
}

function usage() {
  echo -e "Usage:\n"
  echo -e "  $0 <env> <proxy-prefix-path>\n"
  echo -e "  where <env>               is 'dev' or 'prod',"
  echo -e "        <proxy-prefix-path> is a URL-path, e.g. '/' or '/node'\n"
}

main
