#FROM node:14.17.0-alpine as BUILDER
FROM node:14.15.4-alpine AS BUILDER
WORKDIR /scratch
COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY src ./src
COPY tsconfig.json ./
RUN npm run build

FROM node:14.15.4-alpine AS PRODUCTION
ENV ENVIRONMENT=nonprod-na
ENV XML_FILE=./results.xml 
ENV SLACK_POST=https://hooks.slack.com/services/TOKEN
ENV SLACK_CHANNEL=#channel
ENV POST_TO_SLACK=true

WORKDIR /scratch
# copy the build
COPY --from=BUILDER /scratch/package.json /scratch/package-lock.json ./
RUN npm ci
COPY --from=BUILDER /scratch/build ./

RUN node index.js

