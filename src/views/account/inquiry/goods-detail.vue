<template>
  <div class="flex flex-col px-[32px] min-h-screen">
    <div class="nav-header px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]">
      <nav-bar />
    </div>

    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-4">
      <!-- 图片轮播 -->
      <van-swipe
        class="rounded-lg overflow-hidden mb-4"
        :autoplay="3000"
        indicator-color="white"
        :show-indicators="true"
      >
        <van-swipe-item v-for="(img, idx) in good.images" :key="idx">
          <img :src="img" class="w-full h-48 object-contain" />
        </van-swipe-item>
      </van-swipe>
      <!-- 商品信息 -->
      <div class="text-[#212121] text-[28px]">
        <span class="font-bold">{{ t('inquiriesDetails.goods') }}：</span>
        <span>
          {{ good.product_name }}
        </span>
      </div>
      <div class="text-[#212121] text-[28px] mt-[16px]">
        <span class="font-bold">{{ t('inquiriesDetails.quantity') }}：</span>
        <span> {{ good.product_num }} </span>
      </div>
      <div class="text-[#212121] text-[28px] mt-[16px]">
        <span class="font-bold">{{ t('reference.link') }}：</span>
        <a :href="link" class="text-blue-500 underline" target="_blank">
          {{ good.reference_url }}
        </a>
      </div>
      <div class="text-[#212121] text-[28px] font-bold mt-[16px]">
        {{ t('order.goodsDesc') }}：
      </div>
      <div class="text-[#212121] text-[28px] whitespace-pre-line">
        {{ good.desc }}
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
const { good } = useInquiryStore()
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
