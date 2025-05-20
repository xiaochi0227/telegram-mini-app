<template>
  <div class="mx-[1rem]  text-[28px] text-[#515360]" v-loading="isLoading">
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
            <p class="text-sm text-gray-500">{{ t('logistics.trackingNo') }}:</p>
            <p class="text-lg font-bold text-[#212121]">{{ order.tracking_no }}</p>
          </div>
          <div class="text-right">
            <span class="bg-orange-100 text-orange-500 text-sm px-2 py-1 rounded">{{ order.tracking_status_str }}</span>
          </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <p>{{ t('order.orderTime') }}:</p>
          <p class="text-[#212121]">{{ order.add_time }}</p>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="bg-white rounded-[24px] shadow p-4">
        <h2 class="text-lg font-bold mb-4 text-[#212121]">{{ t('logistics.orderInfo') }}</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>{{ t('logistics.trackingNo') }}</p>
            <p class="text-[#212121]">{{ order.tracking_no }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('logistics.shipment') }}</p>
            <p class="text-[#212121]">{{ order.shipment_place }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('logistics.destination') }}</p>
            <p class="text-[#212121]">{{ order.destination }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('logistics.trackingPrice') }}</p>
            <p class="text-[#004CE0] font-bold">USD $ {{ order.total_price }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('orderDetail.payType') }}</p>
            <p class="text-[#212121]">{{ order.pay_type_str }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('orderDetail.addTime') }}</p>
            <p class="text-[#212121]">{{ order.pay_time }}</p>
          </div>
        </div>
        <div class="h-[2px] bg-[#f4f4f4] my-[32px]"></div>
        <!-- 开始运输 -->
        <div class="bg-[#f4f4f4] rounded-[20px] h-[88px] p-4 flex justify-between items-center"
          @click="() => router.push({ path: '/account/logistics/detail', query: { id } })">
          <p class="text-sm text-gray-500">{{ t('logistics.startTransportation') }}</p>
          <p class="text-[#212121]">{{ order.add_time }}</p>
        </div>
      </div>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px]'
      @click="() => router.push({ path: '/account/logistics/goods', query: { id } })">
      <div>{{ t('logistics.orderGoods') }}</div>
      <i class="iconfont icon-Right"></i>
    </div>

    <div @click="getBillImage"
      class="fixed flex  bottom-0 inset-x-[32px] justify-between items-center bg-white rounded-t-[24px] mt-[24px]  shadow-[0_-2px_5px_0_#DBDBDB] h-[164px] px-[20px]">
      <div
        class="border border-[#FF356D] flex items-center justify-center text-[#FF356D] w-full h-[80px] rounded-[24px]">
        <span>{{ t('logistics.viewInvoice') }}</span>
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
import { ImagePreview } from 'vant';
const router = useRouter();
const route = useRoute();
const { t } = useI18n()

const id = route.params.id
const isLoading = ref(true);
interface Order {
  tracking_no: string;
  tracking_status_str: string;
  add_time: string;
  shipment_place: string;
  destination: string;
  total_price: number;
  pay_type_str: string;
  pay_time: string;
}

const order = ref<Order>({
  tracking_no: '',
  tracking_status_str: '',
  add_time: '',
  shipment_place: '',
  destination: '',
  total_price: 0,
  pay_type_str: '',
  pay_time: '',
});
const bill_image = ref('');
const getOrderDetail = async () => {
  const res = (await logisticsApi.getLogisticsDetail({ id })) as { data: Order };
  order.value = res.data || {};
  isLoading.value = false;
};

const getBillImage = async () => {
  if (bill_image.value) {
    ImagePreview({
      images: [bill_image.value], // 图片数组，支持多张
      startPosition: 0,   // 初始位置（第几张）
    });
    return
  }
  const res = await logisticsApi.getBillImage({ id })
  bill_image.value = res.data || {};
  ImagePreview({
    images: [bill_image.value], // 图片数组，支持多张
    startPosition: 0,   // 初始位置（第几张）
  });
};
getOrderDetail()


</script>

<style scoped lang="scss">
.icon-Right {
  font-size: 64px;
  color: #515360;
}
</style>