<template>
  <div class="mx-[1rem]">
    <div class=" bg-white px-[20px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="bg-white rounded-2xl shadow p-4 mt-[24px]">
      <div class="flex justify-between items-center">
        <p class="text-lg font-bold">土豆</p>
        <p class="text-[#FF356D] text-sm">采购中</p>
      </div>
      <p class="text-sm text-gray-500 mt-2">更新时间: 15.02.2014</p>
    </div>

    <div class="bg-white rounded-2xl shadow p-4 mt-[24px]">
      <div class="flex justify-between items-center">
        <p class="text-lg font-bold">土豆</p>
        <p class="text-[#FF356D] text-sm">采购完成已入库</p>
      </div>
      <p class="text-sm text-gray-500 mt-2">更新时间: 15.02.2014</p>
      <div class="mt-4 bg-gray-100 rounded-lg px-[24px] flex items-center">
        <i class="iconfont icon-file text-gray-500 mr-2"></i>
        <p class="text-sm text-gray-500 flex-1">查看入库凭证</p>
        <i class="iconfont icon-Right text-gray-500"></i>
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

<style scoped >
.icon-Right {
  font-size: 64px;
  color: #515360;
}
</style>