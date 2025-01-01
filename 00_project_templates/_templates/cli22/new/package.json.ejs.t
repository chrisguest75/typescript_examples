---
to: <%= name %>/package.json
---
{
  "name": "<%= name %>",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "tsc": "tsc",    
    "audit": "better-npm-audit audit",
    "audit:production": "better-npm-audit audit --production",
    "clean": "rimraf build",
    "build": "tsc",
    "rebuild": "npm run clean && npm run build",
    "clean:build": "npm run rebuild",
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "start": "npm run rebuild && node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm ./src/index.ts",
    "start:dev": "npm run rebuild && nodemon",
    "test": "jest --detectOpenHandles --forceExit",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "docs": "typedoc --out docs src",
    "docs:serve": "npm run docs && docker run -v $(pwd)/docs:/usr/share/nginx/html -it --rm -p 8080:80 nginx:1.27.0",
    "docker:build": "docker build --target PRODUCTION -f Dockerfile --label \"org.opencontainers.image.created=$(date '+%Y-%m-%dT%H:%M:%SZ')\" --label \"org.opencontainers.image.version=${githubsha}\" --label \"org.opencontainers.image.url=$(git remote get-url origin)\" -t <%= name %> .",
    "docker:run": "npm run docker:build && docker run --rm -it --name <%= name %> <%= name %>",
    "docker:rebuild": "docker build --no-cache --target PRODUCTION -f Dockerfile --label \"org.opencontainers.image.created=$(date '+%Y-%m-%dT%H:%M:%SZ')\" --label \"org.opencontainers.image.version=${githubsha}\" --label \"org.opencontainers.image.url=$(git remote get-url origin)\" -t <%= name %> .",
    "docker:stop": "docker stop <%= name %>",
    "docker:build:chainguard": "docker build --target PRODUCTION -f Dockerfile.chainguard --label \"org.opencontainers.image.created=$(date '+%Y-%m-%dT%H:%M:%SZ')\" --label \"org.opencontainers.image.version=${githubsha}\" --label \"org.opencontainers.image.url=$(git remote get-url origin)\" -t <%= name %>_chainguard .",
    "docker:run:chainguard": "npm run docker:build:chainguard && docker run --rm -it --name <%= name %>_chainguard <%= name %>_chainguard",
    "docker:rebuild:chainguard": "docker build --no-cache --target PRODUCTION -f Dockerfile.chainguard --label \"org.opencontainers.image.created=$(date '+%Y-%m-%dT%H:%M:%SZ')\" --label \"org.opencontainers.image.version=${githubsha}\" --label \"org.opencontainers.image.url=$(git remote get-url origin)\" -t <%= name %>_chainguard .",
    "docker:stop:chainguard": "docker stop <%= name %>_chainguard"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "@types/minimist": "^1.2.5",
    "@types/node": "^22.9.3",
    "@typescript-eslint/eslint-plugin": "^7.18.0",
    "@typescript-eslint/parser": "^7.18.0",
    "better-npm-audit": "^3.11.0",
    "eslint": "^8.57.1",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "jest": "^29.7.0",
    "nodemon": "^3.1.7",
    "prettier": "^3.3.3",
    "rimraf": "^6.0.1",
    "ts-jest": "^29.2.5",
    "ts-node": "^10.9.2",
    "typedoc": "^0.26.11",
    "typedoc-plugin-mermaid": "^1.12.0",
    "typedoc-plugin-missing-exports": "^3.0.2",
    "typescript": "^5.6.3"
  },
  "nodemonConfig": {
    "watch": [
      "src",
      "nodemon.json",
      "tsconfig.json",
      "package.json"
    ],
    "ext": "ts",
    "ignore": [],
    "exec": "node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm ./src/index.ts"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "minimist": "^1.2.8",
    "pino": "^9.5.0"
  }
}