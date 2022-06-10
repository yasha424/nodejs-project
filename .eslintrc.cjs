module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ['sonarjs'],
  extends: ['airbnb-base', 'plugin:sonarjs/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
};
