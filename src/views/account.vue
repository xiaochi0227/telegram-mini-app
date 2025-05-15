<template>
  <div class="account mx-[1rem]">
    <div class="bg-white px-[20px]">
      <div
        class="border-b border-[#f4f4f4] flex justify-between items-center h-[100px]"
      >
        <nav-bar />
        <div class="flex items-center space-x-2">
          <van-badge :content="totalItems">
            <van-icon name="cart-o" size="28" color="#212121" />
          </van-badge>

          <van-image
            round
            width="32px"
            height="32px"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <div>
            mike
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mb-6 bg-white px-[20px] pb-[32px]">
      <div class="text-sm py-3 text-left">资金余额</div>
      <div
        class="flex justify-center items-center bg-[#F4F4F4] rounded-full h-[64px]"
      >
        <div class="px-4 flex-1 text-[#515360] active account-tab">
          <span>USD</span>
        </div>
        <div class="px-4 flex-1 text-[#afafb1] account-tab">
          <span>CNY</span>
        </div>
        <div class="px-4 flex-1 text-[#515360] account-tab">
          <span>已用授信</span>
        </div>
      </div>
      <div class="text-blue-500 text-4xl font-bold py-[2rem]">
        456246.00 <span class="text-xl">¥</span>
      </div>
      <div class="flex justify-center space-x-4">
        <button
          class="bg-[#FF356D] text-white px-6 py-2 rounded-[12px] w-[240px] h-[72px]"
        >
          充值
        </button>
        <button
          class="border border-[#E7E7E9] bg-white text-[#212121] px-6 py-2 rounded-[12px] w-[240px] h-[72px]"
        >
          资金明细
        </button>
      </div>
    </div>

    <!-- Orders Section -->
    <div class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]">
      <h2 class="font-bold mb-2">进行中的采购订单</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="order-status">
          <div class="flex items-center justify-between">
            <i class="iconfont icon-Enquiry"></i>
            <div class="num">3</div>
          </div>
          <div class="pt-[16px]">询价中</div>
        </div>
        <div class="order-status">
          <div class="flex items-center justify-between">
            <i class="iconfont icon-Confirm"></i>
            <div class="num">3</div>
          </div>
          <div class="pt-[16px]">待确认</div>
        </div>
        <div class="order-status">
          <div class="flex items-center justify-between">
            <i class="iconfont icon-Payment"></i>
            <div class="num">3</div>
          </div>
          <div class="pt-[16px]">待支付</div>
        </div>
        <div class="order-status">
          <div class="flex items-center justify-between">
            <i class="iconfont icon-Purchase"></i>
            <div class="num">3</div>
          </div>
          <div class="pt-[16px]">采购中</div>
        </div>
      </div>
    </div>
    <!-- Logistics Section -->
    <div class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]">
      <h2 class="font-bold mb-2">物流订单</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center logis-status">
          <i class="iconfont icon-Time"></i>
          <div class="mt-[28px]">已签收</div>
        </div>
        <div class="text-center logis-status">
          <i class="iconfont icon-Transport"></i>
          <div class="mt-[28px]">运输中</div>
        </div>
        <div class="text-center logis-status">
          <i class="iconfont icon-Sorting"></i>
          <div class="mt-[28px]">待分货</div>
        </div>
      </div>
      <div class="font-bold mt-[40px]">待支付的物流费</div>
      <div class="text-center mt-[16px] text-[#004CE0] font-bold">
        $ 42456.56
      </div>
    </div>
    <!-- Logistics Status -->
    <div class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]">
      <h2 class="font-bold mb-2">物流动态</h2>
      <div class="space-y-4">
        <div>
          <div class="flex items-center">
            <span
              class="bg-[#FFF0F4] text-[#FF356D] px-[10px] py-[6px] rounded-[4px] text-[20px] mr-[10px]"
              >NEW</span
            >
            <div class="text-gray-700">23904324</div>
          </div>
          <div class="text-gray-500 text-sm">
            发货 - 预计到达港口时间: 24.02.2017
          </div>
        </div>
        <div>
          <div class="text-gray-700">23904324</div>
          <div class="text-gray-500 text-sm">
            到达港口 - 预计到达港口时间: 24.02.2017
          </div>
        </div>
        <div>
          <div class="text-gray-700">23904324</div>
          <div class="text-gray-500 text-sm">
            发货 - 预计到达港口时间: 24.02.2017
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div
      class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px] contact"
    >
      <h2 class="font-bold mb-2">联系我们</h2>
      <div class="flex justify-around items-center">
        <div class="text-center">
          <i class="iconfont icon-telegram text-[#28A7E7]"></i>
        </div>
        <div class="text-center">
          <i class="iconfont icon-whatsup text-[#33CC33]"></i>
        </div>
        <div class="text-center">
          <i class="iconfont icon-Phone text-[#FF356D]"></i>
        </div>
        <div class="text-center">
          <i class="iconfont icon-Email text-[#FF356D]"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/nav-bar/index.vue'
import { useCart } from '@/hooks/cart'
import { useCartStore } from '@/store/cart'

const router = useRouter()
const { initItems } = useCart()
// const { totalItems, items } = useCartStore()
const cartStore = useCartStore()
const totalItems = computed(() => cartStore.totalItems)

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}

// 请求购物车数据
onMounted(() => {
  initItems(true, false)
})
</script>

<style scoped lang="scss">
.account {
  font-size: 28px;
  color: #515360;
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

.order-status {
  border: 1px solid #e7e7e9;
  border-radius: 24px;
  padding: 32px;
  height: 200px;
  box-sizing: border-box;

  .iconfont {
    font-size: 32px;
    color: #ff356d;
  }

  .num {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #ef2424;
    text-align: center;
    line-height: 42px;
    color: #fff;
    font-size: 24px;
  }
}

.logis-status {
  border: 1px solid #e7e7e9;
  border-radius: 20px;
  padding: 40px 0 64px;

  .iconfont {
    font-size: 32px;
    color: #ff356d;
  }
}

.contact > div > div {
  &:nth-child(1),
  &:nth-child(2) {
    .iconfont {
      font-size: 64px;
    }
  }

  &:nth-child(3),
  &:nth-child(4) {
    .iconfont {
      font-size: 54px;
    }
  }
}
</style>
