import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      // Complexity-related rules to reduce likelihood of recursion issues
      complexity: ["warn", 10],
      "max-depth": ["warn", 4],
      "max-statements": ["warn", 20],
      "no-unreachable-loop": "warn",
      "no-use-before-define": ["warn", { functions: true, classes: true }], // helps avoid accidental self-references
      "max-nested-callbacks": ["warn", 3], // keeps code simple and prevents nested recursion

      // Additional rules for React and general JavaScript patterns
      "react-hooks/exhaustive-deps": "warn", // ensures dependencies are included, preventing infinite loops in hooks
      "react/no-direct-mutation-state": "warn", // warns against direct state mutation, which can cause render recursion
      "no-param-reassign": ["warn", { props: true }], // prevents reassignment that might lead to recursive errors

      // General best practice for function usage
      "no-loop-func": "warn", // prevents functions within loops that can lead to stack issues
      "no-unused-vars": ["warn", { args: "after-used", vars: "all" }], // catches unused function parameters that might mask recursion
    },
  },

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
