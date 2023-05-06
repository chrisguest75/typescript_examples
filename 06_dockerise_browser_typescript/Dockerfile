#FROM node:14.17.0-alpine as BUILDER
FROM node:14.15.4-alpine AS BUILDER

WORKDIR /scratch
COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY src ./src
COPY tsconfig.json ./
RUN npm run build

FROM nginx:1.17.10 AS PRODUCTION

WORKDIR /usr/share/nginx/html

# copy the build
COPY --from=BUILDER /scratch/dist ./
