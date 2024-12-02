FROM node:22-bookworm

RUN apt-get update && apt-get install -y git curl

RUN npm i -g pnpm

# workaround to solve bug with optional dependencies
RUN npm i @rollup/rollup-linux-x64-gnu

# Install playwright on the global
RUN npm i playwright@1.49.0
RUN npx -y playwright@1.49.0 install --with-deps chromium