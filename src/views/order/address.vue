<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>

    <div class="px-[32px] flex-1">
      <!-- 显示已选地址 -->
      <div
        v-for="address in orderStore.addresses"
        :key="address.id"
        class="mt-[24px] bg-white rounded-[14px] p-[24px] shadow-sm overflow-hidden"
      >
        <p class="text-[#212121] text-[28px]">
          {{ address.country_name }} &nbsp; {{ address.province_name }} &nbsp;
          {{ address.city_name }} &nbsp; {{ address.detail_address }}&nbsp;
          <span v-if="address.landline_num">{{ address.landline_num }}</span>
        </p>
        <p class="text-[#212121] text-[28px] mt-1">
          +{{ address.country_code }}&nbsp;
          {{ formattedPhone(address.phone_num) }}
        </p>
        <p class="text-[#515360] text-[24px] mt-1">
          {{ t('address.postcode') }}: {{ address.postal_code }}
        </p>
        <p class="text-[28px] font-[500] mt-1">包装与配送要求</p>
        <p class="text-[28px] mt-1">{{ address.memo }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import { useOrderStore } from '@/store/order'
import { formattedPhone } from '@/utils/format'
import { useI18n } from 'vue-i18n'


const orderStore = useOrderStore()
const {t} = useI18n()
</script>
