<template>
  <div class="fund-manage mx-[1rem]">
    <div class=" bg-white px-[20px]">
      <div class=" border-b border-[#f4f4f4] flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <van-tabs v-model:active="active" swipeable @change="onChange">
      <van-tab v-for="item in tabs" :title="item.title" :key="item.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="item in list" :key="item" class="bg-white rounded-lg shadow p-4 mt-4">
              <!-- 时间 -->
              <div class="flex items-center text-gray-500 text-sm mb-4">
                <i class="iconfont icon-Time mr-2"></i>
                <span>{{ item.add_time }}</span>
              </div>
              <!-- 资金单号 -->
              <div class="flex justify-between text-gray-700 text-base mb-2">
                <span>资金单号</span>
                <span>{{ item.serial_no }}</span>
              </div>
              <!-- 消费类型 -->
              <div class="flex justify-between text-gray-700 text-base mb-2">
                <span>消费类型</span>
                <span>{{ item.pay_type_str }}</span>
              </div>
              <!-- 关联订单号 -->
              <div class="flex justify-between text-gray-700 text-base mb-2">
                <span>关联订单号</span>
                <span>{{ item.entity_no }}</span>
              </div>
              <!-- 消费记录 -->
              <div class="flex justify-between text-gray-700 text-base" v-if="active === 0">
                <span>金额</span>
                <template v-if="item.change_type === 5">
                  <section v-if="item.entity_type === 6">
                    
                    <div class="text-blue-500 font-bold">-¥{{ item.rmb_money }}</div>
                    <div class="text-blue-500 font-bold">+${{ item.usd_money }}</div>

                  </section>
                  <section v-else>

                    <div class="text-blue-500 font-bold">-${{ item.usd_money }}</div>
                    <div class="text-blue-500 font-bold">+¥{{ item.rmb_money }}</div>

                  </section>
                </template>
                <template v-else>
                  <div class="text-blue-500 font-bold">
                    {{ item.change_type === 3 ? '+' : '-' }}
                    {{ item.change_money ? `¥${item.change_money}` : '' }}
                  </div>
                </template>
              </div>
               <!-- 充值记录 -->
              <div class="flex justify-between text-gray-700 text-base" v-else>
                <span>金额</span>
                <div class="text-blue-500 font-bold">
                  {{item.currency_type == 1 ? 'USD $' : 'CNY ￥'}}
                  {{item.change_money}}
                </div>
              </div>
            </div> 
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { balanceApi } from '@/api';
import { useRoute } from 'vue-router';
const router = useRoute(); 
console.log(router)
const { t } = useI18n();
const tabs = ref([
  { title: '消费记录', id: 1, change_type_arr: [2, 3, 5] },
  { title: '充值记录', id: 2 },
]);
const pagination = ref({
  page: 1,
  limit: 10,
  total: 0,
});
const active = ref(0);
active.value = Number(router.query.active) || 0;
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const onChange = (index: number) => {
  pagination.value.page = 1;
  pagination.value.total = 0;
  active.value = index;
  finished.value = false;
  list.value = [];
  loading.value = true;
  onLoad();
};
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
    };
    let res = null
    if (active.value === 1) {
      params = {
        ...params,
      };
      res = await balanceApi.getRechargeRecords(params);
    } else if (active.value === 0) {
      params = {
        ...params,
        change_type_arr: [2, 3, 5],
      };
      res = await balanceApi.getWithdrawRecords(params);
    }



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