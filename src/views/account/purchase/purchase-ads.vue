<template>
  <div class="mx-[32px]" v-loading="isLoading">
    <div class=" bg-white px-[20px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="space-y-4 text-[28px] text-[#515360] mt-[24px]" v-for="(item, index) in order.address_data"
      :key="index">
      <!-- 地址信息 -->
      <div class="bg-white rounded-2xl shadow p-4">
        <p class="text-lg font-bold mb-2">{{ item.country_name }}{{ item.province_name }}{{ item.city_name }}{{
          item.detail_address }}</p>
        <p class="text-sm text-gray-500 mb-1">+{{ item.country_code }} {{ item.phone_num }}</p>
        <p class="text-sm text-gray-500 mb-4">{{ item.landline_num }}</p>
        <!-- 包装与配送要求 -->
        <template v-if="item.memo">
          <p class="text-lg font-bold mb-2">{{ t('checkout.packagingRequirements') }}</p>
          <p class="text-sm text-gray-500 leading-relaxed">
            {{ item.memo }}
          </p>
        </template>
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
const route = useRoute();
const { t } = useI18n()

const id = Array.isArray(route.query.id) ? route.query.id[0] : route.query.id || '';
const isLoading = ref(true);
const order = ref<{ address_data: Array<{ country_name: string; province_name: string; city_name: string; detail_address: string; country_code: string; phone_num: string; landline_num?: string; memo?: string }> }>({ address_data: [] });

const getOrderDetail = async () => {
  const res = (await orderApi.getPaidOrderDetail(id as string))
  order.value = res.data || {};
  isLoading.value = false;
};
getOrderDetail()

</script>

<style scoped></style>