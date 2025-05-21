<template>
  <div class="flex flex-col px-[32px] min-h-screen">
    <div class="nav-header px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]">
      <nav-bar />
    </div>

    <!-- 详情卡片 -->
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto p-[28px]">
      <div class="flex justify-between mb-2 text-[28px] font-[500]">
        <span class="text-[#515360]">{{t('myInquiries.order_no')}}</span>
        <span class="text-[#212121]">{{ inquiry.order_no }}</span>
      </div>
      <div class="flex justify-between mb-2 text-[28px] font-[500]">
        <span class="text-[#515360]">{{ t('order.quotaStatus') }}</span>
        <span class="font-medium">{{ inquiry.order_status_str }}</span>
      </div>
      <div class="flex justify-between mb-2 text-[28px] font-[500]">
        <span class="text-[#515360]">{{t('myInquiries.add_time')}}</span>
        <span class="text-[#212121]">{{ inquiry.add_time }}</span>
      </div>
      <div class="flex justify-between text-[28px] font-[500]">
        <span class="text-[#515360]">{{t('myInquiries.last_quotation_time')}}</span>
        <span class="text-[#212121]">{{ inquiry.last_quotation_time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import { useInquiryStore } from '@/store/inquiry'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { inquiry } = useInquiryStore()
</script>

<style scoped>
/* 可根据需要自定义样式 */
:deep(.van-swipe__indicator) {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.6);
}

:deep(.van-swipe__indicator--active) {
  background-color: #fff;
}
</style>
