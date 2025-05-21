<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>

    <div class="flex-1 overflow-y-auto">
      <div class="pt-[2px] mx-[32px] rounded-[12px] bg-white shadow-sm">
        <div
          v-for="(item, idx) in orderStore.products"
          :key="item.id"
          :class="[
            'm-[24px] pb-[24px]',
            idx !== orderStore.products.length - 1
              ? 'border-b border-[#F4F4F4]'
              : '',
          ]"
        >
          <div class="flex justify-between items-center text-[28px] font-[600]">
            <span>{{ item.product_name }}</span>
            <span class="text-[#004CE0]">
              CNY ¥{{ item.total_product_price }}
            </span>
          </div>

          <div
            class="flex justify-between items-center mt-1 text-[24px] text-[#515360]"
          >
            <span>{{ t('inquiriesDetails.unitPprice') }}</span>
            <span>¥{{ item.price }}</span>
          </div>

          <div
            class="flex justify-between items-center mt-1 text-[24px] text-[#515360]"
          >
            <span>{{ t('order.productNum') }}</span>
            <span>{{ item.product_num }}</span>
          </div>

          <div
            class="flex justify-between items-center mt-1 text-[24px] text-[#515360]"
          >
            <span>{{ t('cart.serviceFee') }}</span>
            <span>¥{{ item.service_price }}</span>
          </div>

          <div
            class="flex flex-col bg-[#F4F4F4] mt-2 rounded-[10px] px-[20px] py-[12px] text-[#515360] text-[24px]"
            v-if="entry == 4"
          >
            <span>
              {{ t('checkout.packingQuantity') }}&nbsp;{{
                item.packing_quantity
              }}
            </span>
            <span class="mt-1">
              {{ t('checkout.totalBoxes') }}&nbsp;{{ item.package_num }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import { useOrderStore } from '@/store/order'
import { useI18n } from '../../hooks/useI18n'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const orderStore = useOrderStore()
const { t } = useI18n()
const route = useRoute()

// 是否已下单查看
const entry = computed(() => {
  return route.query.entry || ''
})
</script>
