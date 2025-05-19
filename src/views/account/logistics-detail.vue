<template>
  <div class="mx-[1rem]  text-[28px] text-[#515360]">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="space-y-4 text-[28px]">
      <!-- 商品信息 -->
      <div class="bg-white rounded-[24px] shadow p-4">
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>开始运输</p>
            <p class="text-[#212121]">24.02.2017,07:10</p>
          </div>
          <div class="flex justify-between">
            <p>到达时间</p>
            <p class="text-[#212121]">24.02.2017,07:10</p>
          </div>
          <div class="flex justify-between">
            <p>分货时间</p>
            <p class="text-[#212121]">24.02.2017,07:10</p>
          </div>
          <div class="flex justify-between">
            <p>分货地址</p>
            <p class="text-[#212121]">萨沃达市场</p>
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

<style scoped lang="scss">
</style>