<template>
  <div class="flex flex-col px-[32px] min-h-screen">
		<div class="nav-header px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]">
			<nav-bar />
			<div class="relative mt-2 mb-2">
				<div
					class="flex items-center w-full h-[62px] rounded-[12px] border border-[#F4F4F4] bg-[#fff] px-4 text-[#212121] text-[28px] cursor-pointer select-none"
					@click="showActionSheet = true"
				>
					<span class="flex-1">{{ selectedLabel }}</span>
					<van-icon name="arrow-down" class="text-[#9EA1AA]" />
				</div>
				<ActionSheet
					v-model:show="showActionSheet"
					:actions="actions"
					@select="onSelect"
					cancel-text="取消"
				/>
			</div>
		</div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="item in list"
          :key="item.id"
          class="bg-white rounded-[24px] shadow px-[20px] py-[24px] mb-[24px]"
        >
					<p class="text-[32px] text-[#212121] font-bold mb-[16px]">{{ item.id }}</p>

          <div class="flex justify-between items-center mb-[8px]">
						<span class="text-[#212121] text-[28px]">询价时间</span>
            <span class="text-[#515360] text-[24px]">{{ item.time }}</span>
          </div>
					<div class="flex justify-between items-center">
						<span class="text-[#212121] text-[28px]">商品种类/已报价</span>
            <span class="text-[#515360] text-[24px]">{{ item.count }}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Toast from 'vant/es/toast'
import NavBar from '@/components/nav-bar/index.vue'
import { ActionSheet } from '@/plugins/vant';

interface InquiryItem {
  id: string;
  time: string;
  count: string;
}

const list = ref<InquiryItem[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

// ActionSheet state
const showActionSheet = ref(false);
const selectedLabel = ref('全部');
const actions = [
  { name: '全部' },
  { name: '待报价' },
  { name: '已报价' },
  { name: '已完成' },
];

const onSelect = (action: any) => {
  selectedLabel.value = action.name;
  showActionSheet.value = false;
};

const mockData = () =>
  Array.from({ length: 5 }, (_, i) => ({
    id: '2424234',
    time: '24.02.2017,07:10',
    count: '5/3',
  }));

const onLoad = () => {
  loading.value = true;
  setTimeout(() => {
    if (list.value.length >= 20) {
      finished.value = true;
    } else {
      list.value = list.value.concat(mockData());
    }
    loading.value = false;
  }, 1000);
};

const onRefresh = () => {
  setTimeout(() => {
    list.value = mockData();
    finished.value = false;
    refreshing.value = false;
		Toast('刷新成功');
  }, 1000);
};

// 初始化加载
onRefresh();
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
