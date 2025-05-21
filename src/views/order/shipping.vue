<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>

    <div class="px-[32px] flex-1 overflow-y-auto">
      <!-- 地址提示和选择 -->
      <div
        class="bg-[#FFFFFF] text-[#9FA2AB] text-[24px] rounded-[12px] shadow px-[20px] py-[24px] flex items-center"
      >
        <van-icon name="info-o" class="mr-2" size="15" color="#FF8A21" />
        <span>{{ t('checkout.shippingTips') }}</span>
      </div>

      <!-- 显示已选地址 -->
      <div
        v-for="address in addressStore.shippingAddress"
        :key="address.id"
        class="mt-[24px] bg-white rounded-[14px] p-[24px] shadow-sm overflow-hidden"
      >
        <div class="relative">
          <p class="text-[#212121] text-[28px]">
            {{ address.country_name }} &nbsp; {{ address.province_name }} &nbsp;
            {{ address.city_name }} &nbsp; {{ address.detail_address }}&nbsp;
            <span v-if="address.landline_num">{{ address.landline_num }}</span>
          </p>
          <p class="text-[#212121] text-[28px] mt-1">
            +{{ address.country_code }}&nbsp;
            {{ formattedPhone(address.phone_num) }}
          </p>
          <p class="text-[#515360] text-[24px] mt-1">
            {{ t('address.postcode') }}: {{ address.postal_code }}
          </p>

          <!-- 编辑按钮 -->
          <i
            class="iconfont icon-Edit text-[#FF356D]"
            @click.stop="handleEditAddress(address)"
          />
        </div>

        <van-cell
          class="view-cell"
          :title="t('checkout.packagingRequirements')"
          is-link
          @click="handleMemo(address)"
        />
      </div>

      <div class="my-4">
        <van-button
          color="#FF356D"
          plain
          block
          round
          size="small"
          style="font-weight: 500"
          @click="handleSelectAddress"
        >
          选择地址
        </van-button>
      </div>

      <!-- 订单信息卡片 -->
      <div class="bg-white rounded-[12px] p-4 mb-4 shadow-sm">
        <div class="font-[600] text-[28px] mb-2">
          {{ t('checkout.orderInfo') }}
        </div>
        <div
          class="flex justify-between items-center pb-[20px] mb-[24px] border-b border-[#F4F4F4]"
        >
          <span class="text-[28px] text-[#333333] font-[600]">{{
            t('cart.estimatedTotal')
          }}</span>
          <span class="text-[#004CE0] text-[36px] font-[600]">
            CNY ￥{{ orderInfo.total_price }}
          </span>
        </div>
        <div
          class="flex justify-between items-center text-[28px] font-[500] mb-2"
        >
          <span class="text-[#515360]">{{ t('cart.subtotal') }}</span>
          <span>CNY ￥{{ orderInfo.total_product_price }}</span>
        </div>
        <div
          class="flex justify-between items-center text-[28px] font-[500] mb-2"
        >
          <span class="text-[#515360]">{{ t('cart.serviceFee') }}</span>
          <span>CNY ￥{{ orderInfo.service_price }}</span>
        </div>
        <div
          class="flex justify-between items-center text-[28px] font-[500] pb-[20px] mb-[24px] border-b border-[#F4F4F4]"
        >
          <span class="text-[#515360]">
            {{ t('cart.inlandShipping') }}
          </span>
          <span>
            {{
              decryptedData.entry == 4
                ? orderInfo.inland_freight || '0.00'
                : t('cart.bePending')
            }}
          </span>
        </div>

        <div
          class="flex justify-between items-center text-[24px] font-[500] mb-2"
        >
          <span class="text-[#515360]">
            {{ t('checkout.exchangeRateValidity') }}
          </span>
          <span>{{ balanceInfo.add_time }}</span>
        </div>

        <div
          class="flex justify-between items-center text-[24px] font-[500] mb-2"
        >
          <span class="text-[#515360]">
            {{ t('checkout.rmbToRub') }}
          </span>
          <span>{{ balanceInfo.rmb_to_rub_rate }}</span>
        </div>

        <div
          class="flex justify-between items-center text-[24px] font-[500] mb-2"
        >
          <span class="text-[#515360]">
            {{ t('checkout.usdToRub') }}
          </span>
          <span>{{ balanceInfo.rub_to_usd_rate }}</span>
        </div>

        <div class="flex justify-between items-center text-[24px] font-[500]">
          <span class="text-[#515360]">
            {{ t('checkout.usdToRmb') }}
          </span>
          <span>{{ balanceInfo.rmb_to_usd_rate }}</span>
        </div>
      </div>

      <!-- 商品信息 -->
      <van-cell title="商品信息" is-link class="view-detail mb-[28px]" :to="`/goods?entry=${decryptedData.entry}`" />
    </div>

    <div
      class="mx-[32px] px-[20px] py-[32px] z-50 bg-[#FFFFFF] rounded-t-xl shadow"
    >
      <!-- 下单 -->
      <van-button
        class="font-bold"
        color="#FF356D"
        round
        block
        size="large"
        :loading="btnLoading"
        @click="handleConfirm"
      >
        {{ t('checkout.submitOrder') }}
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import { Notify } from 'vant'
import { orderApi, inquiryApi, balanceApi } from '@/api'
import { decryptParams, encryptParams } from '@/utils/encryption'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAddressStore } from '@/store/address'
import { useOrderStore } from '@/store/order'
import { formattedPhone } from '@/utils/format'

