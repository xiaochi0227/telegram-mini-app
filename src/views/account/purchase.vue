<template>
  <div class="mx-[1rem]  text-[28px] text-[#515360]">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <div class='flex justify-between items-center h-[80px] bg-white rounded-[24px] mt-[24px] px-[20px]'
      @click="showPicker = true">
      <div>{{ result }}</div>
      <i class="iconfont icon-Right"></i>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="bg-white rounded-[24px] shadow py-4 px-[20px] mt-[24px]" v-for="item in list" :key="item">
          <!-- 顶部信息 -->
          <p class="text-[32px] text-[#212121] font-bold">{{ item.tracking_no }}</p>
          <p class=" text-[#FF8A21] pt-[12px]">{{ item.tracking_status_str }}</p>

          <!-- 底部信息 -->
          <div class="flex justify-between items-center pt-[12px]">
            <p>{{ t('order.orderTime') }}</p>
            <p>{{ item.add_time }}</p>
          </div>
          <div class="flex justify-between items-center pt-[12px]">
            <p>{{ t('logistics.trackingPrice') }}</p>
            <p>CNY ￥{{ item.total_price }}</p>
          </div>


          <!-- 分隔线 -->
          <!-- <div class="border-t border-[#F4F4F4] my-4"></div> -->
          <!-- 发货单按钮 -->
          <!-- <div class="text-center underline text-[#FF356D] font-bold">
            发货单
          </div> -->
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker :columns="orderStatusOptions" @cancel="showPicker = false" @confirm="onConfirm" />
  </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/index.vue';
import { logisticsApi } from '@/api';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
});

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  setTimeout(async () => {
    if (refreshing.value) {
      pagination.value.page = 1;
      pagination.value.total = 0;
      list.value = [];
      refreshing.value = false;
    }

    let params = {
      page: pagination.value.page,
      limit: pagination.value.limit,
      tracking_status_arr: status.value ? [status.value] : [2, 3, 4],
    };
    let res = await logisticsApi.getLogisticsList(params);

    if (res.code !== 1) return;
    const { list: data = [], total = 0 } = res.data || {};
    pagination.value.total = total;
    list.value = [...list.value, ...data];
    pagination.value.page += 1;
    loading.value = false;

    if (list.value.length >= total) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

const orderStatusOptions = [
  { value: '', text: t('order.allOrders') },
  { value: '2', text: t('accountCenter.inTransit') },
  { value: '3', text: t('logistics.arrived') },
  { value: '4', text: t('accountCenter.signed') },
];

const result = ref(t('order.allOrders'));
const status = ref('');
const showPicker = ref(false);

const onConfirm = (value: any) => {
  console.log('选中的值:', value);
  result.value = value.text;
  status.value = value.value;
  showPicker.value = false;
  pagination.value.page = 1;
  pagination.value.total = 0;
  finished.value = false;
  list.value = [];
  loading.value = true;
  onLoad();
};
</script>

<style scoped lang="scss">
.icon-Right {
  font-size: 64px;
  color: #515360;
}

:deep(.van-picker-column__wrapper) {
  font-size: 28px !important;
}

:deep(.van-picker__toolbar) {
  height: 80px !important;

  .van-haptics-feedback {
    font-size: 28px;
  }

  .van-picker__confirm {
    color: #FF356D;
  }
}
</style>