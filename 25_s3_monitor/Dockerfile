# syntax=docker/dockerfile:1.4
FROM node:16.13.2-bullseye AS builder
LABEL dockerfile.baseimage="node:16.13.2-bullseye" dockerfile.description="25_s3_monitor" dockerfile.stage="BUILDER"

WORKDIR /scratch
COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY tsconfig.json .prettierrc jest.config.js .eslintrc ./
COPY routes ./routes
COPY src ./src
COPY tests ./tests
COPY public ./public
RUN npm run lint
RUN npm run test:coverage
RUN npm run build
RUN npm audit
RUN npm ci --only=production && npm cache clean --force

FROM gcr.io/distroless/nodejs:16 AS production
LABEL dockerfile.baseimage="gcr.io/distroless/nodejs:16" dockerfile.description="ts_sbom_test" dockerfile.stage="PRODUCTION"

ARG AWS_PROFILE=myprofile
ARG AWS_REGION=us-east-1
ENV AWS_PROFILE=${AWS_PROFILE} 
ENV AWS_REGION=${AWS_REGION}

ENV NODE_ENV production

WORKDIR /work
COPY --from=builder /scratch/node_modules ./node_modules
COPY --from=builder /scratch/build ./

CMD ["/work/src/index.js"]

FROM production AS withprofile
COPY --from=profile . /root/.aws
