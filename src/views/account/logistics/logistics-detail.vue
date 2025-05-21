<template>
  <div class="flex flex-col h-full  text-[28px] text-[#515360]" v-loading="isLoading">
    <van-sticky>
      <div class="mx-32px] bg-white px-[20px] mb-[24px]">
        <div class="flex justify-between items-center h-[100px]">
          <nav-bar />
        </div>
      </div>
    </van-sticky>
    <div class="flex-1 overflow-y-auto px-[32px] space-y-4">
      <!-- 商品信息 -->
      <div class="bg-white rounded-[24px] shadow p-4">
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>{{ t('logistics.startTransportation') }}</p>
            <p class="text-[#212121]">{{ order.add_time }}</p>
          </div>
          <div v-if="order.transport_log && order.transport_log.length">
            <van-steps direction="vertical" active="9999" active-color="#FF356D">
              <van-step v-for="(item, index) in order.transport_log" :key="index">
                <p class="leading-none text-[rgba(0,0,0,0.45)] text-[24px]">{{ item.node_time }}</p>
                <h3 class="leading-[48px] text-[#000]">{{ item.desc }}</h3>

              </van-step>
            </van-steps>
          </div>
          <div class="flex justify-between">
            <p>{{ t('logistics.arriveTime') }}</p>
            <p class="text-[#212121]">{{ order.actual_time }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('logistics.allocationTime') }}</p>
            <p class="text-[#212121]">{{ order.allocation_time }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('logistics.shippingAddress') }}</p>
            <p class="text-[#212121]">{{ order.allocation_address_str }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/index.vue';
import { logisticsApi } from '@/api';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
;
const router = useRouter();
const route = useRoute();
const { t } = useI18n()

const id = route.query.id
const isLoading = ref(true);
interface Order {
  add_time: string;
  actual_time: string;
  allocation_time: string;
  allocation_address_str: string;
  transport_log?: Array<{ node_time: string; desc: string }>;
}

const order = ref<Order>({
  add_time: '',
  actual_time: '',
  allocation_time: '',
  allocation_address_str: '',
});

const getOrderDetail = async () => {
  const res = (await logisticsApi.getLogisticsDetail({ id })) as { data: Order };
  order.value = res.data || {};
  isLoading.value = false;
};
getOrderDetail()


</script>

<style scoped lang="scss">
:deep(.van-steps) {
  padding-left: 48px;

  .van-step--vertical {
    line-height: 58px;
  }

  .van-step__circle-container {
    left: -22px;
    top: 22px;
  }

  .van-step__line {
    left: -22px;
  }

  .van-step__circle {
    width: 14px;
    height: 14px;
  }
}
</style>