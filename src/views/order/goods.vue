<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>

    <div class="flex-1 overflow-y-auto">
      <div class="mx-[32px] rounded-[12px] bg-white shadow-sm">
        <div
          v-for="item in orderStore.products"
          :key="item.id"
          class="p-[24px]"
        >
          <!-- Product Card -->
          <div class="flex items-start">
            <!-- Product Image -->
            <van-image
              :src="item.image"
              class="w-[160px] h-[160px] rounded-[8px] mr-[16px]"
              fit="cover"
            />

            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="text-[28px] font-medium text-[#212121] mb-[12px]">
                {{ item.name }}
              </h3>

              <div class="flex justify-between items-center mb-[12px]">
                <span class="text-[24px] text-[#515360]">单价</span>
                <span class="text-[28px] font-medium text-[#212121]"
                  >¥{{ item.price }}</span
                >
              </div>

              <div class="flex justify-between items-center mb-[12px]">
                <span class="text-[24px] text-[#515360]">服务费</span>
                <span class="text-[28px] font-medium text-[#212121]"
                  >¥100.00</span
                >
              </div>

              <div class="flex justify-between items-center">
                <span class="text-[24px] text-[#515360]">装箱数量</span>
                <span class="text-[28px] font-medium text-[#212121]">{{
                  item.quantity
                }}</span>
              </div>
            </div>
          </div>

          <!-- Total Price -->
          <div class="mt-[24px] pt-[24px] border-t border-[#EBEDF0]">
            <div class="flex justify-between items-center">
              <span class="text-[24px] text-[#515360]">总箱数</span>
              <span class="text-[32px] font-bold text-[#212121]">{{
                item.quantity
              }}</span>
            </div>
            <div class="flex justify-between items-center mt-[12px]">
              <span class="text-[24px] text-[#515360]">总金额</span>
              <span class="text-[32px] font-bold text-[#FF356D]"
                >¥{{ item.price * item.quantity + 100 }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import { Image as VanImage } from 'vant'
import { useOrderStore } from '@/store/order'

const orderStore = useOrderStore()
</script>
