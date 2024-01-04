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
    "start:dev": "npm run rebuild && nodemon",
    "test": "jest --detectOpenHandles --forceExit",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "docker:build": "docker build --target PRODUCTION -f Dockerfile --label \"org.opencontainers.image.created=$(date '+%Y-%m-%dT%H:%M:%SZ')\" --label \"org.opencontainers.image.version=${githubsha}\" --label \"org.opencontainers.image.url=$(git remote get-url origin)\" -t <%= name %> .",
    "docker:run": "npm run docker:build && docker run --rm -it --name <%= name %> <%= name %>",
    "docker:rebuild": "docker build --no-cache --target PRODUCTION -f Dockerfile --label \"org.opencontainers.image.created=$(date '+%Y-%m-%dT%H:%M:%SZ')\" --label \"org.opencontainers.image.version=${githubsha}\" --label \"org.opencontainers.image.url=$(git remote get-url origin)\" -t <%= name %> .",
    "docker:stop": "docker stop <%= name %>"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/jest": "^27.0.3",
    "@types/node": "^17.0.0",
    "@types/minimist": "^1.2.2",    
    "@typescript-eslint/eslint-plugin": "^5.7.0",
    "@typescript-eslint/parser": "^5.7.0",
    "better-npm-audit": "^3.7.3",
    "eslint": "^8.5.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "jest": "^27.4.5",
    "nodemon": "^2.0.15",
    "prettier": "^2.5.1",
    "rimraf": "^3.0.2",
    "ts-jest": "^27.1.2",
    "ts-node": "^10.4.0",
    "typedoc": "^0.23.24",
    "typescript": "^4.9.4"
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
    "minimist": "^1.2.5",
    "dotenv": "^16.0.0",    
    "pino": "^7.10.0"
  }
}
