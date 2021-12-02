module.exports = {
  'extends': './node_modules/grumbler-scripts/config/.eslintrc-typescript.js',
  'rules': {
    'no-mixed-operators': 'off',
    // initial typescript migration overrides
    '@typescript-eslint/no-implicit-any-catch': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off'
  }
};
