<template>
  <div class="flex flex-col h-full">
    <div class="nav-header mx-[32[x]] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]">
      <nav-bar />
    </div>

    <van-skeleton title row="6" :loading="loading">
      <div class="flex-1 px-[32px] overflow-y-auto">
        <div
          class="mb-4 bg-white rounded-[24px] p-[32px]"
          v-if="cartStore.items.length"
        >
          <!-- 全选 -->
          <van-checkbox
            v-model="checkAll"
            checked-color="#FF356D"
            @click="toggleAll"
            class="mb-[36px]"
          >
            全选
          </van-checkbox>

          <!-- 商品列表 -->
          <div class="good-item" v-for="item in cartStore.items" :key="item.id">
            <div class="flex items-start">
              <van-checkbox
                checked-color="#FF356D"
                :model-value="selectedRowKeys.includes(item.id)"
                @click="() => onSelectItem(item.id)"
                :name="item.id"
                class="mt-[90px]"
              />
              <div class="flex flex-col flex-1 ml-[32px] relative">
                <div class="flex gap-[24px]">
                  <img
                    :src="item.images.split(',')[0]"
                    class="w-[220px] h-[220px] rounded-[16px]"
                    v-if="item.images && item.images.length"
                  />
                  <img
                    src="@/assets/images/no-picture.png"
                    class="w-[220px] h-[220px] rounded-[16px]"
                    v-else
                  />

                  <div class="flex flex-col flex-1">
                    <p class="text-[26px] text-[#212121] pt-[10px]">
                      {{ item.product_name }}
                    </p>
                    <p class="text-[20px] text-[#515360] mt-[14px]">单价</p>
                    <p class="text-[28px] text-[#004CE0] font-bold">
                      {{ t('cart.price') }}{{ item.unit_price }}
                    </p>
                    <p class="text-[20px] text-[#515360] mt-[14px]">服务费</p>
                    <p class="text-[28px] text-[#A5A8B9] font-[500]">
                      {{ t('cart.price') }} &nbsp;￥{{
                        (
                          item.unit_price *
                          item.product_num *
                          item.service_ratio
                        ).toFixed(2)
                      }}
                    </p>
                  </div>
                </div>

                <van-stepper
                  class="mt-[28px]"
                  v-model="item.product_num"
                  :min="1"
                  @change="() => handleChangeQuantity(item)"
                />

                <div
                  class="absolute bottom-0 right-0 text-[#FF9090]"
                  @click="handleRemove(item.id)"
                >
                  <i class="iconfont icon-Delete remove-btn" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <van-empty v-else description="购物车没有商品啦，快去添加吧~" />
      </div>

      <div
        class="flex flex-col mx-[32px] px-[20px] py-[32px] z-50 bg-[#FFFFFF] rounded-t-xl shadow"
      >
        <p class="text-[#515360] text-[28px]">
          已选择, {{ selectedRowKeys.length }} 件商品
        </p>

        <div class="flex justify-between items-center my-[24px]">
          <span class="text-[#212121] text-[28px]">{{
            t('cart.estimatedTotal')
          }}</span>
          <span class="text-[#004CE0] text-[32px] font-[500]">
            {{ t('cart.price') }}{{ price }}
          </span>
        </div>
        <!-- 购买按钮 -->
        <van-button
          class="font-bold"
          color="#FF356D"
          round
          block
          size="large"
          @click="handleCheckout"
          :disabled="!selectedRowKeys.length || btnLoading"
        >
          {{ t('cart.checkout') }}
        </van-button>
      </div>
    </van-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCart } from '@/hooks/cart'
import { useCartStore } from '@/store/cart'
import { encryptParams } from '@/utils/encryption'
import { Dialog } from 'vant'

const { t } = useI18n()
const router = useRouter()
const {
  loading,
  selectedRowKeys,
  isAllSelected,
  initItems,
  toggleSelectAll,
  toggleSelect,
  updateQuantity,
  removeItem,
} = useCart()
const cartStore = useCartStore()

const checkAll = ref(false)
const btnLoading = ref(false)

// 预估金额
const price = computed(() => {
  // 选中的数据
  const selectedItems = cartStore.items.filter((item) =>
    selectedRowKeys.value.includes(item.id)
  )

  return selectedItems.reduce((acc, item) => {
    return (
      acc +
      item.unit_price * item.product_num +
      (item.unit_price * item.product_num * item.service_ratio || 0)
    )
  }, 0)
})

// 全选
const toggleAll = () => {
  toggleSelectAll(checkAll.value)
}

// 选中/取消
const onSelectItem = (id) => {
  toggleSelect(id)
  checkAll.value = isAllSelected.value
}

// 删除
const handleRemove = (id) => {
  Dialog.confirm({
    title: '提示',
    message: '确认移除该商品吗',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    confirmButtonColor: '#FF356D',
  })
    .then(() => {
      removeItem(id)
    })
    .catch(() => {
      // 用户点击取消，不做任何操作
    })
}

// 修改数量
const handleChangeQuantity = (item) => {
  const { id, product_num } = item

  updateQuantity(id, product_num)
}

// 购物车下单
const handleCheckout = () => {
  // 添加多个参数
  const encrypted = encryptParams({ cart_ids: selectedRowKeys.value, entry: 1 })

  router.push(`/shipping?query=${encodeURIComponent(encrypted)}`)
}

const init = async () => {
  await initItems(false, true)
  checkAll.value = isAllSelected
}

init()
</script>

<style scoped lang="scss">
.van-checkbox ::v-deep .van-badge__wrapper {
  border-radius: 10px !important;
}

.van-stepper {
  ::v-deep .van-stepper__minus,
  ::v-deep .van-stepper__plus {
    border-radius: 10px !important;

    &:before {
      width: 24px !important;
    }

    &:after {
      height: 24px !important;
    }
  }

  ::v-deep .van-stepper__input {
    background: #fff !important;
  }
}

.good-item {
  & + .good-item {
    padding-top: 32px;
    margin-top: 32px;
    border-top: 2px solid #f4f4f4;
  }

  .remove-btn {
    font-size: 40px;
  }
}
</style>
