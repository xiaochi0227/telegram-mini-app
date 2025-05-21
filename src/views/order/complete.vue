<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-white px-6"
  >
    <div class="mt-[-80px] mb-4">
      <van-icon name="passed" size="64" color="#F73C6B" />
    </div>
    <div class="font-bold mb-2 text-center text-[44px]">
      {{ t('checkout.paymentSuccess') }}
    </div>
    <div class="text-[#515360] text-[28px] text-center mb-10">
      {{
        t('checkout.orderDetailsHint', {
          account: t('nav.account'),
          orders: t('menu.orders'),
        })
      }}
    </div>
    <div class="flex flex-col gap-2 w-full">
      <van-button
        block
        size="large"
        type="primary"
        color="#FF356D"
        round
        @click="goOrderDetail"
      >
        {{ t('checkout.viewOrderDetails') }}
      </van-button>
      <van-button
        block
        plain
        size="large"
        color="#FF356D"
        round
        @click="goHome"
      >
        {{ t('checkout.backToHome') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon as VanIcon, Button as VanButton } from 'vant'
import { decryptParams } from '@/utils/encryption'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const decryptedData = ref({})

const encryptedData = route.query.query || ''
// 解密后的传参
decryptedData.value = encryptedData
  ? decryptParams(decodeURIComponent(encryptedData))
  : {}

function goOrderDetail() {
  const { purchase_order_id } = decryptedData.value
  router.replace('/account/purchase/' + purchase_order_id) // 根据实际路由调整
}

function goHome() {
  router.replace('/')
}
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
