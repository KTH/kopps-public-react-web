#!/usr/bin/env bash
set -euo pipefail

ENV="${1:-dev}"

echo
echo -e "\033[1;33m|--------------------------------------------------------|\033[0m"
echo -e "\033[1;33m| Building the application with Bash and Webpack         |\033[0m"
echo -e "\033[1;33m|--------------------------------------------------------|\033[0m\n"

echo -e "\033[1;33m  1. Copying files\033[0m"
mkdir -p ./server/views/system ./server/views/layouts
cp -R ./node_modules/@kth/kth-node-web-common/lib/handlebars/pages/views/. server/views/system
cp -R ./node_modules/@kth/kth-node-web-common/lib/handlebars/pages/layouts/. server/views/layouts

if [[ "$ENV" == "prod" ]]; then
  echo -e "\n\033[1;33m  2. Bundling client (prod)\033[0m\n"
  WEBPACK_ENV=prod WEBPACK_MODE=build webpack
elif [[ "$ENV" == "dev" ]]; then
  echo -e "\n\033[1;33m  2. Bundling client once (dev)\033[0m\n"
  WEBPACK_ENV=dev WEBPACK_MODE=build webpack

  echo -e "\n\033[1;33m  3. Watching client (dev)\033[0m\n"
  WEBPACK_ENV=dev WEBPACK_MODE=watch webpack
elif [[ "$ENV" == "docker" ]]; then
  echo -e "\n\033[1;33m  2. Bundling client (docker)\033[0m\n"
  WEBPACK_ENV=dev WEBPACK_MODE=build webpack
fi
