// eslint-disable-next-line @typescript-eslint/no-var-requires
// const path = require('path');
import path from 'path';

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    // Parser that checks the content of the <script> tag
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    'browser': true,
    'node': true,
    'vue/setup-compiler-macros': true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // Airbnb JavaScript Style Guide https://github.com/airbnb/javascript
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  rules: {
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: [],
      },
    ], // 对模板中的自定义组件强制执行属性命名样式
    'vue/attributes-order': 'off', // 强制属性顺序
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ], // 强制组件内部的块的顺序
    'vue/component-api-style': ['warn', ['script-setup', 'composition']], // 强制组件API风格
    'vue/component-name-in-template-casing': ['error', 'PascalCase'], // 强制组件名称在模板中的大小写
    'vue/component-options-name-casing': ['error', 'PascalCase'], // 强制组件选项的大小写
    'vue/custom-event-name-casing': ['error', 'camelCase'], // 强制自定义事件名称的大小写
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
      },
    ], // 强制宏定义的顺序
    'vue/dot-location': ['error', 'property'], // 强制点号的位置
    'vue/dot-notation': ['error', { allowKeywords: true }], // 强制点号和属性访问的一致性
    'vue/eqeqeq': ['error', 'smart'], // 强制使用 === 和 !==
    'vue/html-closing-bracket-newline': 'error', // 强制在标签的右括号换行
    // 'vue/html-indent': 'off', // 强制缩进
    'vue/html-indent': ['error', 2],
    'vue/html-quotes': ['error', 'double'], // 强制HTML属性的引号样式
    'vue/html-self-closing': [
      'error',
      {
        html: {
          component: 'always',
          normal: 'never',
          void: 'always',
        },
        math: 'always',
        svg: 'always',
      },
    ], // 强制自闭合标签
    'vue/html-comment-content-newline': 'warn', // 强制HTML注释内容的换行
    'vue/next-tick-style': ['warn', 'promise'], // 强制nextTick使用promise
    'vue/max-attributes-per-line': 'off', // 强制多行元素的属性放在新行
    'vue/multi-word-component-names': 'off', // 强制组件名称为多个单词
    'vue/multiline-html-element-content-newline': 'error', // 强制多行元素的内容放在新行
    'vue/no-duplicate-attr-inheritance': 'warn', // 禁止重复的属性继承
    'vue/no-empty-pattern': 'error', // 禁止空解构模式
    'vue/no-extra-parens': ['error', 'functions'], // 禁止不必要的括号
    'vue/no-required-prop-with-default': 'warn', // 禁止在props中定义有默认值的必填属性
    // 'vue/no-static-inline-styles': 'warn', // 禁止静态内联样式
    'vue/no-template-target-blank': 'error', // 禁止在模板中target="_blank"不带rel="noopener noreferrer"
    'vue/no-this-in-before-route-enter': 'error', // 禁止在beforeRouteEnter中使用this
    'vue/no-undef-properties': 'warn', // 禁止未定义的属性
    'vue/no-unsupported-features': 'warn', // 禁止使用不支持的特性
    'vue/no-unused-emit-declarations': 'warn', // 禁止未使用的emit声明
    'vue/no-unused-properties': 'warn', // 禁止未使用的属性
    'vue/no-use-v-else-with-v-for': 'error', // 禁止在v-for中使用v-else
    'vue/no-useless-mustaches': 'warn', // 禁止无用的花括号
    'vue/no-v-text': 'warn', // 禁止使用v-text
    'vue/padding-line-between-blocks': 'warn', // 强制块之间的填充行
    'vue/prefer-define-options': 'warn', // 优先使用defineOptions
    'vue/prefer-separate-static-class': 'warn', // 优先使用独立的静态类
    // 'vue/prefer-true-attribute-shorthand': 'warn', // 优先使用true属性简写
    'vue/no-irregular-whitespace': 'error', // 禁止不规则的空白
    'vue/no-loss-of-precision': 'error', // 禁止丢失精度
    'vue/no-reserved-component-names': 'off', // 禁止使用保留的组件名称
    'vue/no-restricted-syntax': [
      'error',
      'DebuggerStatement',
      'LabeledStatement',
      'WithStatement',
    ], // 禁止使用特定的语法
    'vue/no-restricted-v-bind': ['error', '/^v-/'], // 禁止使用特定的v-bind
    'vue/no-sparse-arrays': 'error', // 禁止稀疏数组
    'vue/no-unused-refs': 'error', // 禁止未使用的ref
    'vue/no-useless-v-bind': 'error', // 禁止无用的v-bind
    'vue/object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: true,
        ignoreConstructors: false,
      },
    ], // 强制对象字面量简写语法
    'vue/one-component-per-file': 'error', // 一个文件一个组件
    'vue/prefer-import-from-vue': 'error', // 优先使用vue导入
    'vue/prefer-template': 'error', // 优先使用模板
    'vue/prop-name-casing': ['error', 'camelCase'], // 强制prop名称的大小写
    'vue/require-default-prop': 'error', // 强制prop有默认值
    'vue/require-explicit-emits': 'error', // 强制emit声明
    'vue/require-prop-types': 'off', // 强制prop类型
    'vue/singleline-html-element-content-newline': 'off', // 强制单行元素的内容放在新行
    'vue/space-infix-ops': 'error', // 强制中缀操作符周围有空格
    'vue/space-unary-ops': ['error', { nonwords: false, words: true }], // 强制一元操作符周围有空格
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: true,
        ignore: [],
      },
    ], // 强制事件名中的连字符
    'vue/require-macro-variable-name': [
      'warn',
      {
        defineProps: 'props',
        defineEmits: 'emit',
        defineSlots: 'slots',
        useSlots: 'slots',
        useAttrs: 'attrs',
      },
    ], // 强制宏变量的命名
    'vue/valid-define-options': 'warn', // 有效的defineOptions
    // 'prettier/prettier': 1,
    // Vue: Recommended rules to be closed or modify
    // 'vue/require-direct-export': '',
    // Allow @ts-ignore comment
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-check': false,
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
      },
    ], // 禁止使用@ts-<directive>
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'], // 强制一致的类型定义
    '@typescript-eslint/explicit-function-return-type': 'off', // 强制函数返回类型
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 强制模块边界类型
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ], // 禁止空函数
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用any
    '@typescript-eslint/no-namespace': 'off', // 禁止使用命名空间
    '@typescript-eslint/no-non-null-assertion': 'error', // 禁止非空断言
    '@typescript-eslint/no-unused-expressions': 'off', // 禁止未使用的表达式
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ], // 禁止未使用的变量
    '@typescript-eslint/no-use-before-define': 'off', // 禁止定义前使用
    '@typescript-eslint/no-var-requires': 'error', // 禁止使用require
    'unused-imports/no-unused-vars': 'off', // 禁止未使用的导入
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ], // 强制导入文件扩展名
    'no-debugger': 'error', // 禁用debugger
    'no-param-reassign': 'off', // 禁止参数重新赋值
    'prefer-regex-literals': 'error', // 优先使用正则字面量
    'import/no-extraneous-dependencies': 'off', // 禁止无关的依赖
    'class-methods-use-this': 'off', // 强制类方法使用this
    'import/prefer-default-export': 'off', // 优先使用默认导出
    'array-callback-return': 'off', // 强制数组方法的返回值
    'no-bitwise': 'off', // 禁用位运算符
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 'off', // 禁止变量声明与外层作用域的变量同名
    '@typescript-eslint/no-shadow': ['error'], // 禁止变量声明与外层作用域的变量同名
    'no-restricted-syntax': 'off', // 禁止使用特定的语法
    'no-underscore-dangle': 'off', // 禁止标识符中有悬空下划线
    'symbol-description': 'off', // 强制Symbol的描述
    'no-undef': 'off', // 禁止未定义的变量
  },
};