defineOptions({
  name: 'Shipping',
})

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const addressStore = useAddressStore()
const { setProducts } = useOrderStore()

const decryptedData = ref({})
const orderInfo = ref({})
const balanceInfo = ref({})
const btnLoading= ref(false)

onBeforeRouteLeave((to, from, next) => {
  const { path } = to
  // 如果是跳转到内页则不清空store否则清空store中的shippingaddress
  if (!['/address-list', '/goods', '/memo'].includes(path)) {
    addressStore.setShippingAddressList([])
  }
  next()
})

// 选择地址 要过滤掉已选的地址
const handleSelectAddress = () => {
  router.push({
    path: '/address-list',
    query: { sids: addressStore.shippingAddress.map((item) => item.id) },
  })
}

// 切换地址 过滤掉当前数据。需要回显
const handleEditAddress = (address) => {
  router.push({
    path: '/address-list',
    query: {
      sids: addressStore.shippingAddress
        .filter((item) => item.id != address.id)
        .map((item) => item.id),
      cid: address.id,
    },
  })
}

// 汇率信息
const getLastExchangeRate = async () => {
  const res = await balanceApi.getLastExchangeRate()

  if (res.code != 1) return

  balanceInfo.value = res.data
}

// 下单页有5个入口
// 1.购物车下单购买(传购物车选中数据ids)
// 2.询价单整单购买(传询价单id)
// 3.询价单勾选部分商品购买(选中商品ids)
// 4.需求单已生成后从订单确认点到前面两个tab(传需求单id) 小程序不存在这个了
// 5.已取消的需求单重新下单 旧的需求单id，去调用新接口
const getDetail = async () => {
  const {
    cart_ids = [],
    inquiry_sheet_id = '',
    inquiry_sheet_item_ids = [],
    purchase_order_id = '',
    entry = '',
  } = decryptedData.value
  let params = {}

  switch (+entry) {
    case 1:
      params = { cart_ids }
      break
    case 2:
      params = { inquiry_sheet_id }
      break
    case 3:
      params = { inquiry_sheet_item_ids }
      break
    case 4:
    case 5:
      params = { purchase_order_id }
      break
  }

  if (!Object.keys(params).length) {
    Notify({ type: 'danger', message: '路由参数错误' })
    return
  }

  const res =
    entry == 5
      ? await orderApi.getPurchaseOrderDetail(params)
      : await inquiryApi.getItemFromDifferentSource(params)

  console.log(res)

  if (res.code != 1) return

  const {
    address_data = [],
    item_data = [],
    inland_freight = 0,
    service_price = 0,
    total_price = 0,
    total_product_price = 0,
    pay_status = 0,
    order_status = 0,
  } = entry == 5 ? res.data : res.data.list

  setProducts(item_data)

  orderInfo.value = {
    inland_freight,
    service_price,
    total_price,
    total_product_price,
    pay_status,
    order_status,
  }

  // 重新下单的要获取地址信息
  entry == 5 && addressStore.setShippingAddressList(address_data)

  // 如果是新下单，则取默认地址
  if ( entry != 4 && entry != 5) {
    addressStore.fetchDefaultAddress()
  }
}

// 包装说明
const handleMemo = (item) => {
  router.push('/memo?id=' + item.id)
}

// 提交订单
const handleConfirm = async () => {
  if (!addressStore.shippingAddress.length) {
    Notify({ type: 'warning', message: t('checkout.onlyOneAddress') })
    return
  }

  const address_info = addressStore.shippingAddress.map((item) => {
    const { id, memo } = item
    return { id, memo: memo || '' }
  })

  const {
    cart_ids = [],
    inquiry_sheet_id = '',
    inquiry_sheet_item_ids = [],
    entry = '',
    purchase_order_id,
  } = decryptedData.value

  let res = null

  btnLoading.value = true

  switch (entry) {
    // 购物车下单
    case 1:
      res = await inquiryApi.saveFroCart({ cart_ids, address_info })
      break

    // 询价商品或者询价单整单下单
    case 2:
    case 3:
      res = await inquiryApi.addOrderByInquirySheet({
        inquiry_sheet_id,
        inquiry_sheet_item_ids,
        address_info,
      })
      break
    case 5:
      res = await orderApi.copyPurchaseOrder({
        purchase_order_id,
        address_info,
      })
      break
  }

  btnLoading.value = false

  if (!res || res.code !== 1) return

  const { id: order_id, order_no } = res.data

  // 提交成功后，跳转到确认订单页面
  const encrypted = encryptParams({
    purchase_order_id: order_id,
    order_no,
    entry: 4,
  })

  router.replace(`/confirm?query=${encodeURIComponent(encrypted)}`)
}

const init = () => {
  const encryptedData = route.query.query || ''
  // 解密后的传参
  decryptedData.value = encryptedData
    ? decryptParams(decodeURIComponent(encryptedData))
    : {}

  // 获取汇率
  getLastExchangeRate()
  // 获取订单金额等信息
  getDetail()
}

init()
</script>

<style lang="scss" scoped>
.view-cell {
  margin-top: 26px;
  padding: 18px 24px;
  background: #f4f4f4;
  border-radius: 12px;
  font-size: 26px;
  color: #373d49;
}
.icon-Edit {
  position: absolute;
  right: 48px;
  bottom: 0px;
  font-size: 38px;
}
.view-detail {
  padding: 24px 28px;
  border-radius: 12px;
  font-weight: 500;
  font-size: 30px;
  color: #212121;
}
</style>
