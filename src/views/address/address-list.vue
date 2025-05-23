<template>
  <div class="flex flex-col h-full">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />

      <div class="py-[24px] border-t border-[#F4F4F4]">
        <van-button
          plain
          color="#FF356D"
          round
          block
          size="small"
          @click="handleAddAddress"
        >
          <van-icon name="plus" />&nbsp;{{ t('address.add') }}
        </van-button>
      </div>
    </div>

    <van-skeleton clas="flex-1" title row="6" :loading="loading">
      <div class="flex-1 px-[32px] pb-[32px] overflow-y-auto">
        <!-- 地址列表 -->
        <div v-if="addressStore.addressList.length" class="space-y-4">
          <div
            v-for="address in addressStore.addressList"
            :key="address.id"
            class="relative bg-white rounded-[14px] p-[24px] shadow-sm overflow-hidden border-2 border-transparent"
            :class="{
              '!border-[#FF356D]': address.active,
            }"
            @click="addressStore.toggleAddressActive(address.id)"
          >
            <!-- 默认地址标签 -->
            <div
              v-if="address.is_default"
              class="absolute left-0 top-0 bg-[#FFF1E5] text-[#FF8A21] text-[24px] px-[18px] py-[18px] rounded-br-[14px] leading-[1]"
              style="z-index: 2"
            >
              {{ t('address.default') }}
            </div>
            <p
              class="text-[#212121] text-[30px] font-[500]"
              :class="{ 'mt-[50px]': address.is_default }"
            >
              {{ address.name }}
            </p>
            <p class="text-[#212121] text-[28px]">
              {{ address.country_name }} &nbsp;
              {{ address.province_name }} &nbsp; {{ address.city_name }} &nbsp;
              {{ address.detail_address }}&nbsp;
              <span v-if="address.landline_num">{{
                address.landline_num
              }}</span>
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
        </div>

        <!-- 空状态 -->
        <van-empty v-else :description="t('no data')" />
      </div>

      <!-- 添加地址按钮 -->
      <div
        class="px-[20px] mx-[32px] py-[32px] z-50 bg-[#FFFFFF] rounded-t-xl shadow"
      >
        <van-button
          class="font-bold"
          color="#FF356D"
          round
          block
          size="large"
          @click="handleSelectAddress"
        >
          {{ t('resetPassword.confirm') }}
        </van-button>
      </div>
    </van-skeleton>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/nav-bar/index.vue'
import { useAddressStore } from '@/store/address'
import { Notify } from 'vant'
import { computed, ref } from 'vue'
import { formattedPhone } from '@/utils/format'
import { useI18n } from '../../hooks/useI18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const addressStore = useAddressStore()
const loading = ref(false)

// 已经选择过的id
const existIds = computed(() => {
  const sids = route.query.sids
  if (!sids) return []
  return Array.isArray(sids) ? sids : [sids]
})

// 当前要编辑的id
const selectId = computed(() => {
  return route.query.cid || ''
})

// 添加新地址
const handleAddAddress = () => {
  router.push('/edit-address')
}

const handleEditAddress = (address: any) => {
  router.push({ path: '/edit-address', query: { id: address.id } })
}

// 选择地址
const handleSelectAddress = () => {
  const selected_list = addressStore.addressList.filter(
    (address) => address.active
  )
  if (!selected_list.length || selected_list.length > 1) {
    Notify({ type: 'warning', message: t('checkout.onlyOneAddress') })
    return
  }

  const selected_address = selected_list[0]
  addressStore.setAddress(selected_address, selectId.value)
  router.back()
}

const init = async () => {
  loading.value = true
  // 获取地址列表
  await addressStore.fetchAddressList(existIds.value, selectId.value)

  loading.value = false
}

init()
</script>

<style scoped>
.icon-Edit {
  position: absolute;
  right: 48px;
  bottom: 24px;
  font-size: 38px;
}
</style>
