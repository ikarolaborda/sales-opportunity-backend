#!/bin/bash
set -e

export NG_CLI_ANALYTICS=ci

npm install --save-dev @types/node

npm install -g nodemon

npm install

npm run db:create

npm run build:documentation

npm start
