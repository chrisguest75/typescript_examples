---
to: .eslintrc
---
{
  "env": {
      "browser": false,
      "es2021": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": 2019,
      "sourceType": "module"
  },
  "plugins": [
      "@typescript-eslint", 
      "prettier"
  ],
  "rules": {
      "prettier/prettier": [
          "error",
          {
              "useTabs": false,
              "semi":  false,
              "trailingComma":  "all",
              "singleQuote":  true,
              "printWidth":  120,
              "tabWidth":  2
          }]
  }
}