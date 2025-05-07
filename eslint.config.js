const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',

        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',

        jest: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
  prettierConfig,
];
