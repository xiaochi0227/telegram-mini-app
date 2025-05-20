<template>
  <div class="mx-[32px] flex flex-col h-full text-[28px]" v-loading="isLoading">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class="flex-1 overflow-y-auto space-y-4 bg-white shadow-[0_1px_3px_0_rgba(184,184,184,0.25)] rounded-[24px] py-[32px] px-[20px]">
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

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/index.vue';
import { orderApi } from '@/api';
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router';
;
const router = useRouter();
const route = useRoute();
const { t } = useI18n()

const id = route.query.id
const isLoading = ref(true);
const order = ref({});

const getOrderDetail = async () => {
  const res = (await orderApi.getPaidOrderDetail(id))
  order.value = res.data || {};
  isLoading.value = false;
};
getOrderDetail()



</script>

<style scoped lang="scss"></style>