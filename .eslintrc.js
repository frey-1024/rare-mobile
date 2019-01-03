module.exports = {
  extends: [
    'plugin:react/recommended'
  ],
  env: {
    browser: true,
    node: true,
    mocha: true,
    jest: true,
    es6: true
  },
  parser: 'typescript-eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: '16.6.3',
      flowVersion: '0.53'
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      {property: 'freeze', object: 'Object'},
      {property: 'myFavoriteWrapper'}
    ]
  },
  plugins: [
    'typescript',
    'markdown',
    'react',
    'babel',
    'jsx-a11y'
  ],
  rules: {
    'typescript/class-name-casing': 'error',
    'class-methods-use-this': 0,
    'func-names': 0,
    'no-unused-expressions': 'off',
    'react/sort-comp': 0,
    'react/prop-types': 0,
    'space-before-function-paren': [0, 'always'],
    'react/jsx-first-prop-new-line': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'max-len': 0,
    'react/jsx-space-before-closing': 0,
    'react/jsx-pascal-case': 1,
    'object-curly-spacing': 0,
    'react/no-multi-comp': 0,
    'array-callback-return': 0,
    'key-spacing': ['error', { 'mode': 'strict' }],
    'import/no-unresolved': 0,
    'no-else-return': 2,
    'no-multi-spaces': 'error',
    'no-use-before-define': 2,
    'indent': [
      2,
      2,
      {
        'SwitchCase': 1
      }
    ],
    'jsx-a11y/img-has-alt': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-string-refs': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.md'] }],
    'react/no-array-index-key': 0,
    'react/no-find-dom-node': 0,
    'react/require-extension': 0,
    'jsx-quotes': 1,
    'react/jsx-closing-bracket-location': 1,
    'react/jsx-boolean-value': 1,
    'react/self-closing-comp': 1,
    'react/jsx-no-bind': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'prefer-destructuring': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-no-comment-textnodes': 0,
    'object-curly-newline': 0,
    'no-console': 0,
    'no-alert': 0,
    'no-extra-semi': 0,
    'semi': [2, 'always'],
    'no-plusplus': 0,
    'import/no-webpack-loader-syntax': 0,
    'eol-last': 0,
    'prefer-rest-params': 0
  }
};
