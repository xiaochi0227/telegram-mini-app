<template>
  <div class="flex flex-col px-[32px] h-[100vh] overflow-hidden">
    <div class="nav-header px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]">
      <nav-bar />
    </div>

    <div class="bg-[#fff] py-[28px] px-[20px] rounded-[12px] shadow-sm">
      <van-form @submit="onSubmit">
        <van-field
          v-model="memo"
          type="textarea"
          placeholder="您可以在此输入您对包装与配送的需求"
          :rows="16"
          :maxlength="2000"
          class="mb-4"
          :rules="[{ required: true, message: '请输入备注信息' }]"
        />

        <!-- 下单 -->
        <van-button
          class="font-bold"
          color="#FF356D"
          round
          block
          size="large"
          native-type="submit"
        >
          {{ t('resetPassword.confirm') }}
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/nav-bar/index.vue'
import { useI18n } from '@/hooks/useI18n'
import { useAddressStore } from '@/store/address'
import type { Address } from '@/api/types'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const addressStore = useAddressStore()

const id = computed(() => {
	return route.query.id as number || ''
})

// 从store中获取当前地址的memo
const currentAddress = computed(() => {
	return addressStore.shippingAddress.find((addr: Address) => addr.id == id.value)
})

const memo = ref(currentAddress.value?.memo || '')

// 提交表单
const onSubmit = () => {
	// 使用store的updateAddressMemo方法更新memo
	if (id.value) {
		addressStore.updateAddressMemo(id.value, memo.value)
	}
	router.back()
}
</script>

<style scoped lang="scss">
:deep(.van-field__body) {
	padding: 20px;
	line-height: 1.4;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
}

.van-cell {
  &:after {
    display: none;
  }

	:deep(.van-field__error-message) {
		margin-top: 10px;
	}
}
</style>
