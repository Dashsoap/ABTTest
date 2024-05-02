const { join } = require('path');

module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    // 可能是编辑器问题 无法正常识别缩进
    '@typescript-eslint/indent': 'off',
    indent: 'off',
  },
};
