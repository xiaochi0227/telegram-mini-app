<template>
  <div class="fund-manage mx-[1rem]">
    <div class=" bg-white px-[20px]">
      <div class=" border-b border-[#f4f4f4] flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="text-center mb-6 bg-white px-[20px] pb-[40px] rounded-b-[24px]">
      <div class=" font-bold py-3 text-left">资金余额</div>
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
      <div class="text-blue-500 text-4xl font-bold py-[2rem]" v-if='false'>456246.00 <span class="text-xl">¥</span></div>
      <div class="py-[2rem]" v-else>
        <div class='flex justify-between items-center'>
          <div>可用授信</div>
          <div class="font-bold text-[#004CE0] text-[40px]">456246.00<span class="text-[#004CE0] pl-[10px] text-[24px]">¥</span></div>
        </div>
        <div class='flex justify-between items-center pt-[48px]'>
          <div>已用授信</div>
          <div class="font-bold text-[#004CE0] text-[40px]">456246.00<span class="text-[#004CE0] pl-[10px] text-[24px]">¥</span></div>
        </div>
      </div>
      <div class="flex justify-center space-x-4">
        <button class="bg-[#FF356D] text-white px-6 py-2 rounded-[12px] w-[240px] h-[72px]">充值</button>
        <button
          class="border border-[#E7E7E9] bg-white text-[#212121] px-6 py-2 rounded-[12px] w-[240px] h-[72px]">资金明细</button>
      </div>
    </div>
    
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[20px] mt-[24px] px-[20px]'>
      <div>消费记录</div>
      <i class="iconfont icon-Right"></i>
    </div>

    <div class='flex justify-between items-center h-[80px] bg-white rounded-[20px] mt-[24px] px-[20px]'>
      <div>充值记录</div>
      <i class="iconfont icon-Right"></i>
    </div>

  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue';
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
.fund-manage {
  font-size: 28px;
  color: #515360;
  .icon-Right{
    font-size: 36px;
    color: #515360;
  }
}

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