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

      <van-form @submit="onRegister">
        <phone-input
          v-model="form.phone"
          class="mb-4"
          v-if="active == '2'"
        />

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
          v-model="form.ver_code"
          name="ver_code"
          :placeholder="t('login.captchaPlaceholder')"
          :rules="[{ required: true, message: t('login.captchaPlaceholder') }]"
          class="mb-4 send-btn"
        >
          <template #button>
            <div class="flex justify-center items-center h-full px-[30px]">
              <van-button
                size="small"
                type="primary"
                :disabled="sending || countdown > 0"
                @click="sendCode"
              >
                {{
                  countdown > 0
                    ? t('login.tryAgin', { time: countdown })
                    : t('login.getVerificationCode')
                }}
              </van-button>
            </div>
          </template>
        </van-field>

        <van-field
          v-model="form.password"
          name="password"
          :placeholder="t('login.passwordPlaceholder')"
          :type="showPassword ? 'text' : 'password'"
          :rules="[{ required: true, message: t('login.passwordPlaceholder') }]"
          class="mb-4"
          :right-icon="showPassword ? 'eye-o' : 'closed-eye'"
          @click-right-icon="showPassword = !showPassword"
        />
        <van-checkbox
          v-model="agree"
          class="mb-8"
          shape="square"
          :checked-color="'#FF356D'"
        >
          <span class="text-[#B3B3B3] text-[24px]">
            {{ t('login.agreement') }}
            <span
              class="text-[#FF356D] underline cursor-pointer"
              @click.stop="openUserAgreement"
            >
              {{ t('login.agreementLink') }}
            </span>
            {{ t('login.and') }}
            <span
              class="text-[#FF356D] underline cursor-pointer"
              @click.stop="openPrivacyPolicy"
            >
              {{ t('login.privacyLink') }}
            </span>
          </span>
        </van-checkbox>
        <van-button
          round
          block
          color="#FF356D"
          size="large"
          type="primary"
          native-type="submit"
          :disabled="disabled"
          :loading="loading"
        >
          {{ t('login.registerButton') }}
        </van-button>
      </van-form>

      <div class="text-center mt-4 text-gray-400 text-[24px] text-[#B3B3B3]">
        {{ t('login.hasAccount') }}
        <span class="text-[#FF8A21] cursor-pointer" @click="onLogin">
          {{ t('login.loginNow') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import PhoneInput from '@/components/phone-input/index.vue'
import { ref } from 'vue'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useH5User } from '@/hooks/h5User'

const router = useRouter()
const { t } = useI18n()
const { register, getVerificationCode } = useH5User()

const active = ref('2')
const tabs = ref([
  { name: t('login.registerPhone'), value: '2' },
  { name: t('login.registerEmail'), value: '1' },
])
const showPassword = ref(false)
const loading = ref(false)
const disabled = ref(false)

const form = ref({
  account_type: 2,
  country_code: '7',
  phone: '',
  email: '',
  password: '',
  ver_code: '', // 新增
})

const countdown = ref(0)
let timer: any = null
const agree = ref(false)
const sending = ref(false)

const sendCode = async () => {
  const { phone, email } = form.value
  const username = active.value == 2 ? phone : email

  if (!username) {
    Notify({ type: 'danger', message: active.value == 2 ? t('reg.phoneRequired'): t('login.emailRequired') })
    return
  }

  sending.value = true
  // 这里调用发送验证码的接口
  const res = await getVerificationCode({
    username,
    country_code: '7',
    type: 1,
  }, active.value)

  sending.value = false

  if (!res) return

  Notify({ type: 'success', message: t('login.codeSent') })
  countdown.value = 60
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

function openUserAgreement() {
  router.push('/userAgreement')
}
function openPrivacyPolicy() {
  router.push('/privacyPolicy')
}

const onRegister = async () => {
  if (!agree.value) {
    Notify({ type: 'danger', message: t('login.agreementRequired') })
    return
  }

  loading.value = true

  const res = await register({ ...form.value })

  loading.value = false

  if (!res) return

  Notify({ type: 'success', message: t('login.registerSuc') })
  router.replace('/')
}

function onLogin() {
  // 跳转到注册页
  router.replace('/h5-login')
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

    &.send-btn {
      .van-field__button {
        margin-right: -30px;
        height: 100%;
        background: #fff4eb;

        .iconfont {
          font-size: 40px;
        }

        .van-button {
          height: 100%;
          background: transparent;
          border: none;
          color: #333333;
          font-size: 28px;
        }
      }
    }

    .van-field__error-message {
      margin-top: 10px;
    }
  }
}
.van-checkbox ::v-deep .van-badge__wrapper {
  border-radius: 10px !important;
}
</style>
