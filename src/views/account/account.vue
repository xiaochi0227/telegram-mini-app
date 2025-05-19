<template>
  <div class="account mx-[1rem]">
    <div class=" bg-white  px-[20px]">
      <div class=" border-b border-[#f4f4f4] flex justify-between items-center h-[100px]">
        <nav-bar />
        <div class="flex items-center space-x-2">
          <van-icon name="cart-o" size="32" color="#212121" />
          <van-image round width="32px" height="32px" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          <div>
            mike
            <van-icon name="arrow-down" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mb-6 bg-white px-[20px] pb-[32px]">
      <div class="text-sm py-3 text-left">资金余额</div>
      <Financial />
      <div class="flex justify-center space-x-4">
        <button class="bg-[#FF356D] text-white px-6 py-2 rounded-[12px] w-[240px] h-[72px]">充值</button>
        <button
          class="border border-[#E7E7E9] bg-white text-[#212121] px-6 py-2 rounded-[12px] w-[240px] h-[72px]">资金明细</button>
      </div>
    </div>

    <!-- Orders Section -->
    <div class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]">
      <h2 class=" font-bold mb-2">进行中的采购订单</h2>
      <div class="grid grid-cols-2 gap-4">
        <template v-if="orderStatusCards.length">
          <div class="order-status" v-for="(item, index) in orderStatusCards" :key="index">
            <div class="flex items-center justify-between">
              <i :class="`iconfont ${item.icon}`"></i>
              <div class="num">{{ item.count }}</div>
            </div>
            <div class="pt-[16px]">{{ item.title }}</div>
          </div>
        </template>
      </div>
    </div>
    <!-- Logistics Section -->
    <div class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]">
      <h2 class="font-bold mb-2">物流订单</h2>
      <div class="grid grid-cols-3 gap-4" v-if="logisticsStatusCards.length">
        <div class="text-center logis-status" v-for="(item, index) in logisticsStatusCards" :key="index">
          <i :class="`iconfont ${item.icon}`"></i>
          <div class="num">{{ item.count }}</div>
          <div class="mt-[28px]">{{ item.title }}</div>
        </div>
      </div>
      <div class="font-bold mt-[40px]">待支付的物流费</div>
      <div class="text-center mt-[16px] text-[#004CE0] font-bold">$ 42456.56</div>
    </div>
    <!-- Logistics Status -->
    <div class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]" v-if="false">
      <h2 class="font-bold mb-2">物流动态</h2>
      <div class="space-y-4">
        <div>
          <div class="flex items-center">
            <span class="bg-[#FFF0F4] text-[#FF356D] px-[10px] py-[6px] rounded-[4px] text-[20px] mr-[10px]">NEW</span>
            <div class="text-gray-700">23904324</div>
          </div>
          <div class="text-gray-500 text-sm">发货 - 预计到达港口时间: 24.02.2017</div>
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
    <div class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px] contact">
      <h2 class="font-bold mb-2">联系我们</h2>
      <div class="flex justify-around items-center">
        <div class="text-center">
          <i class="iconfont icon-Phone"></i>
        </div>
        <div class="text-center">
          <i class="iconfont icon-Email"></i>
        </div>
        <div class="text-center">
          <i class="iconfont icon-Phone"></i>
        </div>
        <div class="text-center">
          <i class="iconfont icon-Email"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/nav-bar/index.vue';
import Financial from './components/Financial.vue';
import { accountApi } from '@/api'
import { useI18n } from 'vue-i18n';
const router = useRouter();
const { t } = useI18n()

const allTotalPrice = ref(0);
const orderStatusCards = ref([]);
const logisticsStatusCards = ref([]);

const ORDER_STATUS_MAP = [
  {
    key: 'inquiry_sheet_count',
    titleKey: 'accountCenter.inquiry',
    icon: 'icon-Enquiry',
    path:''
  },
  {
    key: 'confirmation_count',
    titleKey: 'accountCenter.pendingConfirmation',
    icon: 'icon-Confirm',
    path:''
  },
  {
    key: 'need_pay_count',
    titleKey: 'accountCenter.pendingPayment',
    icon: 'icon-Payment',
    path:''
  },
  {
    key: 'buy_order_count',
    titleKey: 'accountCenter.procurement',
    icon: 'icon-Purchase',
    path:''
  }
];

const LOGISTICS_STATUS_MAP = [
  {
    key: 'transit_count',
    titleKey: 'accountCenter.inTransit',
    icon: 'icon-Transport',
    path:'/account/logistics'
  },
  {
    key: 'allocation_count',
    titleKey: 'accountCenter.pendingAllocation',
    icon: 'icon-Sorting'
  },
  {
    key: 'signed_for_count',
    titleKey: 'accountCenter.signed',
    icon: 'icon-Time'
  }
];

const fetchAccountIndex = async () => {
  try {
    const { data } = await accountApi.getAccountIndex();

    // Update all total price
    allTotalPrice.value = data.all_total_price;

    // Update order status cards
    orderStatusCards.value = ORDER_STATUS_MAP.map(item => ({
      title: t(item.titleKey),
      count: data[item.key] || 0,
      icon: item.icon
    }));

    // Update logistics status cards
    logisticsStatusCards.value = LOGISTICS_STATUS_MAP.map(item => ({
      title: t(item.titleKey),
      count: data[item.key] || 0,
      icon: item.icon
    }));
    console.log('logisticsStatusCards', orderStatusCards.value, logisticsStatusCards.value);
  } catch (error) {
    console.error('Failed to fetch account index:', error);
    // You might want to handle errors here, e.g., show a notification
  }
};
onMounted(() => {
  fetchAccountIndex();
});
</script>

<style scoped lang="scss">
.account {
  font-size: 28px;
  color: #515360;
}

.order-status {
  border: 1px solid #E7E7E9;
  border-radius: 24px;
  padding: 32px;
  height: 200px;
  box-sizing: border-box;

  .iconfont {
    font-size: 32px;
    color: #FF356D;
  }

  .num {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #EF2424;
    text-align: center;
    line-height: 42px;
    color: #fff;
    font-size: 24px;
  }
}

.logis-status {
  border: 1px solid #E7E7E9;
  border-radius: 20px;
  padding: 40px 0 64px;

  .iconfont {
    font-size: 32px;
    color: #FF356D;
  }
}

.contact {
  .iconfont {
    font-size: 48px;
    color: #FF356D;
  }
}
</style>