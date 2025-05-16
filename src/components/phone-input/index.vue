<template>
  <van-field
    v-model="phone"
    placeholder="请输入手机号码"
    maxlength="13"
    class="phone-input"
    :formatter="formatterNumber"
    :rules="[
      { required: true, message: '请输入手机号' },
      { validator: validatePhone, message: '请输入正确的手机号' }
    ]"
  >
    <template #button>
      <span class="country-code">+{{ countryCode }}</span>
    </template>
  </van-field>
</template>
<script setup lang="ts">
import { computed, withDefaults, defineProps, defineEmits } from 'vue'

interface Props {
  countryCode?: string
  modelValue: string
  onChange?: (value: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  countryCode: '7',
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const phone = computed({
  get() {
    return formatterNumber(props.modelValue)
  },
  set(v: string) {
    const unformattedValue = parserNumber(v)
    emit('update:modelValue', unformattedValue)
    emit('change', unformattedValue)
  },
})

const checkNumber = (value: string): RegExpMatchArray | null => {
  const numbers = value.replace(/\D/g, '')
  const trimmed = numbers.slice(0, 10)
  const groups = trimmed.match(/^(\d{1,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)

  return groups
}

const formatterNumber = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  const groups = checkNumber(numbers)

  if (!groups) return ''

  return groups.slice(1).filter(Boolean).join(' ')
}

const parserNumber = (value: string) => {
  return value.replace(/\D/g, '')
}

const validatePhone = (value: string) => {
  const unformattedValue = parserNumber(value)
  return /^\d{10}$/.test(unformattedValue)
}
</script>

<style lang="scss" scoped>
.phone-input {
  :deep(.van-field__body) {
    display: flex;
    flex-flow: row-reverse;
  }

  .country-code {
    padding-right: 14px;
    color: #212121;
  }
}
</style>
