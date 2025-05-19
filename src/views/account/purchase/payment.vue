<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>
    <van-skeleton title row="6" :loading="loading">
      <div class="px-[32px] flex-1 overflow-y-auto">
        <div
          class="px-[24px] mb-[28px] py-4 bg-white rounded-[12px] shadow-sm text-[28px]"
        >
          <div class="flex justify-between items-center">
            <span class="text-[#515360]">订单号：</span>
            <span class="font-[500]">
              {{ balanceInfo?.order_no }} 
            </span>
          </div>

          <div class="flex justify-between items-center mt-1">
            <span class="text-[#515360]">剩余尾款：</span>
            <span class="font-[500]"> ￥{{ balanceInfo?.need_pay_rmb }} </span>
          </div>

          <div class="flex justify-between items-center mt-1">
            <span class="text-[#515360]">资金余额：</span>
            <span class="text-[#004CE0] font-[500]">
              ￥{{ balanceInfo?.rmb_balance }}
            </span>
          </div>

          <div
            class="flex flex-col my-[20px] px-[28px] py-[24px] rounded-[12px] bg-[#F4F4F4] text-[28px]"
            v-if="is_insufficient"
          >
            <span class="text-[#ED2323]">人民币余额不足</span>

            <span class="mt-1 text-[#FF356D] underline" @click="handleExcharge">
              使用美元兑换人民币
            </span>
          </div>

          <PasswordInput
            v-model="pay_password"
            ref="passwordInput"
            class="mt-4 mb-[28px]"
            :loading="btnLoading"
            :auto-submit="false"
            @submit="handlePay"
            title="支付密码"
            v-else
          />

          <!-- 如何充值按钮 -->
          <div class="flex justify-end items-center">
            <span
              class="mr-4 text-[#FF356D] underline text-[28px]"
              v-if="!hasPayPassword"
            >
              设置支付密码
            </span>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import PasswordInput from '@/components/PasswordInput/index.vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { balanceApi, inquiryApi } from '@/api'
import { Notify } from 'vant'

const route = useRoute()
const router = useRouter()
const hasPayPassword = ref(false)
const balanceInfo = ref({})
// 支付密码
const pay_password = ref('')
const passwordInput = ref()
// 余额不足
const is_insufficient = ref(false)
const btnLoading = ref(false)
const loading = ref(false)

const purchase_order_id = computed(() => {
  return route.query.id || ''
})

const getHasPayPassword = async () => {
  const res = await balanceApi.hasPayPassword()

  if (res.code != 1) return

  hasPayPassword.value = res.data || false
}

// 获取金额信息
const getPendingPayment = async () => {
  if (!purchase_order_id.value) {
    Notify({ type: 'danger', message: '需求单id为空' })
    return
  }

  const res = await inquiryApi.getPendingPayment({
    purchase_order_id: purchase_order_id.value,
  })

  if (res.code != 1) return

  const balance_info = res.data || {}
  const { need_pay_rmb, rmb_balance } = balance_info

  balanceInfo.value = balance_info
  if (need_pay_rmb && rmb_balance) {
    // 余额不足
    is_insufficient.value = +rmb_balance < +need_pay_rmb
  }
}

// 换汇
const handleExcharge = () => {
  router.push('/excharge')
}

const handlePay = async (values: any) => {
  const params = {
    purchase_order_id: purchase_order_id.value,
    balance_pay_money: balanceInfo.value.need_pay_rmb,
    pay_password: pay_password.value,
  }

  btnLoading.value = true

  const res = await inquiryApi.payOrder(params)

  btnLoading.value = false

  if (res.code != 1) {
    passwordInput.value.clearPassword()
    return
  }

  Notify({ type: 'success', message: '支付成功' })
  router.back()
}

const fetchData = async (): Promise<FetchDataResult> => {
  try {
    const results = await Promise.all([
      // 是否有支付密码
      getHasPayPassword(),
      // 获取用户金额信息
      getPendingPayment(),
    ])

    return results
  } catch (error) {
    console.error('获取数据失败:', error)
    throw error
  }
}

const init = async () => {
  loading.value = true

  await fetchData()

  loading.value = false
}

init()
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 36px;
}

.view-detail {
  padding: 24px 28px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 30px;
  color: #212121;
}
</style>
