<template>
  <div class="flex flex-col items-center justify-center h-screen bg-white">
    <img src="@/assets/images/invalid.png" alt="Invalid Entry" class="w-[400px] h-[400px] -mt-[200px]" />
    <h1 class="text-[32px] font-bold text-[rgb(51,51,51)] mb-2">{{ t('invalid.title') }}</h1>
    <p class="text-[28px] px-[24px] text-center text-[#333333]">{{ t('invalid.text') }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
