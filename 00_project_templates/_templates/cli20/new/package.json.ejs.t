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
    "@types/jest": "^29.5.12",
    "@types/minimist": "^1.2.5",
    "@types/node": "^20.11.30",
    "@typescript-eslint/eslint-plugin": "^7.3.1",
    "@typescript-eslint/parser": "^7.3.1",
    "better-npm-audit": "^3.7.3",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "nodemon": "^3.1.0",
    "prettier": "^3.2.5",
    "rimraf": "^5.0.5",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typedoc": "^0.25.12",
    "typescript": "^5.4.3"
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
    "pino": "^8.19.0"
  }
}
