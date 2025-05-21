<template>
  <div class="flex flex-col h-full overflow-y-auto">
    <van-sticky>
      <div class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]">
        <nav-bar />
      </div>
    </van-sticky>

    <van-skeleton title row="6" :loading="loading">
      <div class="flex-1 px-[32px] pb-4 overflow-y-auto">
        <!-- Contact Section -->
        <div
          class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[32px] contact"
        >
          <h2 class="font-bold mb-2">{{ t('footer.online') }}</h2>
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
            @click="toggleAll"
            class="mb-[36px]"
          >
            {{ t('cart.selectAll') }}
          </van-checkbox>

          <!-- 商品列表 -->
          <div class="good-item" v-for="item in goodsList" :key="item.id">
            <div class="flex items-start">
              <van-checkbox
                checked-color="#FF356D"
                :model-value="selectedRowKeys.includes(item.id)"
                @click="() => onSelectItem(item)"
                :name="item.id"
                class="mt-1"
              />
              <div class="flex-1 ml-[32px]">
                <div class="flex justify-between items-center">
                  <div class="font-bold text-[32px]">
                    {{ item.product_name }}
                  </div>
                  <div class="text-[#2563eb] font-bold text-lg">
                    ¥{{ item.total_price }}
                  </div>
                </div>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-[#515360] text-[28px]">{{ t('inquiriesDetails.quantity') }}</span>
                  <span class="text-[#212121] text-[32px] font-bold">
                    {{ item.product_num }}
                  </span>
                </div>

                <div class="flex justify-between items-center mt-1">
                  <span class="text-[#515360] text-[28px]">{{
                    t('inquiriesDetails.unitPprice')
                  }}</span>
                  <span class="text-[#2563eb] text-[32px] font-bold">
                    ￥{{ item.unit_price }}
                  </span>
                </div>

                <div class="flex justify-between items-center mt-1">
                  <span class="text-[#515360] text-[28px]">{{
                    t('inquiriesDetails.deliveryDate')
                  }}</span>
                  <span class="text-[#212121] text-[32px] font-bold">
                    {{ item.lead_time }} {{ t('inquiriesDetails.day') }}
                  </span>
                </div>
              </div>
            </div>

            <van-cell
              class="view-cell"
              :title="t('order.viewGoodsDetail')"
              is-link
              @click="handleViewGoodsDetail(item)"
            />
          </div>
        </div>

        <van-cell
          class="view-detail"
          :title="t('viewDetail')"
          is-link
          to="/account/inquiry-info"
        />
      </div>

      <div
        class="flex justify-between items-center mx-[32px] gap-[24px] px-[20px] py-[32px] z-50 bg-[#FFFFFF] rounded-t-xl shadow"
      >
        <!-- 购买按钮 -->
        <van-button
          class="flex-1 font-bold"
          color="#FF356D"
          round
          block
          size="large"
          @click="handleBuy"
          :disabled="!selectedRowKeys.length || btnLoading"
        >
          {{ t('inquiriesDetails.placeOrder') }}
        </van-button>
        <van-button
          class="flex-1 font-bold"
          color="#FF356D"
          plain
          round
          block
          size="large"
          @click="handleAddCart"
          :disabled="!selectedRowKeys.length || btnLoading"
        >
          {{ t('inquiriesDetails.addCart') }}
        </van-button>
      </div>
    </van-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import { carApi, inquiryApi } from '@/api'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { encryptParams } from '@/utils/encryption'
import { Notify } from 'vant'
import { useInquiryStore } from '@/store/inquiry'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { setGood, setInquiry } = useInquiryStore()

const selectedRowKeys = ref<number[]>([])
const checkAll = ref(false)
const goodsList = ref<any[]>([])
const loading = ref(false)
const btnLoading = ref(false)

const id = computed(() => {
  return route.query.id || ''
})

const fetchInquiryDetail = async () => {
  loading.value = true

  const res = await inquiryApi.getMyInquiryDetail(id.value)

  loading.value = false

  if (res.code !== 1) return

  const { inquiry_sheet, item_data } = res.data?.list || {}

  if (inquiry_sheet) {
    setInquiry(inquiry_sheet)
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

// 获取提交参数
const getPostParams = () => {
  if (!id.value) {
    return
  }

  if (!selectedRowKeys.value.length) {
    return
  }

  const params = {
    inquiry_sheet_id: id.value,
    inquiry_sheet_item_ids: selectedRowKeys.value,
  }

  return params
}

// 全选
const toggleAll = () => {
  selectedRowKeys.value = checkAll.value
    ? goodsList.value.filter((item) => item.is_quotation).map((item) => item.id)
    : []
}

const onSelectItem = (item) => {
  const { id, is_quotation } = item

  // 未报价
  if (!is_quotation) return

  if (selectedRowKeys.value.includes(id)) {
    const idx = selectedRowKeys.value.indexOf(id)
    if (idx > -1) {
      selectedRowKeys.value.splice(idx, 1)
    }
  } else {
    selectedRowKeys.value.push(id)
  }

  checkAll.value = goodsList.value
    .filter((item) => item.is_quotation)
    .every((item) => selectedRowKeys.value.includes(item.id))
}

// 商品信息
const handleViewGoodsDetail = (item) => {
  setGood(item)
  router.push({
    path: '/account/goods-detail',
  })
}

// 加入购物车
const handleAddCart = async () => {
  const params = getPostParams()

  // 如果没选择商品，则不提交
  if (!params) return

  btnLoading.value = true

  const res = await carApi.addCart(params)

  if (res.code != 1) return

  Notify({ type: 'success', message: t('inquiriesDetails.addCartSuccess') })
  router.push('/cart')
}

// 立即购买
const handleBuy = () => {
  const params = getPostParams()

  // 如果没选择商品，则不提交
  if (!params) return

  btnLoading.value = true

  // 添加多个参数
  const encrypted = encryptParams({ ...params, entry: 3 })

  router.push(`/shipping?query=${encodeURIComponent(encrypted)}`)
}

fetchInquiryDetail()
</script>

<style scoped lang="scss">
.van-checkbox ::v-deep .van-badge__wrapper {
  border-radius: 10px !important;
}

.good-item {
  & + .good-item {
    padding-top: 32px;
    margin-top: 32px;
    border-top: 2px solid #f4f4f4;
  }
}

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
