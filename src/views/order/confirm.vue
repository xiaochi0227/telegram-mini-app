<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>
    <div class="px-[32px] flex-1 overflow-y-auto">
      <div class="px-[24px] mb-[28px] bg-white rounded-[12px] shadow-sm">
        <div
          class="flex justify-between items-center py-[20px] text-[28px] font-[600] border-b border-[#F4F4F4]"
        >
          <span>采购订单号：</span>
          <span>{{ order_no }}</span>
        </div>

        <p class="mx-8 pb-10 pt-4 text-[28px] text-[#515360] text-center">
          为避免价格波动引起后续补款或退款，请等待业务员确认价格，确认后我们将与您联系，请耐心等待。
        </p>
      </div>

      <div class="px-[24px] mb-[28px] py-4 bg-white rounded-[12px] shadow-sm">
        <p class="mx-8 pb-6 text-[28px] text-[#515360] text-center">
          您可以通过以下方式主动联系业务员。
        </p>

        <div
          class="py-[10px] mb-3 text-center text-[28px] border border-[#E7E7E9] rounded-[12px]"
          @click="handleContact('https://t.me/@pakupay')"
        >
          <i class="iconfont icon-telegram text-[#28A7E7] mr-1"></i>
          <span>PAKUPAY</span>
        </div>

        <div
          class="py-[10px] text-center text-[28px] border border-[#E7E7E9] rounded-[12px]"
          @click="handleContact('tel:+17774072288')"
        >
          <i class="iconfont icon-Phone text-[#FF356D] mr-1"></i>
          <span>+86 17774072288</span>
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
import { useRoute } from 'vue-router'
import { decryptParams } from '@/utils/encryption'
import { inquiryApi } from '@/api'
import { Notify } from 'vant'
import { useOrderStore } from '@/store/order'

const route = useRoute()
const decryptedData = ref({})

const order_no = computed(() => {
  return decryptedData.value.order_no || ''
})

const { setProducts, setAddressList } = useOrderStore()

interface Contact {
  contact: string;
}
const handleContact = (contact: Contact['contact']): void => {
  window.location.href = `${contact}`;
};

// 下单页有5个入口
// 1.购物车下单购买(传购物车选中数据ids)
// 2.询价单整单购买(传询价单id)
// 3.询价单勾选部分商品购买(选中商品ids)
// 4.需求单已生成后从订单确认点到前面两个tab(传需求单id) 小程序不存在这个了
// 5.已取消的需求单重新下单 旧的需求单id，去调用新接口
const getDetail = async () => {
  const { purchase_order_id = '' } = decryptedData.value
  let params = { purchase_order_id }

  if (!purchase_order_id) {
    Notify({ type: 'danger', message: '需求单id为空' })
    return
  }

  const res = await inquiryApi.getItemFromDifferentSource(params)

  console.log(res)

  if (res.code != 1) return

  const { item_data = [] } = res.data.list

  setProducts(item_data)
}

const getShippingAddress = async () => {
  const { purchase_order_id } = decryptedData.value

  if (!purchase_order_id) {
    Notify({ type: 'danger', message: '需求单id为空' })
    return
  }

  const res = await inquiryApi.getShippingAddress({ purchase_order_id })

  if (!res || res.code !== 1) return

  const address_list = res.data || []
  setAddressList(address_list)
}

const init = () => {
  const encryptedData = route.query.query || ''
  // 解密后的传参
  decryptedData.value = encryptedData
    ? decryptParams(decodeURIComponent(encryptedData))
    : {}

  getDetail()
  getShippingAddress()
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
