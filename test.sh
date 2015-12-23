#/bin/bash

npm run test-server:start

if [[ "$1" != "single" ]]
then
  npm run webpack-build
fi

npm run test:node:single && npm run test:karma:single
npm run test-server:stop
