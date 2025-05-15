import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import russian from './locales/russian.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('locale') || 'zh',
  fallbackLocale: 'russian',
  messages: {
    zh,
    russian
  }
})

export default i18n