#FROM node:14.17.0-alpine as BUILDER
FROM node:14.18.1-bullseye AS BUILDER
WORKDIR /scratch
COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci
COPY patches ./patches
RUN patch -p1 -i patches/image-js+0.33.1.patch       
COPY src ./src
COPY fonts ./fonts
COPY tsconfig.json ./
RUN npm run build

FROM node:14.18.1-bullseye AS PRODUCTION

RUN apt update && apt install jp2a -y

WORKDIR /scratch/out
WORKDIR /scratch
# copy the build
COPY --from=BUILDER /scratch/package.json /scratch/package-lock.json ./
COPY --from=BUILDER /scratch/node_modules ./node_modules
COPY --from=BUILDER /scratch/build ./
COPY --from=BUILDER /scratch/fonts ./fonts

CMD ["node", "index.js"]


