import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import globals from "globals";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...astro.configs["flat/recommended"],

  // Scoped type-aware rules
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,

    files: ["**/*.{ts,tsx,astro}"],

    languageOptions: {
      ...config.languageOptions,

      parserOptions: {
        ...config.languageOptions?.parserOptions,
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  })),

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,astro}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },

  {
    files: ["**/*.astro"],

    languageOptions: {
      parser: astroParser,

      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
    },
  },

  {
    ignores: ["dist", ".astro", "node_modules"],
  },
];
