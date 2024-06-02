import colors from 'tailwindcss/colors'
import formsPlugin from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [formsPlugin, {
    handler: ({ addUtilities, matchUtilities, theme }) => {
      matchUtilities(
        {
          'group-px': value => ({
            '--peer-px': value,
          }),
        },
        { values: theme('spacing') },
      )
      addUtilities({
        '.peer-px': {
          paddingInline: 'var(--peer-px)',
        },
      })
    },
  }],
  theme: {
    extend: {
      colors: {
        'primary': colors.sky,
        'brand': '#075783',
        'subtle-white': '#FEFEFE',
      },
      fontSize: {
        '2xs': '0.75rem',
        'xs': '0.8125rem',
        'md': '15px',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
} satisfies Config
