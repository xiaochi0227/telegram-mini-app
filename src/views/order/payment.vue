<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>
    <div class="px-[32px] flex-1 overflow-y-auto">
      <div class="px-[24px] mb-[28px] bg-white rounded-[12px] shadow-sm">
        <p class="py-[20px] text-[28px] font-[600] border-b border-[#F4F4F4]">
          采购订单号：{{ balanceInfo.order_no }}
        </p>

        <div class="py-[40px]">
          <van-count-down
            :time="calculateRemaining"
            class="mt-2 mb-[40px] text-center !text-[#FF356D] !text-[48px] font-[500]"
          />
          <p class="mb-4 text-[28px] text-[#515360] text-center">
            请在倒计时结束前完成支付
          </p>
        </div>
      </div>

      <div class="px-[24px] mb-[28px] py-4 bg-white rounded-[12px] shadow-sm">
        <div class="flex justify-between items-center font-[600]">
          <span class="text-[28px]">资金余额：</span>
          <span class="text-[32px] text-[#004CE0]">
            ￥{{ balanceInfo?.rmb_balance }}
          </span>
        </div>

        <!-- 如何充值按钮 -->
        <div class="flex justify-end">
          <span class="text-[#0066CC] underline text-[28px]" @click="handleRecharge">如何充值？</span>
        </div>
      </div>

      <!-- 商品信息 -->
      <van-cell
        title="商品信息"
        is-link
        class="view-detail mb-[28px]"
        :to="`/goods?entry=${decryptedData.entry}`"
      />

      <!-- 地址信息 -->
      <van-cell
        title="地址信息"
        is-link
        class="view-detail mb-[28px]"
        to="/address"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { decryptParams, encryptParams } from '@/utils/encryption'
import { balanceApi, inquiryApi, orderApi } from '@/api'
import { Notify } from 'vant'
import { useOrderStore } from '@/store/order'

const route = useRoute()
const router = useRouter()
const decryptedData = ref({})
const hasPayPassword = ref(false)
const balanceInfo = ref({})
// 欠费
const is_arrears_of_fees = ref(false)
// 余额不足
const is_insufficient = ref(false)
const btnLoading = ref(false)

const { setProducts, setAddressList } = useOrderStore()

// 剩余时间
const calculateRemaining = computed(() => {
  // 兼容 payment_deadline 可能为字符串或时间戳
  let deadline = balanceInfo.value.payment_deadline

  if (!deadline) return 0

  // 如果是秒，转为毫秒
  if (deadline < 1e12) {
    deadline = deadline * 1000
  }
  const now = Date.now()
  return Math.max(0, deadline - now)
})

const getHasPayPassword = async () => {
  const res = await balanceApi.hasPayPassword()

  if (res.code != 1) return

  hasPayPassword.value = res.data || false
}

// 获取金额信息
const getPendingPayment = async () => {
  const { purchase_order_id } = decryptedData.value

  if (!purchase_order_id) {
    Notify({ type: 'danger', message: '需求单id为空' })
    return
  }

  const res = await inquiryApi.getPendingPayment({ purchase_order_id })

  if (res.code != 1) return

  const balance_info = res.data || {}
  const { total_price, rmb_balance } = balance_info

  balanceInfo.value = balance_info
  if (total_price && rmb_balance) {
    // 欠费
    is_arrears_of_fees.value = +rmb_balance < 0
    // 余额不足
    is_insufficient.value = +rmb_balance < +total_price
  }
}

// 获取金额信息
const getPurchaseOrderDetail = async () => {
  const { purchase_order_id } = decryptedData.value

  if (!purchase_order_id) {
    Notify({ type: 'danger', message: '需求单id为空' })
    return
  }

  const res = await orderApi.getPurchaseOrderDetail({ purchase_order_id })

  if (res.code != 1) return

  const { item_data = [], address_data = [] } = res.data

  setProducts(item_data)
  setAddressList(address_data)
}

// 充值页面
const handleRecharge = () => {
  router.push('/recharge')
}

const handlePay = async (values: any) => {
  const { purchase_order_id } = decryptedData.value
  const { total_price } = balanceInfo.value
  const { pay_password } = values

  btnLoading.value = true

  const params = {
    purchase_order_id,
    balance_pay_money: total_price,
    pay_password,
  }

  const res = await inquiryApi.payOrder(params)

  btnLoading.value = false

  if (res.code != 1) return

  // 添加多个参数
  const encrypted = encryptParams({ purchase_order_id })

  router.replace(`/complete?query=${encodeURIComponent(encrypted)}`)
}

const init = () => {
  const encryptedData = route.query.query || ''
  // 解密后的传参
  decryptedData.value = encryptedData
    ? decryptParams(decodeURIComponent(encryptedData))
    : {}

  // 是否有支付密码
  getHasPayPassword()
  // 获取用户金额信息
  getPendingPayment()
  // 获取地址商品信息
  getPurchaseOrderDetail()
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
