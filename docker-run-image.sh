#!/bin/bash

ENV=$1

function echoYellow() {
  MSG=$1
  printf "\033[1;33m$MSG\033[0m\n"
}

echo
echoYellow "|---------------------------------------------------------------------|"
echoYellow "|    Running docker image of the application with Docker for dev env  |"   
echoYellow "|---------------------------------------------------------------------|\n"

IMAGE_NAME="kopps-prw"
OUTSIDE_HOST_PORT="3000"
INSIDE_CONTAINER_PORT="3000"


if [ "$ENV" == "dev" ]; then
  echo
  echoYellow "  1. Running start image $IMAGE_NAME on client app, [$OUTSIDE_HOST_PORT]:[$INSIDE_CONTAINER_PORT]\n"
  docker run --env-file .env -p "$OUTSIDE_HOST_PORT":"$INSIDE_CONTAINER_PORT" "$IMAGE_NAME"
fi