<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>
    <div
      class="flex flex-col gap-4 mx-[32px] px-[24px] py-[36px] bg-white rounded-[12px] shadow-sm"
    >
      <p class="text-[24px] text-[#515360]">{{ t('recharge.description') }}</p>

      <p class="text-center text-[#FF356D] text-[28px]" @click="makePhoneCall(t('recharge.phoneNumber'))">
        <i class="iconfont icon-Phone text"></i>&nbsp;
        {{ t('recharge.phone') }}：{{ t('recharge.phoneNumber') }}
      </p>
      <div class="flex flex-col bg-[#F4F4F4] rounded-lg p-4 text-[#333]">
        <p class="mb-5 text-[24px] font-[600]">
          {{ t('recharge.service1') }}
        </p>
        <p class="text-[24px] font-[600]">
          {{ t('recharge.service2') }}
        </p>
        <p class="text-[22px]">{{ t('recharge.service3') }}</p>
      </div>

      <p class="text-[#393B45] text-[22px]">{{ t('recharge.future') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
interface PhoneCall {
  phoneNumber: string;
}

const makePhoneCall = (phoneNumber: PhoneCall['phoneNumber']): void => {
  window.location.href = `tel:${phoneNumber}`;
};
</script>
<style lang="scss" scoped>
.iconfont {
	font-size: 28px;
}
</style>
