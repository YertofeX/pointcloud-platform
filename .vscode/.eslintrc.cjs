module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    //! 'prettier' must be last
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: ["./tsconfig.json", "./tsconfig.*.json"],
      },
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "prettier", "simple-import-sort"],
  rules: {
    "@typescript-eslint/quotes": ["off", "double"],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "object-shorthand": "off",
    "sort-imports": "off",
    "import/order": "off",
    "import/extensions": "off",
    "simple-import-sort/imports": [
      2,
      {
        groups: [
          // Packages `react` related packages come first.
          ["^react", "^@?\\w"],
          // MUI imports
          ["^@mui/material"],
          ["^@mui/icons-material"],
          // Internal packages.
          ["^(@)(/.*|$)"],
          // Aliased paths
          ["^@lib/"],
          ["^@api/"],
          ["^@modules/"],
          ["^@layouts/"],
          ["^@routes/"],
          ["^@modules/"],
          ["^@components/"],
          ["^@themes/"],
          ["^@utils/"],
          ["^@assets/"],
          ["^@locales/"],
          // Side effect imports.
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/no-unresolved": "off",
    "no-param-reassign": "off",
    "no-nested-ternary": "off",
    "no-console": "off",
    "no-restricted-exports": [
      "error",
      {
        restrictDefaultExports: {
          direct: true,
          named: true,
          defaultFrom: true,
          namedFrom: true,
          namespaceFrom: true,
        },
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*"],
      },
    ],
    radix: "off",
    "import/first": "error",
    "import/no-cycle": "off",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-max-props-per-line": [2, { maximum: 1, when: "multiline" }],
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
  },
};
