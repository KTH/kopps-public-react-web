#!/bin/bash

ENV=$1

function echoYellow() {
  MSG=$1
  printf "\033[1;33m$MSG\033[0m\n"
}

echo
echoYellow "|--------------------------------------------------------|"
echoYellow "|    Building the Docker image for development env       |"   
echoYellow "|--------------------------------------------------------|\n"

IMAGE_NAME="kopps-prw"

if [ "$ENV" == "dev" ]; then
  echo
  echoYellow "  1. Build Docker image: a name tag is $IMAGE_NAME\n"
  docker build -f Dockerfile-dev -t "$IMAGE_NAME" .

  echo
  echoYellow "  2. List images\n"
  docker images
fi
