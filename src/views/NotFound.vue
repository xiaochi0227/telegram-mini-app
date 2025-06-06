<template>
  <div class="not-found flex flex-col items-center justify-center">
    <img src="@/assets/images/404.png" alt="Not Found" class="w-[400px] h-[400px]" />
    <div class="text-[32px] font-bold">{{t('page.404')}}</div>
    <div class="text-[28px] text-[#333] mt-[16px]">{{ t('page.notFound') }}</div>
    <div class="w-[180px] mt-[40px]">
      <van-button   block color="#FF5E2B"  type="primary" class="h-[80px]" @click="goHome">
        {{ t('checkout.backToHome') }}
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.van-button {
  height: 72px;
  border-radius: 36px;
}
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
</style>