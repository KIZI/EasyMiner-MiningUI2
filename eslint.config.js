import antfu from '@antfu/eslint-config'
import { eslintPluginTailwindCssConfig } from './eslint.tailwind.config.js'

export default antfu(
  {
    ignores: ['node_modules', '**/node_modules/**', 'public', '**/public/**', 'dist', '**/dist/**', 'test.ts', '**/test.ts/**'],
    formatters: true,
  },
  ...eslintPluginTailwindCssConfig,
  {
    rules: {
      'vue/block-order': ['error', {
        order: [['template', 'script'], 'style'],
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'antfu/if-newline': 'off',
      'curly': ['error', 'multi-line'],
    },
  },
)
