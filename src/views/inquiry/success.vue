<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-white px-6"
  >
    <div class="mt-[-80px] mb-4">
      <van-icon name="passed" size="64" color="#F73C6B" />
    </div>
    <div class="font-bold mb-2 text-center text-[44px]">
      {{ t('inquiry.submitSuccess') }}
    </div>
    <div class="font-bold text-center text-[32px]">
      {{ t('inquiry.contactWithinDays') }}
    </div>
    <div class="font-bold mb-3 text-center text-[32px]">
      {{ t('inquiry.quoteToEmail') }}
    </div>
    <div class="text-[#515360] text-[28px] text-center mb-10 mx-10">
      {{ t('common.view') }} {{ t('nav.account') }} - 
      <span
        class="text-[#0066CC] cursor-pointer underline"
        @click="goToInquiry"
      >
        {{ t('menu.inquiries') }}
      </span>
      {{ t('accountCenter.quoteUpdate') }}
    </div>
    <div class="w-full">
      <van-button block plain size="large" color="#FF356D" round @click="back">
        {{ t('inquiry.continue') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

function back() {
  router.back()
}

function goToInquiry() {
  router.replace('/account/inquiry')
}
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
