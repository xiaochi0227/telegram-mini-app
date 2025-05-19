<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>

    <div
      class="flex flex-col gap-1 mx-[32px] px-[24px] py-[36px] bg-white rounded-[12px] shadow-sm text-[28px] font-[600]"
    >
      <span>{{ t('payment.exchangeBalance') }}</span>
      <div class="flex justify-between items-center mt-2">
        <span class="text-[#515360] font-[400]">USD</span>
        <span>$&nbsp; {{ balance.usd_balance }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-[#515360] font-[400]">CNY</span>
        <span>￥{{ balance.rmb_balance }}</span>
      </div>
    </div>

    <div
      class="flex flex-col gap-[24px] mt-3 mx-[32px] px-[24px] py-[36px] bg-white rounded-[12px] shadow-sm text-[28px] font-[600]"
    >
      <div class="flex justify-between items-center">
        <span>{{ t('payment.exchangeType') }}</span>
        <span>{{ t('payment.exchangeCurrency') }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span>{{ t('payment.exchangeRate') }}</span>
        <span>{{ balance.rmb_to_usd_rate }}</span>
      </div>
    </div>

    <van-form
      class="flex-1 flex flex-col overflow-hidden mt-3 relative"
      ref="formRef"
    >
      <div
        class="flex flex-col gap-4 mx-[32px] px-[24px] py-[36px] bg-white rounded-[12px] shadow-sm text-[28px] font-[600]"
      >
        <div class="flex justify-between items-center">
          <span>{{ t('payment.exchangeMoneny') }}</span>

          <van-field
            v-model="form.change_num"
            type="number"
            label="USD"
            class="mb-2 change-input"
            @update:model-value="formatDecimal"
            :rules="rules.change_num"
          />
        </div>
        <div class="flex justify-between items-center" v-if="price">
          <span>CNY</span>
          <span>￥{{ price }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-4 mt-3 mx-[32px]">
        <PasswordInput
          v-model="form.pay_password"
					ref="passwordInput"
          :auto-submit="false"
          @submit="handleSubmit"
          title="支付密码"
        />
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import PasswordInput from '@/components/PasswordInput/index.vue'
import { useOrderStore } from '@/store/order'
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { inquiryApi } from '@/api'
import { Notify, FormInstance } from 'vant'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const { balance } = useOrderStore()
const router = useRouter()

const price = computed(() => {
  const { change_num } = form.value
  const { rmb_to_usd_rate } = balance

  if (!change_num || !rmb_to_usd_rate) return

  const numValue = Number.parseFloat(change_num)

  return (numValue * rmb_to_usd_rate).toFixed(2)
})

const form = ref({})
const formRef = ref<FormInstance>()
const passwordInput = ref()
const rules = reactive({
  change_num: [
    { required: true, message: t('payment.exchangeEnter') },
    {
      pattern: /^\d+(\.\d{0,2})?$/,
      message: t('payment.exchangeInvalid'),
    },
    {
      validator: (val) => {
        return val && +val > 0
      },
      message: t('payment.exchangeGreaterThanZero'),
    },
  ],
  pay_password: [
    { required: true, message: t('payment.enterPayPassword') },
    { min: 6, message: t('payment.exchangeLimit') },
  ],
})

const formatDecimal = (value) => {
  // 1. 过滤非数字和小数点
  let filtered = value.replace(/[^\d.]/g, '')

  // 2. 避免多个小数点
  filtered = filtered.replace(/(\..*)\./g, '$1')

  // 3. 限制小数点后两位
  if (filtered.includes('.')) {
    const parts = filtered.split('.')
    if (parts[1].length > 2) {
      filtered = `${parts[0]}.${parts[1].slice(0, 2)}`
    }
  }

  if (filtered && +filtered > +balance.usd_balance) {
    filtered = balance.usd_balance
  }

  form.value.change_num = filtered
}

const validateForm = async () => {
  try {
    await formRef.value?.validate()
    return true // 明确返回 true
  } catch (error) {
    console.log('验证失败', error)
    return false // 明确返回 false
  }
}

const handleSubmit = async () => {
  console.log(11)
  const valid = await validateForm()

  if (!valid) return

  const params = { ...form.value, change_type: 1 }

  const res = await inquiryApi.exchangeCurrency(params)

  if (res.code != 1) {
		// 调用passwordinpupt的clearPassword方法
		passwordInput.value.clearPassword()
		return 
	} 

  Notify({ type: 'success', message: '兑换成功' })
  router.back()
}
</script>
<style lang="scss" scoped>
.change-input {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  width: 300px;

  :deep(.van-field__label) {
    width: auto;
  }

  :deep(.van-field__value) {
    width: 200px;

    .van-field__body {
      width: 100%;
      padding: 0 10px;
      height: 60px;
      border: 1px solid #f4f4f4;
      border-radius: 12px;

      input {
        text-align: right;
      }
    }

    .van-field__error-message {
      margin-top: 10px;
    }
  }
}
</style>
