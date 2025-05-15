<template>
  <div class="fund-manage mx-[1rem]">
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="index in 2" :title="'选项 ' + index">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="item in list" :key="item" class="bg-white rounded-lg shadow p-4 mt-4">
              <!-- 时间 -->
              <div class="flex items-center text-gray-500 text-sm mb-4">
                <i class="iconfont icon-Time mr-2"></i>
                <span>24.02.2017, 07:10</span>
              </div>
              <!-- 资金单号 -->
              <div class="flex justify-between text-gray-700 text-base mb-2">
                <span>资金单号</span>
                <span>123456789125</span>
              </div>
              <!-- 消费类型 -->
              <div class="flex justify-between text-gray-700 text-base mb-2">
                <span>消费类型</span>
                <span>退款</span>
              </div>
              <!-- 关联订单号 -->
              <div class="flex justify-between text-gray-700 text-base mb-2">
                <span>关联订单号</span>
                <span>123456789125</span>
              </div>
              <!-- 金额 -->
              <div class="flex justify-between text-gray-700 text-base">
                <span>金额</span>
                <span class="text-blue-500 font-bold">USD $42456.56</span>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();

const goBack = () => {
  router.back();
};
const active = ref(0);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 30) {
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
</script>

<style scoped lang="scss">
.fund-manage {
  font-size: 28px;
  color: #515360;

  .icon-Time {
    font-size: 36px;
    color: #515360;
  }

  :deep(.van-tabs__wrap) {
    --van-tabs-line-height: 80px;
    border-radius: 0 0 24px 24px;

    .van-tab {
      font-size: 28px;

      .van-tab__text {
        display: block;
        line-height: 100%;
      }
    }

    .van-tab--active {
      --van-tab-active-text-color: #FF356D;
    }

    .van-tabs__line {
      --van-tabs-bottom-bar-width: 42%;
    }
  }
}

.account-tab {
  position: relative;
  height: 100%;
  line-height: 64px;

  &.active {
    color: #212121;

    &:after {
      position: absolute;
      content: '';
      left: 2px;
      right: 0;
      height: 60px;
      top: 2px;
      background-color: #fff;
      border-radius: 30px;
      z-index: 1;
    }
  }

  span {
    position: relative;
    z-index: 2;
  }

}
</style>