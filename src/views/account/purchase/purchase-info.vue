<template>
  <div class="flex flex-col h-full" v-loading="isLoading">
    <van-sticky>
      <div class="mx-[1rem] bg-white px-[20px] mb-[24px]">
        <div class="flex justify-between items-center h-[100px]">
          <nav-bar />
        </div>
      </div>
    </van-sticky>
    <div class="flex-1 overflow-y-auto px-[1rem] space-y-4">
      <div class="bg-white rounded-2xl shadow p-4" v-for="(item, index) in order.buy_order" :key="index">
        <div class="flex justify-between items-center mb-[10px]">
          <p class="font-bold">{{ item.product_name }}</p>
          <!-- <p :class="`text-[${item.is_exception ? '#ED2323' : '#FF356D'}] text-[24px]`">{{ item.status_str }}</p> -->
        </div>
        <div class="space-y-[24px]">
          <template v-if="item.is_exception">
            <div class=" text-[24px] space-y-[4px]">
              <div class="flex items-center justify-between">
                <p>{{ t('orderDetail.updateTime') }}：{{ item.exception_time }}</p>
                <p class="text-[#ED2323]">{{ item.is_exception ? t('orderDetail.isException') : '' }}</p>
              </div>
              <p class="text-[#ED2323]">
                <span>
                  [{{ item.exception_str }}][{{ item.exception_memo }}]
                </span>
              </p>
              <div v-if="item.exception_images && item.exception_images.length">
                <div class="mt-[20px] bg-gray-100 rounded-lg px-[24px] flex items-center"
                  @click="handleImagePreview(item.exception_images || [])">
                  <i class="iconfont icon-Picture text-gray-500 mr-[8px]"></i>
                  <p class="text-sm text-gray-500 flex-1" v-if="item.is_exception">{{ t('orderDetail.exceptionVoucher')
                    }}
                  </p>
                  <i class="iconfont icon-Right text-gray-500"></i>
                </div>
              </div>
            </div>
          </template>
          <template v-if="item.is_normal">
            <div class=" text-[24px] space-y-[8px]">
              <div class="flex items-center justify-between">
                <p>{{ t('orderDetail.updateTime') }}：{{ item.normal_time }}</p>
                <p class="text-[#FF356D]">{{ item.is_normal ? t('orderDetail.isNormal') : '' }}</p>
              </div>
              <p class="text-[#FF356D]">
                <span>
                  [{{ item.normal_memo }}]
                </span>
              </p>
            </div>
          </template>
          <template v-if="item.status !== -1">
            <div class=" text-[24px] space-y-[4px]">
              <div class="flex items-center justify-between">
                <p>{{ t('orderDetail.updateTime') }}：{{
                  item.status === 4
                    ? item.inspection_time
                    : item.status === -2
                      ? item.cancel_time
                      : item.last_update_time
                }}</p>
                <p class="text-[#FF356D]">{{ item.status != -1
                  ? item.status == -2
                    ? item.cancel_type == 1
                      ? '取消采购'
                      : '重新采购'
                    : item.status_str
                  : '' }}</p>
              </div>
              <div v-if="item.receipt_images && item.receipt_images.length">
                <div class="mt-[10px] bg-gray-100 rounded-lg px-[24px] flex items-center" v-if="item.status === 4"
                  @click="handleImagePreview(item.receipt_images || [])">
                  <i class="iconfont icon-Voucher text-gray-500 mr-[8px]"></i>
                  <p class="text-sm text-gray-500 flex-1" v-if="item.status === 4">{{ t('orderDetail.storeVoucher') }}
                  </p>
                  <i class="iconfont icon-Right text-gray-500"></i>
                </div>
              </div>
            </div>
          </template>
        </div>
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

const id = typeof route.query.id === 'string' ? route.query.id : '';
const isLoading = ref(true);
interface Order {
  buy_order: Array<{
    product_name: string;
    status_str: string;
    is_exception: boolean;
    is_normal: boolean;
    status: number;
    exception_time?: string;
    normal_time?: string;
    normal_memo?: string;
    last_update_time?: string;
    cancel_type?: number;
    inspection_time?: string;
    cancel_time?: string;
    exception_str?: string;
    exception_memo?: string;
    exception_images?: string[];
    receipt_images?: string[];
  }>;
}


const handleImagePreview = (imageList: string[]): void => {
  ImagePreview({
    images: imageList, // 图片数组，支持多张
    startPosition: 0,   // 初始位置（第几张）
  });
};


const order = ref<Order>({ buy_order: [] });

const getOrderDetail = async () => {
  const res = await orderApi.getPaidOrderDetail(id);
  order.value = res.data || {};
  isLoading.value = false;
};
getOrderDetail()

</script>

<style scoped>
.icon-Voucher,
.icon-Picture {
  font-size: 36px;
}

.icon-Right {
  font-size: 54px;
  color: #515360;
}
</style>