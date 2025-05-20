<template>
  <div>
    <div class="flex justify-center items-center bg-[#F4F4F4] rounded-full  h-[64px]">
      <div class="px-4 flex-1 text-[#515360]  account-tab" v-for="(item, index) in tabs" :key="index"
        :class="{ active: active === index }" @click="activeTab(index)">
        <span class="whitespace-nowrap">{{ item.name }}</span>
      </div>
    </div>
    <div class="text-blue-500 text-4xl font-bold py-[2rem]" v-if='active != 2&&tabs[active].value'>
      {{ tabs[active].value }} 
      <span class="text-xl">¥</span>
    </div>
    <div class="py-[2rem]" v-else>
      <div class='flex justify-between items-center'>
        <div>{{ t('finance.availableCredit') }}</div>
        <div class="font-bold text-[#004CE0] text-[40px]" v-if='tabs[active].value'>
          {{ tabs[active].value }} 
          <span class="text-[#004CE0] pl-[6px] text-[24px]">¥</span>
        </div>
      </div>
      <div class='flex justify-between items-center pt-[48px]' v-if="false">
        <div>已用授信</div>
        <div class="font-bold text-[#004CE0] text-[40px]">456246.00<span
            class="text-[#004CE0] pl-[10px] text-[24px]">¥</span></div>
      </div>
    </div>
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
