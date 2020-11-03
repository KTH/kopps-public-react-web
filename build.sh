#!/bin/bash

ENV=$1
PROXY_PREFIX_PATH=$2

[ "$BUILD_SH_LOG" == "debug" ] && ps -a

function main() {
  echo
  echoYellow "|--------------------------------------------------------|"
  echoYellow "| Building the application with Bash and Parcel          |"   
  echoYellow "|--------------------------------------------------------|\n"

  avoidZombieProcessesOnWindows

  if [ "$ENV" == "dev" ]; then
    export NODE_ENV=development
  else
    export NODE_ENV=production
  fi

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
  echo
  echoYellow "  2. Bundling vendor.js into the /dist folder\n"
  if [ "$AVOID_ZOMBIE_PROCESSES" == "true" ]; then
    parcel build ./public/js/vendor.js --public-url $PROXY_PREFIX_PATH/static &
    memorizePidAndWaitForProcessToFinish $!
  else
    parcel build ./public/js/vendor.js --public-url $PROXY_PREFIX_PATH/static
  fi

  if [ "$ENV" == "prod" ]; then
    # Run parcel build on the files in /public/js/app and put the optimized files into the /dist folder.
    echo
    echoYellow "  3. Bundling the client app into the /dist folder\n"
    if [ "$AVOID_ZOMBIE_PROCESSES" == "true" ]; then
      parcel build './public/js/app/{*.js,*.jsx}' --public-url $PROXY_PREFIX_PATH/static &
      memorizePidAndWaitForProcessToFinish $!
    else
      parcel build './public/js/app/{*.js,*.jsx}' --public-url $PROXY_PREFIX_PATH/static
    fi

    echo
    echoYellow "  Done.\n"
  fi

  # Only run Parcel watch in development
  if [ "$ENV" == "dev" ]; then
    # Run parcel build on the files in /public/js/app and put the optimized files into the /dist folder.
    echo
    echoYellow "  3. Bundling the client app into the /dist folder to list results\n"
    if [ "$AVOID_ZOMBIE_PROCESSES" == "true" ]; then
      parcel build --no-minify './public/js/app/{*.js,*.jsx}' --public-url http://localhost:3000$PROXY_PREFIX_PATH/static &
      memorizePidAndWaitForProcessToFinish $!
    else
      parcel build --no-minify './public/js/app/{*.js,*.jsx}' --public-url http://localhost:3000$PROXY_PREFIX_PATH/static
    fi

    # Run parcel watch on the files in /public/js/app and put the optimized files into the /dist folder.
    echo
    echoYellow "  4. Running watch on client app. Check /dist for changes\n"
    if [ "$AVOID_ZOMBIE_PROCESSES" == "true" ]; then
      parcel watch './public/js/app/{*.js,*.jsx}' --public-url http://localhost:3000$PROXY_PREFIX_PATH/static &
      memorizePidAndWaitForProcessToFinish $!
    else
      parcel watch './public/js/app/{*.js,*.jsx}' --public-url http://localhost:3000$PROXY_PREFIX_PATH/static
    fi
  fi
}

function avoidZombieProcessesOnWindows() {
  SYSTEM=`uname`
  if [ "${SYSTEM:0:7}" == "MINGW64" ]; then
    [ "$BUILD_SH_LOG" == "debug" ] && echo -e "  (Windows Git Bash detected)\n"
    AVOID_ZOMBIE_PROCESSES=true
    LATEST_PID=

    trap avoidZombieProcessAfterControlC SIGINT
  fi
}

function memorizePidAndWaitForProcessToFinish() {
  LATEST_PID=$1
  [ "$BUILD_SH_LOG" == "debug" ] && echo -e "  (Waiting...)\n"
  wait $LATEST_PID
  [ "$BUILD_SH_LOG" == "debug" ] && echo -e "\n  (Ready.)"
  LATEST_PID=
}

function avoidZombieProcessAfterControlC() {
  [ "$BUILD_SH_LOG" == "debug" ] && ps -a
  if [ -n "$LATEST_PID" ]; then
    echo -e "\n\n  (Ensuring that process with PID $LATEST_PID is gone...)"
    if kill -0 $LATEST_PID > /dev/null 2>&1; then
      [ "$BUILD_SH_LOG" == "debug" ] && echo -e "  (Killing process with PID $LATEST_PID)"
      kill $LATEST_PID
    fi
  fi
  [ "$BUILD_SH_LOG" == "debug" ] && echo "  (Cleanup done.)"
  exit 0
}

function echoYellow() {
  MSG=$1
  printf "\033[1;33m$MSG\033[0m\n"
}

main
