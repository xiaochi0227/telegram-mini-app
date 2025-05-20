<template>
  <div class="flex flex-col h-full overflow-y-auto">
    <van-sticky>
      <div
        class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
      >
        <nav-bar />
      </div>
    </van-sticky>

    <div class="w-full px-[32px] mt-16">
      <div
        class="flex justify-center items-center bg-[#EDEDED] p-[4px] rounded-full h-[96px] text-[28px] text-[#666666]"
      >
        <div
          class="px-4 flex-1 rounded-full account-tab"
          v-for="(item, index) in tabs"
          :key="index"
          :class="{ active: active == item.value }"
          @click="active = item.value"
        >
          <span class="whitespace-nowrap">{{ item.name }}</span>
        </div>
      </div>
      <van-form @submit="onLogin">
        <phone-input v-model="form.phone" v-if="active == '2'" class="mb-4" />

        <van-field
          v-else
          v-model="form.email"
          name="email"
          type="email"
          :placeholder="t('inquiry.emailPlaceholder')"
          :rules="[
            { required: true, message: t('inquiry.emailPlaceholder') },
            {
              pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: t('login.registerEmailInvalid'),
            },
          ]"
          class="mb-4"
        />
        <van-field
          v-model="form.password"
          name="password"
          :placeholder="t('login.passwordPlaceholder')"
          :type="showPassword ? 'text' : 'password'"
          :rules="[{ required: true, message: t('login.passwordPlaceholder') }]"
          class="mb-10"
          :right-icon="showPassword ? 'eye-o' : 'closed-eye'"
          @click-right-icon="showPassword = !showPassword"
        />
        <van-button
          round
          block
          color="#FF356D"
          size="large"
          type="primary"
          native-type="submit"
        >
          {{ t('login.title') }}
        </van-button>
      </van-form>
      <div class="text-center mt-4 text-gray-400 text-[24px] text-[#B3B3B3]">
        {{ t('login.hasNoAccount') }}
        <span class="text-[#FF8A21] cursor-pointer" @click="onRegister">
          {{ t('login.regNow') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import PhoneInput from '@/components/phone-input/index.vue'
import { ref, reactive } from 'vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUser } from '@/hooks/user'

const router = useRouter()
const { t } = useI18n()
const { login } = useUser()

const showPassword = ref(false)
const active = ref('2')
const tabs = ref([
  { name: t('login.registerPhone'), value: '2' },
  { name: t('login.registerEmail'), value: '1' },
])
const loading = ref(false)

const form = ref({
  phone: '',
  email: '',
  password: '',
})

const onLogin = async () => {
  const { phone, email, password } = form.value
  const params = {
    account_type: active.value,
    password,
    country_code: active.value == 2 ? '7' : '',
    username: active.value == 2 ? phone : email,
  }

  loading.value = true

  const res = await login(params)

  loading.value = false

  if (res.code != 1) return 

  // 登录逻辑
  Toast(t('login.loginSuccess'))
  router.back()
}

function onRegister() {
  // 跳转到注册页
  router.push('/register')
}
</script>

<style scoped lang="scss">
.account-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;

  &.active {
    background-color: #fff;
  }
}

.van-form {
  padding-top: 40px;

  :deep(.van-cell) {
    padding: 0;
    background: transparent;

    &:after {
      display: none;
    }

    .van-field__body {
      padding: 0 30px;
      height: 90px;
      background: #ffffff;
      border-radius: 16px;
      border: 2px solid #ededed;
    }

    .van-field__error-message {
      margin-top: 10px;
    }
  }
}
</style>
