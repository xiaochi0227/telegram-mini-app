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
      <div
        class="flex justify-between items-center mb-4 bg-white rounded-[12px] shadow-md px-[40px] py-[30px]"
        v-for="(item, index) of list"
        :key="index"
        @click="handleChangeAccount(item)"
      >
        <div class="flex gap-[32px] items-center">
          <van-image
            round
            width="45px"
            height="45px"
            :src="item.avatar"
          />
          <span class="text-[28px] font-[500]">{{ getName(item.username) }}</span>
        </div>

        <van-tag
          round
          size="large"
          type="warning"
          color="#FFF1E5"
          text-color="#FF8A21"
          class="!rounded-[12px] !px-[16px] !text-[26px]"
          v-if="item.is_current"
        >
          {{ t('login.currentAccount') }}
        </van-tag>

        <van-loading type="spinner" size="22px" v-if="item.loading" />
      </div>

      <div
        class="flex gap-[32px] items-center mb-4 bg-white rounded-[12px] px-[40px] py-[30px] border-dashed border-[4px]"
      >
        <div
          class="flex justify-center items-center w-[90px] h-[90px] rounded-full bg-[#D9D9D9]"
        >
          <van-icon name="plus" color="#fff" size="22" />
        </div>
        <span class="text-[28px] font-[500]" @click="goLogin">
          {{ t('login.loginOther') }}
        </span>
      </div>
    </div>

    <div class="w-full px-[32px] py-[32px]">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUser } from '@/hooks/user'
import { useAppStore } from '@/store'
import { authApi } from '@/api/auth'
import { formattedPhone } from '@/utils/format'

const router = useRouter()
const { t } = useI18n()
const { logout, tgLogin } = useUser()
const { tg_user_id } = useAppStore()

const list = ref([])

const getAccountList = async () => {
  const res = await authApi.getUserList({ tg_user_id })

  if (res.code != 1) return

  list.value = res.data.data || []
}

const getName = (username: string) => {
  if (username.includes('@')) {
    return username
  }
  return '+7 ' + formattedPhone(username)
}

const goLogin = () => {
  router.push('/login')
}

const handleLogout = () => {
  logout()
}

// 切换账号
const handleChangeAccount = async (item) => {
  const { id: user_id, is_current } = item

  if (is_current) return

  item.loading = true

  await tgLogin({ tg_user_id, user_id })

  item.loading = false
  getAccountList()
}

getAccountList()
</script>

<style scoped lang="scss"></style>
