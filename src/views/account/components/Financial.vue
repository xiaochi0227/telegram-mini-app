<template>
  <div>
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="item in tabs" :title="item.name">
        <div class="text-blue-500 text-4xl font-bold py-[64px]" v-if='active != 2 && tabs[active].value'>
          <span class="text-xl" v-if="active == 0">$</span>
          <span class="text-xl" v-else-if="active == 1">¥</span>
          {{ tabs[active].value }}
        </div>
        <div class="py-[64px]" v-else>
          <div class='flex justify-between items-center'>
            <div>{{ t('finance.availableCredit') }}</div>
            <div class="font-bold text-[#004CE0] text-[40px]" v-if='tabs[active].value'>
              <span class="text-[#004CE0] pl-[6px] text-[24px]">¥</span>
              {{ tabs[active].value }}
            </div>
          </div>
          <!-- <div class='flex justify-between items-center pt-[48px]' v-if="false">
        <div>已用授信</div>
        <div class="font-bold text-[#004CE0] text-[40px]">456246.00<span
            class="text-[#004CE0] pl-[10px] text-[24px]">¥</span></div>
      </div> -->
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { balanceApi } from '@/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const active = ref(0)
const activeTab = (index: number) => {
  active.value = index
}
const tabs = ref([
  { name: 'USD', value: '', key: 'usd_balance' },
  { name: 'CNY', value: '', key: 'rmb_balance' },
  { name: t('finance.credit'), value: '', key: 'credit_line' }
])
const fetchBalanceIndex = async () => {

  const res = await balanceApi.getBalanceIndex()

  if (res.code !== 1) {
    return
  }

  const {
    user_balance = {},
  } = res.data?.list
  tabs.value.forEach((item) => {
    const { key } = item
    item.value = user_balance[key] || ''
  })
}
onMounted(() => {
  fetchBalanceIndex()
})
</script>


<style scoped lang="scss">
:deep(.van-tabs__wrap) {
  height: 64px;

  .van-tabs__nav {
    background: rgb(244, 244, 244);
    border-radius: 32px;
    padding: 0 4px;
  }

  .van-tab__text {
    display: block;
    height: 100%;
    line-height: 64px;
  }

  .van-tab {
    position: relative;
    z-index: 9;
  }

  .van-tabs__line {
    height: 60px;
    top: 2px;
    background-color: #fff;
    border-radius: 30px;
    width: calc(100% / 3);
    z-index: 1;
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
      right: 2px;
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
