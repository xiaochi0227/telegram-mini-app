<template>
  <div class="mx-[1rem] text-[28px] text-[#515360] h-full overflow-y-auto">
    <div class="bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="space-y-4 text-[28px]">
      <!-- 发货单信息 -->
      <div class="bg-white rounded-[24px] shadow p-4">
        <div class="mb-[20px]">
          <span class="bg-orange-100 text-orange-500 text-sm px-2 py-1 rounded">{{ order.order_status_str }}</span>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-500">
              {{ t('accountCenter.orderNumber') }}:
            </p>
            <p class="text-lg font-bold text-[#212121]">{{ order.order_no }}</p>
          </div>

        </div>
        <div class="mt-4 flex justify-between items-center">
          <p>{{ t('order.orderTime') }}:</p>
          <p class="text-[#212121]">{{ order.add_time }}</p>
        </div>
      </div>

      <!-- 支付信息 -->
      <div class="bg-white rounded-[24px] shadow p-4" v-if="order.order_status != -1">
        <h2 class="font-bold mb-4 text-[#212121]">
          {{ t('checkout.orderInfo') }}
        </h2>
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
          <div v-if="
            (order.order_status == 3 ||
              order.order_status == 4 ||
              order.order_status == 5) &&
            order.pay_status == 3
          ">
            <div class="w-full text-center bg-[#FF356D] h-[90px] leading-[90px] rounded-[24px] text-[#fff] my-[36px]"
              @click="handlePayment">
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
    </div>
    <!-- 支付信息 -->
    <div class="bg-white mt-[24px] rounded-[24px] shadow p-4" v-if="order.order_status != -1">
      <h2 class="font-bold mb-4 text-[#212121] flex justify-between items-center">
        <p>{{ t('orderDetail.total') }}</p>
        <p class="text-[#004CE0]">CNY ￥{{ order.total_price }}</p>
      </h2>
      <div class="h-[2px] bg-[#f4f4f4] my-[32px]"></div>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <p>{{ t('orderDetail.proPrice') }}</p>
          <p class="text-[#212121]">￥{{ order.total_product_price }}</p>
        </div>
        <div class="flex justify-between">
          <p>{{ t('cart.serviceFee') }}</p>
          <p class="text-[#212121]">￥{{ order.service_price }}</p>
        </div>

        <div class="flex justify-between">
          <p>{{ t('cart.inlandShipping') }}</p>
          <p class="text-[#212121]">￥{{ order.inland_freight }}</p>
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

    <div
      class="space-y-4 mt-[24px] bg-white shadow-[0_1px_3px_0_rgba(184,184,184,0.25)] rounded-[24px] py-[32px] px-[20px]"
      v-if="order.order_status == -1">
      <div class="font-bold">{{ t('cart.procurement') }}</div>
      <!-- 商品卡片 -->
      <div class="rounded-[16px] p-[20px] flex items-center text-[#212121] border border-[#E7E7E9]"
        v-for="(item, index) in order.item_data" :key="index">
        <!-- 图片占位 -->
        <div class="w-[160px] h-[160px] rounded-md">
          <van-image class="w-full h-full" fit="contain" :src="item.images[0]" />
        </div>
        <!-- 商品信息 -->
        <div class="ml-4 flex-1">
          <p class="font-bold mb-2">{{ item.product_name }}</p>
          <div class="text-[24px] space-y-1">
            <div class="flex justify-between">
              <p>{{ t('inquiriesDetails.unitPprice') }} (CNY)</p>
              <p>{{ item.price }}</p>
            </div>
            <div class="flex justify-between">
              <p>{{ t('logistics.quantity') }}</p>
              <p>{{ item.product_num }}</p>
            </div>
            <div class="flex justify-between">
              <p>{{ t('checkout.totalBoxes') }}</p>
              <p>{{ item.package_num }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 操作按钮-->
    <div>
      <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]'
        v-if="order.buy_order && order.buy_order.length"
        @click="() => router.push({ path: '/account/purchase/purchase-info', query: { id } })">
        <div>
          {{ t('orderDetail.purchaseInfo') }}
          ：{{ completedOrdersCount }}/{{ order.buy_order.length }}
        </div>
        <i class="iconfont icon-Right"></i>
      </div>
      <div class="flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]"
        v-if="order.address_data && order.address_data.length"
        @click="() => router.push({ path: '/account/purchase/purchase-ads', query: { id } })">
        <div>{{ t('orderDetail.adsInfo') }}</div>
        <i class="iconfont icon-Right"></i>
      </div>
      <div class="flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121]"
        v-if="order.item_data && order.item_data.length && order.order_status != -1"
        @click="() => router.push({ path: '/account/purchase/goods', query: { id } })">
        <div>{{ t('cart.procurement') }}</div>
        <i class="iconfont icon-Right"></i>
      </div>
    </div>
    <div class="p-[20px] bg-white rounded-[24px] mt-[24px] px-[20px] text-[#212121] min-h-[200px] leading-[28px]"
      v-if="order.memo">
      {{ order.memo }}
    </div>

    <!-- 重新下单 -->
    <div v-if="order.order_status == -1"
      class="fixed flex  bottom-0 inset-x-[32px] justify-between items-center bg-white rounded-t-[24px] mt-[24px]  shadow-[0_-2px_5px_0_#DBDBDB] h-[164px] px-[20px]">
      <div class="bg-[#FF356D] flex items-center justify-center text-[#fff] w-full h-[80px] rounded-[24px]">
        <span>{{ t('orderDetail.reorderAgain') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import { orderApi } from '@/api'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const id = route.params.id
const order = ref({})
const completedOrdersCount = ref(0)
const handlePayment = () => {
  router.push('/account/purchase/payment?id=' + id)
}

const getOrderDetail = async () => {
  const res = await orderApi.getPaidOrderDetail(id)
  order.value = res.data || {}
}
getOrderDetail()

watchEffect(() => {
  completedOrdersCount.value = order.value.buy_order?.filter(item => item.status === 4).length || 0
})
</script>

<style scoped lang="scss">
.icon-Right {
  font-size: 64px;
  color: #515360;
}
</style>
