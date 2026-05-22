import js from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ...js.configs.recommended,
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default config;
