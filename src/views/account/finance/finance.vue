<template>
  <div class="fund-manage mx-[1rem]">
    <div class=" bg-white px-[20px]">
      <div class=" border-b border-[#f4f4f4] flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="text-center mb-6 bg-white px-[20px] pb-[40px] rounded-b-[24px]">
      <div class=" font-bold py-3 text-left">资金余额</div>
      <Financial />
      <div class="flex justify-center space-x-4">
        <button class="bg-[#FF356D] text-white px-6 py-2 rounded-[12px] w-[260px] h-[72px] text-[24px]"
          @click="() => router.push('/recharge')"
        >
          充值
        </button>
        <button class="border border-[#E7E7E9] bg-white text-[#212121] px-6 py-2 rounded-[12px] w-[260px] h-[72px] text-[24px]"
          @click="() => router.push('/account/finance/pay-password')"
        >
          修改支付密码
        </button>
      </div>
    </div>

    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px]'
      @click="(() => router.push('/account/finance/operation-records?active=0'))">
      <div>消费记录</div>
      <i class="iconfont icon-Right"></i>
    </div>

    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px]'
      @click="(() => router.push('/account/finance/operation-records?active=1'))">
      <div>充值记录</div>
      <i class="iconfont icon-Right"></i>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from '@/components/nav-bar/index.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { balanceApi } from '@/api'
import Financial from './components/Financial.vue';

const router = useRouter();
const { t } = useI18n()

onMounted(() => {

})
</script>

<style scoped lang="scss">
.fund-manage {
  font-size: 28px;
  color: #515360;

  .icon-Right {
    font-size: 64px;
    color: #515360;
  }
}
</style>