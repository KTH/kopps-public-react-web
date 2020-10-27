#!/bin/bash

# File version tag: 2020-10-27

CMD=$1

source docker.conf
PROJECTNAME=${2:-$IMAGE_NAME}

PROJECTTAG=$PROJECTNAME:local
PROJECTTYPE=${PROJECTNAME:${#PROJECTNAME}-3}

function main() {
  if [ "$CMD" == "start" ]; then
    start
  elif [ "$CMD" == "stop" ]; then
    stop
    printf "\nDone."
  elif [ "$CMD" == "clean" ]; then
    clean
    printf "\nDone."
  elif [ "$CMD" == "pre-push" ]; then
    prepush
    printf "\nDone."
  else
    usage
  fi
}

function start() {
  if [ "$PROJECTTYPE" == "web" ]; then
    PORT=3000
  elif [ "$PROJECTTYPE" == "api" ]; then
    PORT=3001
  else
    error "Invalid project-tag"
  fi

  echo
  echoYellow "--> Building Docker image of $PROJECTNAME <--\n"
  docker build --tag $PROJECTTAG . || exit 1

  echo
  echoYellow "--> Docker image of $PROJECTNAME ready <--\n"
  docker images $PROJECTTAG || exit 1

  if [ -f docker-local.env ]; then
    echo
    echoYellow "--> Starting new Docker container with $PROJECTNAME <--"
    echoYellow "   (Using port $PORT and file 'docker-local.env')"
    echoYellow "  Remember 'npm run docker:stop' when you are done!\n"
    docker run --publish $PORT:$PORT --env-file docker-local.env $PROJECTTAG || exit 1
  else
    echo
    echoYellow "--> Starting new Docker container with $PROJECTNAME <--"
    echoYellow "   (Using port $PORT and file '.env')"
    echoYellow "  Remember 'npm run docker:stop' when you are done!\n"
    docker run --publish $PORT:$PORT --env-file .env $PROJECTTAG || exit 1
  fi
}

function stop() {
  IDS1=$(docker ps --filter ancestor=$PROJECTTAG --all --quiet)
  if [ -n "$IDS1" ]; then
    echo
    echoYellow "--> Stopping any Docker container of $PROJECTNAME <--\n"
    docker rm --volumes --force $(echo "$IDS1") || exit 1
  fi

  IDS2=$(docker ps --filter status=exited --all --quiet)
  if [ -n "$IDS2" ]; then
    echo
    echoYellow "--> Removing any stopped Docker container <--\n"
    docker rm --volumes $(echo "$IDS2") || exit 1
  fi
}

function clean() {
  stop

  IDS3=$(docker images --quiet $PROJECTTAG)
  if [ -n "$IDS3" ]; then
    echo
    echoYellow "--> Deleting Docker images of $PROJECTNAME <--\n"
    docker rmi --force $(echo "$IDS3") || exit 1
  fi
}

function prepush() {
  if [ -r .env ]; then
    source .env 2> /dev/null
  elif [ -r docker-local.env ]; then
    source docker-local.env 2> /dev/null
  fi

  if [ "$RUN_DOCKER_BUILD_BEFORE_GIT_PUSH" == "true" ]; then
    echo
    echoYellow "--> Testing build of Docker image of $PROJECTNAME <--\n"
    docker build --tag $PROJECTTAG . || exit 1
  else
    echo
    echo "--> NOT testing build of Docker image <--"
    echo " Add the following in .env or docker-local.env to activate this step:"
    echo "    RUN_DOCKER_BUILD_BEFORE_GIT_PUSH=true"
  fi
}

function usage() {
  echo "Tool for testing current project in production mode using Docker locally."
  echo
  echo "Usage:"
  echo "  $0 <command> <project-tag?>"
  echo
  echo "  where <command>      is 'start', 'stop', 'clean' or 'pre-push',"
  echo "        <project-tag?> is a project name that ends with '-api' or '-web'"
  echo "                       (or IMAGE_FILE from docker.conf will be used, if omitted)"
  echo
  echo "Examples:"
  echo "  $0 start"
  echo "  $0 start program-web"
}

function error() {
  MSG=$1
  echoYellow "ERROR: $MSG"
  usage
  exit 1
}

function echoYellow() {
  MSG=$1
  printf "\033[1;33m$MSG\033[0m\n"
}

main
