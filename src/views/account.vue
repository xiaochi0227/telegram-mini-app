<template>
  <div class="account mx-[1rem]">
    <div class="text-center mb-6 bg-white px-[20px] pb-[32px]">
      <div class="text-sm py-3 text-left">资金余额</div>
      <div class="flex justify-center items-center bg-[#F4F4F4] rounded-full  h-[64px]">
        <div class="px-4 flex-1 text-[#515360] active account-tab">
          <span>USD</span>
        </div>
        <div class="px-4 flex-1 text-[#515360] account-tab">
          <span>CNY</span>
        </div>
        <div class="px-4 flex-1 text-[#515360] account-tab">
          <span>已用授信</span>
        </div>
      </div>
      <div class="text-blue-500 text-4xl font-bold py-[2rem]">456246.00 <span class="text-xl">¥</span></div>
      <div class="flex justify-center space-x-4">
        <button class="bg-[#FF356D] text-white px-6 py-2 rounded-[12px] w-[240px]">充值</button>
        <button class="border border-[#E7E7E9] bg-white text-[#212121] px-6 py-2 rounded-[12px] w-[240px]">资金明细</button>
      </div>
    </div>

    <!-- Orders Section -->
    <div class="mb-6">
      <h2 class="text-gray-700 font-bold mb-2">进行中的采购订单</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-pink-100 text-pink-500 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold">3</div>
          <div>询价中</div>
        </div>
        <div class="bg-pink-100 text-pink-500 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold">3</div>
          <div>待确认</div>
        </div>
        <div class="bg-pink-100 text-pink-500 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold">3</div>
          <div>待支付</div>
        </div>
        <div class="bg-pink-100 text-pink-500 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold">3</div>
          <div>采购中</div>
        </div>
      </div>
    </div>
    <!-- Logistics Section -->
    <div class="mb-6">
      <h2 class="text-gray-700 font-bold mb-2">物流订单</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-pink-500 text-2xl">已签收</div>
        </div>
        <div class="text-center">
          <div class="text-pink-500 text-2xl">运输中</div>
        </div>
        <div class="text-center">
          <div class="text-pink-500 text-2xl">待分货</div>
        </div>
      </div>
      <div class="text-center mt-4 text-blue-500 text-xl font-bold">$ 42456.56</div>
    </div>
    <!-- Logistics Status -->
    <div class="mb-6">
      <h2 class="text-gray-700 font-bold mb-2">物流动态</h2>
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <span class="bg-pink-500 text-white px-2 py-1 rounded-full text-sm">NEW</span>
          <div>
            <div class="text-gray-700">23904324</div>
            <div class="text-gray-500 text-sm">发货 - 预计到达港口时间: 24.02.2017</div>
          </div>
        </div>
        <div>
          <div class="text-gray-700">23904324</div>
          <div class="text-gray-500 text-sm">到达港口 - 预计到达港口时间: 24.02.2017</div>
        </div>
        <div>
          <div class="text-gray-700">23904324</div>
          <div class="text-gray-500 text-sm">发货 - 预计到达港口时间: 24.02.2017</div>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="flex justify-around items-center">
      <button class="text-blue-500">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z">
          </path>
          <path d="M11 16h2v2h-2zm0-10h2v8h-2z"></path>
        </svg>
      </button>
      <button class="text-green-500">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 003.69.6 1 1 0 011 1v3.11a1 1 0 01-1 1A19.91 19.91 0 012 4a1 1 0 011-1h3.11a1 1 0 011 1 11.72 11.72 0 00.6 3.69 1 1 0 01-.27 1.11z">
          </path>
        </svg>
      </button>
      <button class="text-pink-500">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 8V7l-3 2-2-1-2 1-2-1-2 1-2-1-2 1-2-1-3 2v1l3-2 2 1 2-1 2 1 2-1 2 1 2-1 3 2z"></path>
          <path d="M21 10l-3 2-2-1-2 1-2-1-2 1-2-1-2 1-3-2v6l3 2 2-1 2 1 2-1 2 1 2-1 2 1 3-2z"></path>
        </svg>
      </button>
      <button class="text-red-500">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 8V7l-3 2-2-1-2 1-2-1-2 1-2-1-2 1-2-1-3 2v1l3-2 2 1 2-1 2 1 2-1 2 1 2-1 3 2z"></path>
          <path d="M21 10l-3 2-2-1-2 1-2-1-2 1-2-1-2 1-3-2v6l3 2 2-1 2 1 2-1 2 1 2-1 2 1 3-2z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push('/');
};
</script>

<style scoped lang="scss">
.account-tab {
  position: relative;
  height: 100%;
  line-height: 64px;
  &.active {
    color: #212121;
    &:after {
      position: absolute;
      content: '';
      left: 2px;
      right: 0;
      height: 60px;
      top: 2px;
      background-color: #fff;
      border-radius: 30px;
      z-index: 1;
    }
  }
  span {
    position: relative;
    z-index: 2;
  }

}
</style>