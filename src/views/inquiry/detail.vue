<template>
  <div class="flex flex-col px-[32px] min-h-screen">
    <div class="nav-header px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]">
      <nav-bar />
    </div>

    <div class="flex-1 overflow-y-auto">
      <!-- Contact Section -->
      <div
        class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[32px] contact"
      >
        <h2 class="font-bold mb-2">在线咨询</h2>
        <div class="flex justify-center items-center gap-14">
          <div class="text-center">
            <i class="iconfont icon-telegram text-[#28A7E7]"></i>
          </div>
          <div class="text-center">
            <i class="iconfont icon-Phone text-[#FF356D]"></i>
          </div>
        </div>
      </div>

      <div class="mb-4 bg-white rounded-[24px] p-[32px]">
        <!-- 全选 -->
        <van-checkbox
          v-model="checkAll"
          checked-color="#FF356D"
          @change="toggleAll"
          class="mb-[36px]"
        >
          全选
        </van-checkbox>

        <!-- 商品列表 -->
        <div v-for="item in goodsList" :key="item.id">
          <div class="flex items-start">
            <van-checkbox
              checked-color="#FF356D"
              :model-value="selectedRowKeys.includes(item.id)"
              @change="onSelectItem(item.id)"
              :name="item.id"
              class="mt-1"
            />
            <div class="flex-1 ml-[32px]">
              <div class="flex justify-between items-center">
                <div class="font-bold text-[32px]">{{ item.product_name }}</div>
                <div class="text-[#2563eb] font-bold text-lg">
                  ¥{{ item.total_price }}
                </div>
              </div>
              <div class="flex justify-between items-center mt-2">
                <span class="text-[#515360] text-[28px]">购买数量</span>
                <span class="text-[#212121] text-[32px] font-bold">
                  {{ item.product_num }}
                </span>
              </div>

              <div class="flex justify-between items-center mt-1">
                <span class="text-[#515360] text-[28px]">单价</span>
                <span class="text-[#2563eb] text-[32px] font-bold">
                  ￥{{ item.unit_price }}
                </span>
              </div>

              <div class="flex justify-between items-center mt-1">
                <span class="text-[#515360] text-[28px]">货期</span>
                <span class="text-[#212121] text-[32px] font-bold">
                  {{ item.lead_time }} {{ t('inquiriesDetails.day') }}
                </span>
              </div>
            </div>
          </div>

          <van-cell
            class="view-cell"
            title="查看商品详情"
            is-link
            to="/goodsDetail"
          />
        </div>
      </div>

      <van-cell class="view-detail" title="详细" is-link to="/goodsDetail" />
    </div>

    <div
      class="flex justify-between items-center gap-[24px] px-[20px] py-[32px] z-50 bg-[#FFFFFF] rounded-t-xl shadow"
    >
      <!-- 购买按钮 -->
      <van-button
        class="flex-1 font-bold"
        color="#FF356D"
        round
        block
        size="large"
        @click="handleBuy"
      >
        直接购买
      </van-button>
      <!-- 购物车图标 -->
      <div class="relative">
        <van-badge :dot="cartCount > 0">
          <van-icon name="cart-o" size="28" />
        </van-badge>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import { inquiryApi } from '@/api'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const inquiry_sheet = ref({})
const selectedRowKeys = ref([])
const checkAll = ref(false)
const goodsList = ref([])
const loading = ref(false)
const cartCount = ref(0)

const id = computed(() => {
  return route.query.id || ''
})

const fetchInquiryDetail = async () => {
  loading.value = true

  const res = await inquiryApi.getMyInquiryDetail(id.value)

  loading.value = false

  if (res.code !== 1) return

  const { inquiry_sheet: inquiry, item_data } = res.data?.list || {}

  if (inquiry) {
    inquiry_sheet.value = inquiry
  }

  if (item_data) {
    const checkedIds = item_data
      .filter((item) => item.is_quotation)
      .map((item) => item.id)

    if (checkedIds.length && checkedIds.length == item_data.length)
      checkAll.value = true

    selectedRowKeys.value = checkedIds
    goodsList.value = item_data
  }
}

// 全选
const toggleAll = (val: boolean) => {
  checkAll.value = val
  selectedRowKeys.value = val
    ? goodsList.value.filter((item) => item.is_quotation).map((item) => item.id)
    : []
}

const onSelectItem = (id: number) => (checked: boolean) => {
  // 选中的id
  const newSelectedRowKeys = selectedRowKeys.value.includes(id)
    ? selectedRowKeys.value.filter((key) => key !== id)
    : [...selectedRowKeys.value, id]

  selectedRowKeys.value = newSelectedRowKeys
  checkAll.value = goodsList.value.every(({ id }) =>
    newSelectedRowKeys.includes(id)
  )
}

// 立即购买
const handleBuy = () => {}

fetchInquiryDetail()
</script>

<style scoped lang="scss">
.view-cell {
  margin-top: 26px;
  padding: 16px 24px;
  background: #f4f4f4;
  border-radius: 12px;
  font-size: 26px;
  color: #373d49;
}

.view-detail {
  margin-top: 26px;
  padding: 24px 28px;
  border-radius: 12px;
	font-weight: 500;
  font-size: 30px;
  color: #212121;
}

.contact > div > div {
  &:nth-child(1) {
    .iconfont {
      font-size: 64px;
    }
  }

  &:nth-child(2) {
    .iconfont {
      font-size: 54px;
    }
  }
}
</style>
