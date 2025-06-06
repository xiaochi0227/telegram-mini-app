<template>
  <div>
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="item in tabs" :title="item.name">
        <div class="text-left" v-if='active != 2 && tabs[active].value'>
          <p class="text-[#6D7278] mt-[32px]">{{ t('accountCenter.balance') }}</p>
          <p class="text-[#151618] text-[64px] font-bold">
            <span class="text-[40px]" v-if="active == 0">$</span>
            <span class="text-[40px]" v-else-if="active == 1">¥</span>
            {{ tabs[active].value }}
          </p>
        </div>
        <div class="text-left" v-else>
          <p class="text-[#6D7278] mt-[32px]">{{ t('finance.availableCredit') }}</p>
          <p class="text-[#151618] text-[64px] font-bold">
            <span class="text-[40px]">¥</span>
            {{ tabs[active].value }}
          </p>
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
  height: 72px;

  .van-tabs__nav {
    background: #F4F4F7;
    border-radius: 12px;
    padding: 0 4px;
  }

  .van-tab__text {
    display: block;
    height: 100%;
    line-height: 72px;
  }

  .van-tab {
    position: relative;
    z-index: 9;
    /*&::after {
      position: absolute;
      content: '';
      right: 0px;
      width: 2px;
      height: 24px;
      top: 24px;
      background-color: rgba(0, 0, 0, 0.15);
      z-index: 1;
    }
    &:last-child{
      &::after{
        display: none;
      }
    }*/
  }

  .van-tabs__line {
    height: 64px;
    top: 4px;
    background-color: #fff;
    border-radius: 10px;
    width: calc(100% / 3);
    z-index: 3;
    box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.04);
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
