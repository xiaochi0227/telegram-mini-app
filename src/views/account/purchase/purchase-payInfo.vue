<template>
  <div class="mx-[32px]" v-loading="isLoading">
    <div class=" bg-white px-[20px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>

    <div>

      <div class="bg-white rounded-[24px] shadow p-4 mt-[24px]">
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>{{ t('orderDetail.alreadyPay') }}</p>
            <p class="text-[#212121]">
              CNY ￥{{ order.already_pay_rmb_price }}
            </p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('orderDetail.needPay') }}</p>
            <p class="text-[#212121]">CNY ￥{{ order.need_pay_rmb_price }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[24px] shadow p-4 mt-[24px]">
       
        <div class="space-y-2 text-sm">
          <template v-if="order.consumption_record">
            <template v-for="(record, index) in order.consumption_record" :key="index">
              <div class="flex justify-between">
                <p>{{ t('orderDetail.addTime') }}</p>
                <p class="text-[#212121]">{{ record.add_time }}</p>
              </div>
              <div class="flex justify-between">
                <p>交易ID</p>
                <p class="text-[#212121]">{{ record.serial_no }}</p>
              </div>
              <div class="flex justify-between">
                <p>{{ t('orderDetail.changeMoney') }}</p>
                <p class="text-[#212121]">
                  {{ record.currency_type == 1 ? 'USD' : 'CNY' }}
                  &nbsp;
                  {{ record.currency_type == 1 ? '$' : '￥' }}
                  {{ record.change_money }}
                </p>
              </div>
              <div class="flex justify-between">
                <p>{{ t('orderDetail.payType') }}</p>
                <p class="text-[#212121]">{{ record.pay_type_str }}</p>
              </div>
            </template>
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
import { useRoute } from 'vue-router';
const route = useRoute();
const { t } = useI18n()

const id = Array.isArray(route.query.id) ? route.query.id[0] : route.query.id || '';
const isLoading = ref(true);
const order = ref<{
  need_pay_rmb_price?: number;
  already_pay_rmb_price?: number;
  order_status?: number;
  pay_status?: number;
  consumption_record?: Array<{
    add_time: string;
    serial_no: string;
    currency_type: number;
    change_money: number;
    pay_type_str: string;
  }>;
}>({});

const getOrderDetail = async () => {
  const res = (await orderApi.getPaidOrderDetail(id as string))
  order.value = res.data || {};
  isLoading.value = false;
};
getOrderDetail()

</script>

<style scoped></style>