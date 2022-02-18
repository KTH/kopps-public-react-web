#!/bin/bash

ENV=$1

function echoYellow() {
  MSG=$1
  printf "\033[1;33m$MSG\033[0m\n"
}

echo
echoYellow "|--------------------------------------------------------|"
echoYellow "| Building the application with Docker for dev env       |"   
echoYellow "|--------------------------------------------------------|\n"

IMAGE_NAME="kopps-prw"
OUTSIDE_HOST_PORT="3000"
INSIDE_CONTAINER_PORT="3000"


if [ "$ENV" == "dev" ]; then
  echo
  echoYellow "  1. Build Docker image: a name tag is $IMAGE_NAME\n"
  docker build -f Dockerfile-dev -t "$IMAGE_NAME" .

  echo
  echoYellow "  2. List images\n"
  docker images

  echo
  echoYellow "  2. Running start image on client app, [host port]:[container port]\n"
  docker run --env-file .env -p "$OUTSIDE_HOST_PORT":"$INSIDE_CONTAINER_PORT" "$IMAGE_NAME"
fi
