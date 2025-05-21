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
      <van-form @submit="onRegister">
        <phone-input v-model="form.username" class="mb-4" />

        <van-field
          v-model="form.ver_code"
          name="ver_code"
          :placeholder="t('login.captchaPlaceholder')"
          :rules="[{ required: true, message: t('login.captchaPlaceholder') }]"
          class="mb-4 send-btn"
        >
          <template #button>
            <div class="flex justify-center items-center h-full px-[30px]">
              <i class="iconfont icon-telegram text-[#28A7E7]" v-if="countdown == 0"></i>
              <van-button
                size="small"
                type="primary"
                :disabled="countdown > 0"
                @click="sendCode"
              >
                {{ countdown > 0 ? `${countdown}s后重试` : t('login.getVerificationCode') }}
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
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUser } from '@/hooks/user'

const router = useRouter()
const { t } = useI18n()
const { register } = useUser()

const showPassword = ref(false)
const loading = ref(false)

const form = ref({
  account_type: 2,
  country_code: 7,
  username: '',
  password: '',
  ver_code: '', // 新增
})

const countdown = ref(0)
let timer: any = null
const agree = ref(false)

const sendCode = async () => {
  if (!form.value.username) {
    Toast(t('reg.phoneRequired'))
    return
  }
  // 这里调用发送验证码的接口
  // await apiSendCode(form.value.username)
  Toast(t('login.codeSent'))
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
    Toast(t('login.agreementRequired'))
    return
  }

  loading.value = true

  const res = await register({ ...form.value })

  loading.value = false

  if (res.code != 1) return

  // 登录逻辑
  Toast(t('login.registerSuc'))
  router.back()
}

function onLogin() {
  // 跳转到注册页
  router.replace('/login')
}
</script>

<style scoped lang="scss">
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
