import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt({
  plugins: {
    '@stylistic': stylistic
  },
  files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
  rules: {
    'no-console': 'off',
    'no-empty': 'off',
    'no-unused-vars': 'off',
    'operator-linebreak': 'off',

    'vue/multi-word-component-names': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',

    '@stylistic/arrow-parens': 'off',
    '@stylistic/member-delimiter-style': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/operator-linebreak': 'off',

    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off'
  }
})
