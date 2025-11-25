import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    }
  }
];