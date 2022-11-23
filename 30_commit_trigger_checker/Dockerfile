FROM node:16.13.2-bullseye AS BUILDER
LABEL dockerfile.baseimage="node:16.13.2-bullseye" dockerfile.description="30_commit_trigger_checker" dockerfile.stage="BUILDER"

WORKDIR /scratch
COPY package.json package-lock.json tsconfig.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY index.ts ./index.ts
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

FROM gcr.io/distroless/nodejs:16-debug AS PRODUCTION
LABEL dockerfile.baseimage="gcr.io/distroless/nodejs:16" dockerfile.description="30_commit_trigger_checker" dockerfile.stage="PRODUCTION"

ENV NODE_ENV production

WORKDIR /work
COPY --from=BUILDER /scratch/node_modules ./node_modules
COPY --from=BUILDER /scratch/build ./
#COPY --from=BUILDER /scratch/src ../src

CMD ["/work/index.js"]