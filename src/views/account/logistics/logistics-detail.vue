<template>
  <div class="mx-[1rem]  text-[28px] text-[#515360]" v-loading="isLoading">
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
            <p>{{ t('logistics.startTransportation') }}</p>
            <p class="text-[#212121]">{{ order.add_time }}</p>
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
</style>