<template>
  <div class="mx-[1rem]">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="bg-[#fff] rounded-[24px] px-[24px] py-[40px]">
      <div class="text-[24px]">{{ t('recharge.description') }}</div>
      <div class="text-[#FF356D] text-[28px] mt-[32px] mb-[24px] text-center" @click="handleCall(t('recharge.phoneNumber'))">
        <i class="iconfont icon-Phone"></i>
        {{ t('recharge.phone') }}：
        {{ t('recharge.phoneNumber') }}
      </div>
      <div class="px-[20px] pt-[24px] pb-[64px] bg-[#F4F4F4] rounded-[24px]">
        <div class="text-[#333] font-bold text-[24px]">{{ t('recharge.service1') }}</div>
        <div class="text-[#333] font-bold text-[24px] pt-[64px] pb-[12px]">{{ t('recharge.service2') }}</div>
        <div class="text-[#333] text-[24px]">{{ t('recharge.service3') }}</div>
      </div>
      <div class="text-[#393B45] text-[24px] pt-[24px]">{{ t('recharge.future') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/index.vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const handleCall = (phone) => {
  {
    // 调用拨号功能
    window.location.href = `tel:${phone}`;
  }
};

</script>

<style scoped>
.icon-Phone {
  font-size: 32px;
  color: #FF356D;
}
</style>