module.exports = {
  extends: ['react-app', 'eslint:recommended', 'prettier'],
  plugins: ['react'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  ignorePatterns: ['node_modules/'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'no-var': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unused-vars': 'error',
  },
};
