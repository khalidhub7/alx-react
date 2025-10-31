module.exports = {
  env: {
    browser: true, es2021: true, node: true, jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: { jsx: true }, ecmaVersion: 12, sourceType: 'module',
  },
  plugins: ['react'],

  rules: {
    'no-console': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx'] },
    ],
    "react/jsx-props-no-spreading": "off"
  },
};
