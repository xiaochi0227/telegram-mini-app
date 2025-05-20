<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-white px-6"
  >
    <div class="mt-[-80px] mb-4">
      <van-icon name="passed" size="64" color="#F73C6B" />
    </div>
    <div class="font-bold mb-2 text-center text-[44px]">提交成功</div>
    <div class="font-bold text-center text-[32px]">业务员会在两个工作日内与您联系功</div>
    <div class="font-bold mb-3 text-center text-[32px]">并将报价发送至您的邮箱</div>
    <div class="text-[#515360] text-[28px] text-center mb-10 mx-10">
      您也可以登录至 账户中心 - 询价单 中查看最新的报价信息
    </div>
    <div class="w-full">
      <van-button
        block
        plain
        size="large"
        color="#FF356D"
        round
        @click="back"
      >
        继续询价
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.back()
}
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
