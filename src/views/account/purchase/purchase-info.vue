<template>
  <div class="mx-[1rem]">
    <div class=" bg-white px-[20px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow p-4 mt-[24px]" v-for="(item, index) in order.buy_order" :key="index">
      <div class="flex justify-between items-center">
        <p class="text-lg font-bold">{{ item.product_name }}</p>
        <p class="text-[#FF356D] text-sm">{{ item.status_str }}</p>
      </div>
      <p class="text-sm text-gray-500 mt-2">
        {{ t('orderDetail.updateTime') }}:
        <template v-if="item.is_exception">
          {{ item.exception_time }}
        </template>
        <template v-if="item.is_normal">
          {{ item.normal_time }}
        </template>
        <template v-if="item.status !== -1">
          {{
            item.status === 4
              ? item.inspection_time
              : item.status === -2
                ? item.cancel_time
                : item.last_update_time
          }}
        </template>
      </p>
      <p class="text-[24px] text-[##ED2323] mt-2" v-if="item.is_exception">
        {{ item.exception_str }} {{ item.exception_memo }}
      </p>
      <div class="mt-4 bg-gray-100 rounded-lg px-[24px] flex items-center" v-if="item.is_exception"
        @click="handleImagePreview(item.exception_images)">
        <i class="iconfont icon-Picture text-gray-500 mr-[8px]"></i>
        <p class="text-sm text-gray-500 flex-1" v-if="item.is_exception">{{ t('orderDetail.exceptionVoucher') }}</p>
        <i class="iconfont icon-Right text-gray-500"></i>
      </div>
      <div class="mt-4 bg-gray-100 rounded-lg px-[24px] flex items-center" v-if="item.status === 4"
        @click="handleImagePreview(item.receipt_images)">
        <i class="iconfont icon-Voucher text-gray-500 mr-[8px]"></i>
        <p class="text-sm text-gray-500 flex-1" v-if="item.status === 4">{{ t('orderDetail.storeVoucher') }}</p>
        <i class="iconfont icon-Right text-gray-500"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/index.vue';
import { orderApi } from '@/api';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
import { ImagePreview } from 'vant';


const router = useRouter();
const route = useRoute();
const { t } = useI18n()

const id = route.query.id
const order = ref({});

const handleImagePreview = (imageList) => {
  ImagePreview({
    images: imageList, // 图片数组，支持多张
    startPosition: 0,   // 初始位置（第几张）
  });
};

const getOrderDetail = async () => {
  const res = (await orderApi.getPaidOrderDetail(id))
  order.value = res.data || {};
};
getOrderDetail()

</script>

<style scoped>
.icon-Voucher,
.icon-Picture {
  font-size: 36px;
}

.icon-Right {
  font-size: 64px;
  color: #515360;
}
</style>