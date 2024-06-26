module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'iblog-plugin',
  ],
  rules: {

    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'react/button-has-type': 'off',
    'i18next/no-literal-string': 'off',
    "no-unused-vars": "off",
    'no-undef': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-console': 'off',
    'no-restricted-globals': 'off',
    "max-len": [
      "error",
      {
        "code": 100,
        "tabWidth": 2,
        "ignoreComments": true, //"comments": 80
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }
    ],
    'operator-linebreak': 'off',
    'no-param-reassign': 'off',
    'arrow-parens': 'off',
    'max-len': 'off',
    'no-unused-expressions': 'off',
    'no-sequences': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 'off',
    'iblog-plugin/path-checker': ['error', { alias: '@' }],
    'react/jsx-no-useless-fragment': 'off',
    'react/no-array-index-key': 'off',
    'iblog-plugin/public-api-imports': ['error', { alias: '@' }],
    'iblog-plugin/layer-imports': [
      'error',
      { alias: '@', 'ignoreImportPatterns': ['**/StoreProvider'] }
    ]
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
  },

};

