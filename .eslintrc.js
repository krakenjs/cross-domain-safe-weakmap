module.exports = {
  extends:
    "./node_modules/@krakenjs/eslint-config-grumbler/eslintrc-typescript",

  rules: {
    // off for initial ts conversion
    //  Implicit any in catch clause
    "@typescript-eslint/no-implicit-any-catch": "off",
    // var will evaluate to '[object Object]' when stringified
    "@typescript-eslint/no-base-to-string": "off",
    // Prefer using an optional chain expression instead, as it's more concise and easier to read
    "@typescript-eslint/prefer-optional-chain": "off",
    // Generic Object Injection Sink
    "security/detect-object-injection": "off",
  },
};
