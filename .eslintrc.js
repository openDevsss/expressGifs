module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    node: true,
    es6: true,
  },
  rules: {
    "prettier/prettier": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        js: "never",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    camelcase: "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
