<template>
  <div class="mx-[1rem]">
    <div class=" bg-white px-[20px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="text-[28px] text-[#515360] mt-[24px]">
      <div class="w-full h-[400px] space-y-4" v-for="(item, index) in order.buy_order.receipt_images" :key="index">
        <van-image class="w-full h-full rounded-[16px]" fit="contain" :src="item" />
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
const router = useRouter();
const route = useRoute();
const { t } = useI18n()

const id = route.query.id
const order = ref({});

const getOrderDetail = async () => {
  const res = (await orderApi.getPaidOrderDetail(id))
  order.value = res.data || {};
};
getOrderDetail()

</script>

<style scoped></style>