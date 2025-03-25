#!/usr/bin/env bash

echo 'Setting things up...'

if ! test -f .env; then
  echo ".env does not exist."
  cp .env.example .env
fi

npm install

cd api

if ! test -f .env; then
  echo ".env does not exist."
  cp .env.example .env
fi

npm install

npx prisma migrate deploy

npx prisma generate

cd ../admin

if ! test -f .env; then
  echo ".env does not exist."
  cp .env.example .env
fi

npm install --legacy-peer-deps

echo 'Setup done. To run all projects at once: npm run start'
