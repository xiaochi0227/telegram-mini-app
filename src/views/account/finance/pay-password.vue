<template>
  <div class="mx-[1rem]" v-loading="isLoading">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <PasswordInput v-model="password" @complete="handleComplete" :title="currentTitle"
      :error="error" :errorMessage="errorMessage" ref="pwsInput" v-if="!success" />
    <div class="flex justify-center items-center bg-white rounded-[24px] h-[400px] mt-[24px] flex-col" v-if="success">
      <van-icon name="passed" size="64px"  color="#FF356D"/>
      <div class="text-[#212121] text-[40px] font-bold mt-[40px]">{{ successText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue';
import PasswordInput from '@/components/PasswordInput/index.vue';
import { ref, computed } from 'vue';
import { balanceApi } from '@/api'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const pwsInput = ref<InstanceType<typeof PasswordInput> | null>(null);
const isLoading = ref(true)
const hasPayPassword = ref(false);
const success = ref(false);
const password = ref('');
const error = ref(false);
const errorMessage = ref('');

const currentStep = ref(1);
const currentPassword = ref('');
const newPassword = ref('');
const confirm_password = ref('');

const titles = {
  setPassword: [t('finance.payPassword'), t('profile.confirmPassword')],
  changePassword:[ t('profile.currentPassword'), t('profile.newPassword'),  t('profile.confirmPassword')]
};

const successTexts = {
  setPassword:t('finance.setSuccess'),
  changePassword: t('profile.passwordSuccess')
};

const currentTitle = computed(() => {
  const titleSet = hasPayPassword.value ? titles.changePassword : titles.setPassword;
  return titleSet[currentStep.value - 1];
});

const successText = computed(() => {
  return hasPayPassword.value ? successTexts.changePassword : successTexts.setPassword;
});

const getHasPayPassword = async () => {
  try {
    const res = await balanceApi.hasPayPassword();
    hasPayPassword.value = res.data || false;
    isLoading.value = false
  } catch (err) {
    console.error('errorerror', err);
    // Handle error appropriately
  }
};

const handleComplete = (value: string) => {
  error.value = false;

  if (hasPayPassword.value) {
    handlePasswordChangeFlow(value);
  } else {
    handleNewPasswordFlow(value);
  }
};

const handlePasswordChangeFlow = async (value: string) => {
  switch (currentStep.value) {
    case 1:
      // Verify current password
      currentPassword.value = value;
      verifyCurrentPassword(value);
      break;
    case 2:
      newPassword.value = value;
      currentStep.value++;
      pwsInput.value?.clearPassword();
      break;
    case 3:
      if (value !== newPassword.value) {
        error.value = true;
        errorMessage.value = t('resetPassword.passwordNotMatch');
        pwsInput.value?.clearPassword();
      } else {
        // All steps completed, ready to submit
        confirm_password.value = value;
        const res = await balanceApi.modifyBalancePassword({
          current_password: currentPassword.value,
          new_password: newPassword.value,
          repeat_password: confirm_password.value
        });
        if(res.code !== 1) {
          currentStep.value = 1;
          pwsInput.value?.clearPassword();
          return;
        }
        success.value = true;
      }
      break;
  }
};

const handleNewPasswordFlow = async (value: string) => {
  switch (currentStep.value) {
    case 1:
      newPassword.value = value;
      currentStep.value++;
      pwsInput.value?.clearPassword();
      break;
    case 2:
      if (value !== newPassword.value) {
        error.value = true;
        errorMessage.value =  t('resetPassword.passwordNotMatch');
        pwsInput.value?.clearPassword();
      } else {
        // Ready to submit new password
        confirm_password.value = value;
        await balanceApi.setBalancePassword({
          password: newPassword.value,
          repeat_password: confirm_password.value
        });
        if(res.code !== 1) {
          currentStep.value = 1;
          pwsInput.value?.clearPassword();
          return;
        }
        success.value = true;
      }
      break;
  }
};

const verifyCurrentPassword = async (password: string) => {
  try {
    const isValid = true;

    if (isValid) {
      currentStep.value++;
      pwsInput.value?.clearPassword();
    } else {
      error.value = true;
      errorMessage.value = '当前密码不正确';
      pwsInput.value?.clearPassword();
    }
  } catch (err) {
    console.error('Password verification failed:', err);
    error.value = true;
    errorMessage.value = '验证密码时出错';
    pwsInput.value?.clearPassword();
  }
};

// const handleSubmit = async (value: string) => {
//   try {
//     if (hasPayPassword.value) {
//       await balanceApi.modifyBalancePassword({
//         current_password: currentPassword.value,
//         new_password: newPassword.value,
//         repeat_password: confirm_password.value
//       });
//     } else {
//       await balanceApi.setBalancePassword({
//         password: newPassword.value,
//         repeat_password: confirm_password.value
//       });
//     }

//   } catch (err) {
//     error.value = true;
//     errorMessage.value = '密码更新失败，请重试';
//   }
// };

// Initialize
getHasPayPassword();
</script>

<style scoped>
/* 自定义样式（可选） */
</style>