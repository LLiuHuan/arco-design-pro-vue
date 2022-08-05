module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'airbnb-base',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    '@vue/typescript/recommended',
  ],
  globals: {
    PROJECT_BUILD_TIME: 'readonly',
    AMap: 'readonly',
    BMap: 'readonly',
    TMap: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-useless-path-segments': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vue-router',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vuex',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'pinia',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@arco-design/web-vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/config',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/settings',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/enums',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/plugins',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/layouts',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/views',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/router',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/store',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/composables',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/service',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/utils',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/assets',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/interface',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'vue',
          'vue-router',
          'vuex',
          'pinia',
          '@arco-design/web-vue',
        ],
      },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',
    // 'no-param-reassign': [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: ['state', 'acc', 'e'],
    //   },
    // ],
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'no-plusplus': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'],
      },
    ],
    'vue/custom-event-name-casing': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_',
    //   },
    // ],
    // 'no-unused-vars': [
    //   'error',
    //   {
    //     argsIgnorePattern: '^_',
    //     varsIgnorePattern: '^_',
    //   },
    // ],
    'space-before-function-paren': 'off',

    'vue/attributes-order': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/script-setup-uses-vars': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { ignoreRestSiblings: true, varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { classes: true, functions: false, typedefs: false },
    ],
    'valid-typeof': 'off', // ts(2367)
    // 'vue/multi-word-component-names': [
    //   'error',
    //   {
    //     ignores: [
    //       'Layout',
    //       'Logo',
    //       '403',
    //       '404',
    //       '500',
    //       'Menu',
    //       'Redirect',
    //       'Monitor',
    //       'About',
    //       'Settings',
    //       'Login',
    //       'State',
    //       'Application',
    //       'Chart',
    //       'Breadcrumb',
    //     ],
    //   },
    // ],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': 'off',
      },
    },
  ],
};
