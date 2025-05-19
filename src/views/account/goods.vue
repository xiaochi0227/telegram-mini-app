<template>
  <div class="mx-[1rem]  text-[28px]">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="space-y-4 bg-white shadow-[0_1px_3px_0_rgba(184,184,184,0.25)] rounded-[24px] py-[32px] px-[20px]">
      <!-- 商品卡片 -->
      <div class="rounded-[16px] p-[20px] flex items-center text-[#212121] border border-[#E7E7E9]">
        <!-- 图片占位 -->
        <div class="w-16 h-16 bg-gray-200 rounded-md"></div>
        <!-- 商品信息 -->
        <div class="ml-4 flex-1">
          <p class="font-bold mb-2">面包</p>
          <div class="text-[24px] space-y-1">
            <div class="flex justify-between">
              <p>数量</p>
              <p>100</p>
            </div>
            <div class="flex justify-between">
              <p>装箱数量</p>
              <p >100</p>
            </div>
            <div class="flex justify-between">
              <p>总箱数</p>
              <p >100</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/index.vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


</script>

<style scoped lang="scss"></style>