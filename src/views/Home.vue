<template>
  <div class="home">
    <h1>{{ t('aboutus.service.li1') }}</h1>
    <div class="language-switch">
      <button @click="switchLanguage('zh')" :class="{ active: locale === 'zh' }">中文</button>
      <button @click="switchLanguage('russian')" :class="{ active: locale === 'russian' }">russian</button>
    </div>
    {{ tips }}
  </div>
</template>

<script setup>
import { useAppStore } from '@/store';
import { useI18n } from 'vue-i18n'

const appStore = useAppStore();
const user = appStore.user;
const { t, locale } = useI18n()

console.log(locale.value)

const tips = window.Telegram?.WebApp.initData

const switchLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('locale', lang);
};

const handleShowPopup = async () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.showPopup({
      title: t('common.popupTitle'),
      message: t('common.getPhoneMessage'),
      buttons: [
        { id: "close", type: "close", text: t('common.close') },
      ],
    });
  } else {
    console.error(t('common.telegramNotAvailable'));
  }
};
</script>

<style scoped>
.home {
  padding: 20px;
}

p {
  font-size: 16px;
  margin: 5px 0;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
}

.language-switch {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.language-switch button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-switch button.active {
  background: #2481cc;
  color: white;
  border-color: #2481cc;
}
</style>