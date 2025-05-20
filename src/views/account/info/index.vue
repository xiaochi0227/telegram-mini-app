<template>
  <div class="flex flex-col h-full overflow-y-auto">
    <van-sticky>
      <div
        class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
      >
        <nav-bar />
      </div>
    </van-sticky>

    <div class="flex-1 px-[32px] overflow-y-auto">
      <div class="flex gap-[32px] items-center bg-white rounded-[12px] shadow-md px-[40px] py-[30px]">
        <van-image
          round
          width="45px"
          height="45px"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
				<span class="text-[28px] font-[500]">+7 7894561265</span>
      </div>
    </div>

    <div class="flex flex-col gap-[24px] w-full px-[32px] py-[32px]">
      <van-button
        plain
        round
        block
        color="#FF356D"
        size="large"
        type="primary"
				@click="goChangeAccount"
      >
        切换账号
      </van-button>

      <van-button
        round
        block
        color="#FF356D"
        size="large"
        type="primary"
				@click="handleLogout"
      >
        {{ t('user.logout') }}
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUser } from '@/hooks/user'

const router = useRouter()
const { t } = useI18n()
const { logout } = useUser()

const goChangeAccount = () => {
  router.push('/account/change')
}

const handleLogout = () => {
	logout()
}
</script>

<style scoped lang="scss"></style>
