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
        <h2 class="font-bold mb-4 text-[#212121]">支付信息</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>已支付金额</p>
            <p class="text-[#212121]">PO197001017460</p>
          </div>
          <div class="flex justify-between">
            <p>已支付金额</p>
            <p class="text-[#212121]">中国义乌/中国广州</p>
          </div>
          <div>
            <div class="w-full text-center bg-[#FF356D] h-[90px] leading-[90px] rounded-[24px] text-[#fff] my-[36px]">付尾款</div>
          </div>
        
          <div class="flex justify-between">
            <p>付款时间</p>
            <p class="text-[#212121]">萨达沃市场</p>
          </div>
          <div class="flex justify-between">
            <p>交易ID</p>
            <p class="text-[#212121]">USD $ 42456.56</p>
          </div>
          <div class="flex justify-between">
            <p>支付金额</p>
            <p class="text-[#212121]">国内付款</p>
          </div>
          <div class="flex justify-between">
            <p>付款方式</p>
            <p class="text-[#212121]">24.02.2017, 07:10</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[24px] shadow p-4">
        <h2 class="font-bold mb-4 text-[#212121] flex justify-between items-center">
          <p>总计</p>
          <p class="text-[#004CE0]">CNY ￥325000.00</p>
        </h2>
        <div class="h-[2px] bg-[#f4f4f4] my-[32px]"></div>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>商品费用</p>
            <p class="text-[#212121]">PO197001017460</p>
          </div>
          <div class="flex justify-between">
            <p>服务费</p>
            <p class="text-[#212121]">中国义乌/中国广州</p>
          </div>
    
          <div class="flex justify-between">
            <p>内陆运费</p>
            <p class="text-[#212121]">萨达沃市场</p>
          </div>
          <div>
            <div class="h-[2px] bg-[#f4f4f4] my-[32px]"></div>
          </div>
          <div class="flex justify-between text-[24px]">
            <p>卢布兑人民币</p>
            <p class="text-[#212121]">USD $ 42456.56</p>
          </div>
          <div class="flex justify-between text-[24px]">
            <p>卢布兑美元</p>
            <p class="text-[#212121]">国内付款</p>
          </div>
          <div class="flex justify-between text-[24px]">
            <p>卢布兑美元</p>
            <p class="text-[#212121]">24.02.2017, 07:10</p>
          </div>
        </div>
      </div>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]'>
      <div>采购信息：2/5</div>
      <i class="iconfont icon-Right"></i>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]'>
      <div>地址信息</div>
      <i class="iconfont icon-Right"></i>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]'>
      <div>采购商品</div>
      <i class="iconfont icon-Right"></i>
    </div>
    <div class="p-[20px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121] min-h-[200px] leading-[28px]">
      1111111111111
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