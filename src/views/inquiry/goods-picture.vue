<template>
  <div class="flex flex-col h-full">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>

    <!-- 图片列表 -->
    <div class="flex-1 overflow-y-auto px-[32px]">
      <div class="rounded-xl bg-white p-3">
        <div
          v-for="(img, idx) in goodsPicture"
          :key="idx"
          class="relative mb-3 last:mb-0 rounded-lg h-[400px] flex items-center justify-center"
        >
          <img :src="img.url" class="object-cover w-full h-full rounded-lg" />
         
          <van-icon
            name="cross"
            color="#666666"
            class="!absolute right-[20px] top-[20px]"
            @click="remove(idx)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/nav-bar/index.vue'
import { computed, ref } from 'vue'
import { Toast } from 'vant'
import { useInquiryStore } from '@/store/inquiry'

const { goodsPicture, removeGoodsPicture } = useInquiryStore()

function remove(idx) {
  removeGoodsPicture(idx)
  Toast('已删除')
}
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
