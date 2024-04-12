# syntax=docker/dockerfile:1.4
FROM node:20.11.1-bullseye AS BUILDER
LABEL dockerfile.baseimage="node:20.11.1-bullseye" dockerfile.description="34_todo_api" dockerfile.stage="BUILDER"

WORKDIR /scratch

#RUN curl -sf -o /bin/node-prune https://gobinaries.com/tj/node-prune && chmod +x /bin/node-prune && /bin/node-prune

COPY package.json package-lock.json ./
# https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

COPY tsconfig.json .prettierrc jest.config.cjs .eslintrc tsoa.json ./
COPY src ./src
COPY public ./public
#COPY tests ./tests
RUN npm run lint
#RUN npm run test:coverage
RUN npm run build
#RUN npm run audit:production
RUN npm ci --only=production && npm cache clean --force

# prune the node_modules
#RUN /usr/local/bin/node-prune --verbose ./node_modules

FROM gcr.io/distroless/nodejs20-debian11:debug AS PRODUCTION
LABEL dockerfile.baseimage="gcr.io/distroless/nodejs:20" dockerfile.description="34_todo_api" dockerfile.stage="PRODUCTION"

ENV NODE_ENV production

WORKDIR /work
COPY --from=BUILDER /scratch/package.json /scratch/package-lock.json /scratch/tsoa.json ./
COPY --from=BUILDER /scratch/node_modules ./node_modules
COPY --from=BUILDER /scratch/build ./
COPY --from=BUILDER /scratch/public ./public

ENTRYPOINT [ "/nodejs/bin/node" ]
CMD ["--no-warnings", "--experimental-specifier-resolution=node", "/work/src/index.js"]
#CMD ["/nodejs/bin/node", "--no-warnings", "--experimental-specifier-resolution=node", "--loader",  "ts-node/esm", "/work/src/index.js"]
#CMD ["/work/src/index.js"]