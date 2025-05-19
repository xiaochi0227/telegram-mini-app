<template>
  <div class="mx-[1rem]  text-[28px] text-[#515360]">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="space-y-4 text-[28px]">
      <!-- 发货单信息 -->
      <div class="bg-white rounded-[24px] shadow p-4">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-500">发货单号:</p>
            <p class="text-lg font-bold text-[#212121]">PO197001017460</p>
          </div>
          <div class="text-right">
            <span class="bg-orange-100 text-orange-500 text-sm px-2 py-1 rounded">运输中</span>
          </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <p>下单时间:</p>
          <p class="text-[#212121]">24.02.2017, 07:10</p>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="bg-white rounded-[24px] shadow p-4">
        <h2 class="text-lg font-bold mb-4 text-[#212121]">Tовары для отправки</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>发货单号</p>
            <p class="text-[#212121]">PO197001017460</p>
          </div>
          <div class="flex justify-between">
            <p>发货地</p>
            <p class="text-[#212121]">中国义乌/中国广州</p>
          </div>
          <div class="flex justify-between">
            <p>目的地</p>
            <p class="text-[#212121]">萨达沃市场</p>
          </div>
          <div class="flex justify-between">
            <p>运输费用</p>
            <p class="text-[#004CE0] font-bold">USD $ 42456.56</p>
          </div>
          <div class="flex justify-between">
            <p>付款方式</p>
            <p class="text-[#212121]">国内付款</p>
          </div>
          <div class="flex justify-between">
            <p>付款时间</p>
            <p class="text-[#212121]">24.02.2017, 07:10</p>
          </div>
        </div>
        <div class="h-[2px] bg-[#f4f4f4] my-[32px]"></div>
        <!-- 开始运输 -->
        <div class="bg-[#f4f4f4] rounded-[20px] h-[88px] p-4 flex justify-between items-center">
          <p class="text-sm text-gray-500">开始运输</p>
          <p class="text-[#212121]">24.02.2017, 07:10</p>
        </div>
      </div>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px]'>
      <div>运输商品</div>
      <i class="iconfont icon-Right"></i>
    </div>

    <div class="fixed flex  bottom-0 inset-x-[32px] justify-between items-center bg-white rounded-t-[24px] mt-[24px]  shadow-[0_-2px_5px_0_#DBDBDB] h-[164px] px-[20px]">
      <div class="border border-[#FF356D] flex items-center justify-center text-[#FF356D] w-full h-[80px] rounded-[24px]">
        <span>查看发货单</span>
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
.icon-Right {
  font-size: 64px;
  color: #515360;
}
</style>