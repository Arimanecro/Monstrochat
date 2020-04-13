module.exports = {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
   'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
   //'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  parserOptions:  {
  ecmaVersion:  2019,  // Allows for the parsing of modern ECMAScript features
  sourceType:  'module',  // Allows for the use of imports
  ecmaFeatures:  {
    jsx:  true,  // Allows for the parsing of JSX
    tsx: true
  },
  },
  rules:  {
    "@typescript-eslint/explicit-function-return-type": "off",    
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-unused-expressions": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/display-name": ["off", { "ignoreTranspilerName": true }],
    "@typescript-eslint/no-empty-function": "off"
  },
  settings:  {
    react:  {
      version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};