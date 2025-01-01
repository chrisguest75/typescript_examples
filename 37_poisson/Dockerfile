# syntax=docker/dockerfile:1.4
FROM node:22.11.0-bookworm AS BUILDER
LABEL dockerfile.baseimage="node:22.11.0-bookworm" dockerfile.description="37_poisson" dockerfile.stage="BUILDER"

WORKDIR /scratch

RUN curl -sf -o /bin/node-prune https://gobinaries.com/tj/node-prune && chmod +x /bin/node-prune && /bin/node-prune

COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY tsconfig.json .prettierrc jest.config.cjs .eslintrc ./
COPY src ./src
COPY tests ./tests
RUN npm run lint
#RUN npm run test:coverage
RUN npm run build
RUN npm run audit:production
RUN npm ci --only=production && npm cache clean --force

# prune the node_modules
RUN /usr/local/bin/node-prune --verbose ./node_modules

FROM gcr.io/distroless/nodejs22-debian12:debug AS PRODUCTION
LABEL dockerfile.baseimage="gcr.io/distroless/nodejs:22" dockerfile.description="37_poisson" dockerfile.stage="PRODUCTION"

ENV NODE_ENV production

WORKDIR /work
COPY --from=BUILDER /scratch/package.json /scratch/package-lock.json ./
COPY --from=BUILDER /scratch/node_modules ./node_modules
COPY --from=BUILDER /scratch/build ./

CMD ["/work/src/index.js"]