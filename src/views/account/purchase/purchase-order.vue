<template>
  <div class="mx-[1rem]  text-[28px] text-[#515360]">
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
            <p class="text-sm text-gray-500">{{ t('accountCenter.orderNumber') }}:</p>
            <p class="text-lg font-bold text-[#212121]">{{ order.order_no }}</p>
          </div>
          <div class="text-right">
            <span class="bg-orange-100 text-orange-500 text-sm px-2 py-1 rounded">{{ order.order_status_str }}</span>
          </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <p>{{ t('order.orderTime') }}:</p>
          <p class="text-[#212121]">{{ order.add_time }}</p>
        </div>
      </div>

      <!-- 支付信息 -->
      <div class="bg-white rounded-[24px] shadow p-4">
        <h2 class="font-bold mb-4 text-[#212121]">{{ t('checkout.orderInfo') }}</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>{{ t('orderDetail.alreadyPay') }}</p>
            <p class="text-[#212121]">CNY ￥{{ order.already_pay_rmb_price }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('orderDetail.needPay') }}</p>
            <p class="text-[#212121]">CNY ￥{{ order.need_pay_rmb_price }}</p>
          </div>
          <div
            v-if="(order.order_status == 3 || order.order_status == 4 || order.order_status == 5) && order.pay_status == 3">
            <div class="w-full text-center bg-[#FF356D] h-[90px] leading-[90px] rounded-[24px] text-[#fff] my-[36px]">
              {{ t('order.payEndMoney') }}
            </div>
          </div>
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

      <div class="bg-white rounded-[24px] shadow p-4">
        <h2 class="font-bold mb-4 text-[#212121] flex justify-between items-center">
          <p>{{ t('orderDetail.total') }}</p>
          <p class="text-[#004CE0]">CNY ￥{{order.total_price}}</p>
        </h2>
        <div class="h-[2px] bg-[#f4f4f4] my-[32px]"></div>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <p>{{ t('orderDetail.proPrice') }}</p>
            <p class="text-[#212121]">￥{{ order.total_product_price }}</p>
          </div>
          <div class="flex justify-between">
            <p>{{ t('cart.serviceFee') }}</p>
            <p class="text-[#212121]">￥{{order.service_price}}</p>
          </div>

          <div class="flex justify-between">
            <p>{{ t('cart.inlandShipping') }}</p>
            <p class="text-[#212121]">￥{{order.inland_freight}}</p>
          </div>
          <div>
            <div class="h-[2px] bg-[#f4f4f4] my-[32px]"></div>
          </div>
          <div class="flex justify-between text-[24px]">
            <p>{{ t('checkout.rmbToRub') }}</p>
            <p class="text-[#212121]">{{ order.rmb_to_rub_rate }}</p>
          </div>
          <div class="flex justify-between text-[24px]">
            <p>{{ t('checkout.usdToRub') }}</p>
            <p class="text-[#212121]">{{ order.rub_to_usd_rate }}</p>
          </div>
          <div class="flex justify-between text-[24px]">
            <p>{{ t('checkout.usdToRmb') }}</p>
            <p class="text-[#212121]">{{ order.rmb_to_usd_rate }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]'
       v-if="order.buy_order&&order.buy_order.length"
      @click="() => router.push({ path: '/account/purchase/purchase-info', query: { id} })"
    >
      <div>
        {{t('orderDetail.purchaseInfo')}} 
        ：2/{{ order.buy_order.length }}
      </div>
      <i class="iconfont icon-Right"></i>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]' 
      v-if="order.address_data&&order.address_data.length"
      @click="() => router.push({ path: '/account/purchase/purchase-ads', query: { id} })"
    >
      <div>{{ t('orderDetail.adsInfo') }}</div>
      <i class="iconfont icon-Right"></i>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]'>
      <div>采购商品</div>
      <i class="iconfont icon-Right"></i>
    </div>
    <div class="p-[20px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121] min-h-[200px] leading-[28px]">
      1111111111111
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/index.vue';
import { orderApi } from '@/api';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const { t } = useI18n()

const id = route.params.id
const order = ref({});

const getOrderDetail = async () => {
  const res = (await orderApi.getPaidOrderDetail(id))
  order.value = res.data || {};
};
getOrderDetail()

</script>

<style scoped lang="scss">
.icon-Right {
  font-size: 64px;
  color: #515360;
}
</style>