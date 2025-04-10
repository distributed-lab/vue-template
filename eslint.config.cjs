const promise = require('eslint-plugin-promise')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const globals = require('globals')
const parser = require('vue-eslint-parser')
const js = require('@eslint/js')

const {
  FlatCompat,
} = require('@eslint/eslintrc')

const vueI18n = require('@intlify/eslint-plugin-vue-i18n')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = [
  ...vueI18n.configs['flat/recommended'],

  ...compat.extends(
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/prettier',
    '@vue/eslint-config-prettier',
  ), {
    settings: {
      'vue-i18n': {
        localeDir: 'src/localization/**/*.(json|json5)',
        messageSyntaxVersion: '^9.0.0',
      },
    },

    plugins: {
      promise,
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },

      parser: parser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },

    rules: {
      'prettier/prettier': ['error', {}, {
        usePrettierrc: true,
      }],

      '@intlify/vue-i18n/no-dynamic-keys': 'error',
      '@intlify/vue-i18n/no-unused-keys': [
        'error',
        {
          extensions: ['.js', '.vue'],
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'arrow-parens': 0,
      'no-debugger': 1,

      'no-warning-comments': [1, {
        terms: ['hardcoded'],
        location: 'anywhere',
      }],

      'no-return-await': 1,
      'object-curly-spacing': ['error', 'always'],
      'no-var': 'error',
      'comma-dangle': [1, 'always-multiline'],
      'linebreak-style': ['error', 'unix'],
      'generator-star-spacing': 0,
      'no-tabs': 2,

      'max-len': [1, {
        code: 100,
        comments: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      }],

      'no-console': [1, {
        allow: ['warn', 'error'],
      }],

      quotes: [2, 'single', {
        avoidEscape: false,
      }],

      'no-multiple-empty-lines': [2, {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      }],

      semi: [2, 'never'],
      'vue/multi-word-component-names': 0,
      'vue/component-definition-name-casing': ['error', 'kebab-case'],
      'vue/valid-v-for': 2,
      'vue/attributes-order': 0,
      'vue/order-in-components': 1,
      'vue/html-closing-bracket-newline': 0,
      'vue/attribute-hyphenation': 1,
      'vue/component-name-in-template-casing': [2, 'kebab-case'],
      'vue/html-end-tags': 2,
      'vue/html-quotes': 1,
      'vue/multiline-html-element-content-newline': 1,
      'vue/mustache-interpolation-spacing': 1,
      'vue/no-async-in-computed-properties': 2,
      'vue/no-use-v-if-with-v-for': 1,
      'vue/no-dupe-keys': 2,
      'vue/no-duplicate-attributes': 2,
      'vue/no-multi-spaces': 1,
      'vue/no-reserved-keys': 2,
      'vue/no-shared-component-data': 2,
      'vue/no-side-effects-in-computed-properties': 2,
      'vue/no-spaces-around-equal-signs-in-attribute': 2,
      'vue/no-template-key': 2,
      'vue/no-textarea-mustache': 2,
      'vue/no-unused-components': 1,
      'vue/no-unused-vars': 1,
      'vue/no-v-html': 1,
      'vue/prop-name-casing': 2,
      'vue/require-default-prop': 2,
      'vue/require-prop-types': 2,
      'vue/require-valid-default-prop': 2,
      'vue/this-in-template': 2,
      'vue/v-bind-style': 2,
      'vue/v-on-style': 2,
      'vue/valid-template-root': 2,
      'vue/valid-v-bind': 2,
      'vue/valid-v-else-if': 2,
      'vue/valid-v-else': 2,
      'vue/valid-v-model': 2,
      'vue/valid-v-on': 2,

      'vue/singleline-html-element-content-newline': [1, {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'span'],
      }],

      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-nesting': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/prefer-await-to-then': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },

    ignores: [
      'build/*.js',
      'dist/*.js',
      'config/*.js',
      'playground',
      '*.schema.js',
      'index.html',
      '*.md',
      'static/env.js',
      'vite.config.ts',
    ],
  },
]
