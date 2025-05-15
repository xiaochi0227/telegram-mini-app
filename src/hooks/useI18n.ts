import { useI18n as useVueI18n } from 'vue-i18n'
import { computed } from 'vue'

export const useI18n = () => {
  const { t, locale } = useVueI18n()

  // 当前语言
  const currentLocale = computed(() => locale.value)

  // 切换语言
  const changeLocale = (lang: string) => {
    locale.value = lang
    localStorage.setItem('locale', lang)
  }

  // 翻译函数
  const translate = (key: string, params: Record<string, unknown> = {}) => {
    return t(key, params)
  }

  return {
    currentLocale,
    changeLocale,
    t: translate
  }
} 