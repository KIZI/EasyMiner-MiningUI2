import { createI18n } from 'vue-i18n'

import en from './en.json'

export const i18n = createI18n({
  availableLocales: ['en'],
  legacy: false,
  locale: 'en',
  messages: {
    en,
  },
})
