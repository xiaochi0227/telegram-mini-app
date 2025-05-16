<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>

    <van-form
      class="flex-1 flex flex-col overflow-hidden"
      @submit="onSubmit"
      ref="formRef"
    >
      <div class="flex-1 px-[32px] overflow-y-auto">
        <van-field
          :model-value="form.country_name"
          is-link
          readonly
          label="国家"
          :placeholder="t('address.select') + t('address.country')"
          @click="showCountry = true"
          :rules="rules.country_id"
          class="mb-2"
        />

        <van-popup v-model:show="showCountry" position="bottom" round>
          <van-picker
            :columns="countries"
            value-key="name"
            @confirm="onCountryConfirm"
            @cancel="showCountry = false"
          />
        </van-popup>

        <van-field
          :model-value="form.province_name"
          is-link
          readonly
          :label="t('address.province')"
          :placeholder="t('address.select') + t('address.province')"
          :rules="rules.province_id"
          @click="
            () => {
              form.country_id && (showProvince = true)
            }
          "
          class="mb-2"
          :class="{ disabled: !form.country_id }"
        />

        <van-popup v-model:show="showProvince" position="bottom" round>
          <van-picker
            :columns="provinces"
            value-key="name"
            @confirm="onProvinceConfirm"
            @cancel="showProvince = false"
          />
        </van-popup>

        <van-field
          :model-value="form.city_name"
          is-link
          readonly
          :label="t('address.city')"
          :placeholder="t('address.select') + t('address.city')"
          :rules="rules.city_id"
          @click="
            () => {
              form.province_id && (showCity = true)
            }
          "
          class="mb-2"
          :class="{ disabled: !form.province_id }"
        />

        <van-popup v-model:show="showCity" position="bottom" round>
          <van-picker
            :columns="cities"
            value-key="name"
            @confirm="onCityConfirm"
            @cancel="showCity = false"
          />
        </van-popup>

        <van-field
          v-model="form.detail_address"
          :label="t('address.address')"
          :placeholder="t('address.addressPlaceholder')"
          :rules="rules.detail_address"
          class="mb-2"
        />

        <van-field
          v-model="form.postal_code"
          :label="t('address.postcode')"
          :placeholder="t('address.postcodePlaceholder')"
          :rules="rules.postal_code"
          class="mb-2"
        />

        <van-field
          v-model="form.name"
          :label="t('address.recipientName')"
          :placeholder="t('address.recipientName')"
          :rules="rules.name"
          class="mb-2"
        />

        <phone-input v-model="form.phone_num" :label="t('address.phone')" />

        <van-field
          v-model="form.landline_num"
          :label="t('address.recipientPhone')"
          :placeholder="t('address.recipientPhonePlaceholder')"
          class="mb-2 no-required"
        />
        <div class="flex items-center mb-4 pl-2">
          <van-checkbox
            v-model="form.is_default"
            checked-color="#FF356D"
            class="mr-2"
          />
          <span class="text-[#515360] text-[24px]">{{
            t('address.setDefault')
          }}</span>
        </div>
      </div>

      <!-- 添加地址按钮 -->
      <div
        class="mx-[32px] px-[20px] py-[32px] z-50 bg-[#FFFFFF] rounded-t-xl shadow"
      >
        <van-button
          native-type="submit"
          class="font-bold"
          color="#FF356D"
          round
          block
          size="large"
          :disabled="btnLoading"
        >
          确认
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import PhoneInput from '@/components/phone-input/index.vue'
import { useRegion } from '@/hooks/useRegion'
import { useI18n } from 'vue-i18n'
import { Notify } from 'vant'
import { addressApi } from '@/api'
import { useRoute, useRouter } from 'vue-router'
import { useAddressStore } from '@/store/address'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const addressStore = useAddressStore()

// 编辑id
const id = computed(() => {
  return route.query.id || ''
})

const formRef = ref(null)
const showCountry = ref(false)
const showProvince = ref(false)
const showCity = ref(false)

const {
  countries,
  provinces,
  cities,
  getRegionName,
  fetchCountries,
  fetchProvinces,
  fetchCities,
} = useRegion()

const form = ref({})
const btnLoading = ref(false)
// 初始化表单数据
const initForm = (data = {}) => {
  const {
    name = '',
    country_id = '',
    country_name = '',
    country_code = '7',
    province_id = '',
    province_name = '',
    city_id = '',
    city_name = '',
    detail_address = '',
    landline_num = '',
    phone_num = '',
    postal_code = '',
    is_default = false,
  } = data || {}

  form.value = {
    id: id.value,
    name,
    country_id,
    country_name,
    country_code,
    province_id,
    province_name,
    city_id,
    city_name,
    detail_address,
    landline_num,
    phone_num,
    postal_code,
    is_default,
  }
}

// 表单校验规则
const rules = {
  country_id: [
    { required: true, message: t('address.select') + t('address.country') },
  ],
  province_id: [
    { required: true, message: t('address.select') + t('address.province') },
  ],
  city_id: [
    { required: true, message: t('address.select') + t('address.city') },
  ],
  detail_address: [
    { required: true, message: t('address.addressPlaceholder') },
  ],
  postal_code: [
    { required: true, message: t('address.postcodePlaceholder') },
    {
      pattern: /^\d{6}$/,
      message: t('address.postcodePlaceholder'),
    },
  ],
  name: [{ required: true, message: t('address.recipientName') }],
}

function onCountryConfirm({ id, name }) {
  form.value.country_id = id
  form.value.country_name = name
  form.value.province_id = ''
  form.value.province_name = ''
  form.value.city_id = ''
  form.value.city_name = ''
  fetchProvinces(id)
  showCountry.value = false
}

function onProvinceConfirm({ id, name }) {
  form.value.province_id = id
  form.value.province_name = name
  form.value.city_id = ''
  form.value.city_name = ''
  fetchCities(id)
  showProvince.value = false
}

function onCityConfirm({ id, name }) {
  form.value.city_id = id
  form.value.city_name = name
  showCity.value = false
}

const onSubmit = async (values) => {
  const params = { ...form.value }

  btnLoading.value = true
  const res = form.value.id
    ? await addressApi.editAddress(params)
    : await addressApi.addAddress(params)

  btnLoading.value = false

  if (res.code != 1) return
  router.back()
}

onMounted(() => {
  fetchCountries()

  const current = addressStore.addressList.find((item) => item.id == id.value)
  initForm(current)

  if (current) {
    const { country_id, province_id } = current

    fetchProvinces(country_id)
    fetchCities(province_id)
  }
})
</script>

<style scoped lang="scss">
.van-checkbox ::v-deep .van-badge__wrapper {
  border-radius: 10px !important;
}
.van-field {
  position: relative;
  display: flex;
  flex-direction: column;
  background: transparent;

  &:after {
    display: none;
  }

  :deep(.van-cell__title) {
    font-size: 28px;
    color: #212121;
    font-weight: 500;

    &::before {
      content: '*';
      color: #ff356d;
      margin-right: 4px;
    }
  }

  &.no-required :deep(.van-cell__title::before) {
    display: none !important;
  }

  :deep(.van-field__body) {
    margin: 16px 0;
    padding: 0 20px;
    height: 88px;
    background: #ffffff;
    border-radius: 20px;
    border: 2px solid #e6e7e9;
  }

  :deep(.van-icon-arrow) {
    position: absolute;
    right: 30px;
    top: 86px;
    font-size: 30px;
  }

  &.disabled :deep(.van-field__body) {
    background: #f4f4f4;
  }
}
</style>
