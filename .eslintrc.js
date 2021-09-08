module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
  ],
  rules: {
    'no-console': 0, // process.env.NODE_ENV === 'production' ? 1 : 0, //禁用 console
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0, //禁用 debugger
    'no-var': 1, //禁用var，用let和const代替
    'no-use-before-define': 'off', //未定义前不能使用
    'no-undef': 2, //不能有未定义的变量
    'no-redeclare': 2, //禁止重复声明变量
    'no-const-assign': 2, //禁止修改const声明的变量
    'default-case': 2, //switch语句最后必须有default
    '@typescript-eslint/explicit-module-boundary-types': 'off', // ts每个函数都要显式声明返回值
    '@typescript-eslint/no-var-requires': 0, // 允许require
    '@typescript-eslint/no-explicit-any': 'off', // 可以使用any
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
  },
};
