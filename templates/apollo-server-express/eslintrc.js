const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    "no-extra-boolean-cast": OFF,
    "no-useless-escape": OFF,
    "prefer-const": OFF,
    "@typescript-eslint/no-floating-promises": OFF,
    "@typescript-eslint/ban-ts-comment": OFF,
    "@typescript-eslint/no-unsafe-assignment": OFF,
    "@typescript-eslint/no-unsafe-member-access": OFF,
    "@typescript-eslint/no-unsafe-call": OFF,
    "@typescript-eslint/unbound-method": OFF,
    "@typescript-eslint/await-thenable": OFF,
    "@typescript-eslint/no-unsafe-return": OFF,
    "@typescript-eslint/restrict-template-expressions": OFF,
    "@typescript-eslint/require-await": OFF,
    "@typescript-eslint/no-for-in-array": OFF,
    "@typescript-eslint/no-misused-promises": OFF,
    "@typescript-eslint/no-unsafe-argument": OFF,
    "@typescript-eslint/no-non-null-assertion": OFF,
    "@typescript-eslint/no-explicit-any": OFF,
    "@typescript-eslint/no-unused-vars": [WARNING, {
      "varsIgnorePattern": "^_",
      "argsIgnorePattern": "^_",
      "destructuredArrayIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_",
    }]
  }
};