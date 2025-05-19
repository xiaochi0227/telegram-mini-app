<template>
  <div class="mx-[1rem]">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="space-y-4 text-[28px] text-[#515360]">
      <!-- 地址信息 -->
      <div class="bg-white rounded-2xl shadow p-4">
        <p class="text-lg font-bold mb-2">Россия Область/Провинция Москва莫斯科郊外的小路上</p>
        <p class="text-sm text-gray-500 mb-1">+7 12345678910</p>
        <p class="text-sm text-gray-500 mb-4">1263684756161263@163.com</p>
        <!-- 包装与配送要求 -->
        <p class="text-lg font-bold mb-2">包装与配送要求</p>
        <p class="text-sm text-gray-500 leading-relaxed">
          XXXXXXXXXXXXXXXXXXXXX
        </p>
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

<style scoped></style>