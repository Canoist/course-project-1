module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    semi: [2, "always"],
    "space-before-function-paren": ["error", "always"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
  },
};
