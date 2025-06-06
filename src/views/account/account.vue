<template>
  <div class="account">
    <div class="mx-[32px] pt-[248px]">
      <div class="flex items-center space-x-[20px]">
        <van-image round width="64px" height="64px" :src="user
          ? user.photo_url
          : Default
          " />
        <div @click="goPath('/account/info')" class="cursor-pointer">
          <p class="flex items-center">
            <span class="text-[40px] text-[#151618] font-bold max-w-[360px] truncate">{{ pakupayUser.nickname }}</span>
            <img src="../../assets/images/account/icon-right.svg" class="w-[40px] ml-[16px]">
          </p>
          <span class=" text-[#6D7278] pt-[8px]">
            {{ getName() }}
          </span>
        </div>
      </div>
      <div class="mt-[64px] bg-[#ffffff] rounded-[24px] py-[20px] pl-[40px] pr-[24px]">
        <div class="flex items-center justify-between h-[100px]" v-for="item in menuItems" :key="item.title" @click="goPath(item.path)">
          <div class="flex items-center space-x-[20px]">
            <img :src="item.icon" class="w-[40px] h-[40px]">
            <span class=" text-[#151618]">{{ item.title }}</span>
          </div>
          <img src="../../assets/images/account/icon-right.svg" class="w-[40px] h-[40px]">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/nav-bar/index.vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../../store/index'
import { useUser } from '@/hooks/user'
import { formattedPhone } from '@/utils/format'
import Default from '@/assets/images/default.png'

const router = useRouter()
const { t } = useI18n()

const { user } = useAppStore()
const { user: pakupayUser } = useUser()
console.log('user', user, pakupayUser)
const getName = () => {
  if (!pakupayUser.value) return ''

  const username = pakupayUser.value.username

  if (username.includes('@')) {
    return username
  }
  return '+7 ' + formattedPhone(username)
}

// 菜单项数组
const menuItems = [
  { title: t('menu.inquiries'), icon: new URL('@/assets/images/account/icon-inquiries.svg', import.meta.url).href, path: '/account/inquiry' },
  { title: t('menu.orders'), icon: new URL('@/assets/images/account/icon-purchase.svg', import.meta.url).href, path: '/account/purchase' },
  { title: t('menu.logistics'), icon: new URL('@/assets/images/account/icon-logistics.svg', import.meta.url).href, path: '/account/logistics' },
  { title: t('menu.finance'), icon: new URL('@/assets/images/account/icon-finance.svg', import.meta.url).href, path: '/account/finance' },
]

const goPath = (path: string) => {
  router.push(path)
}

</script>

<style scoped lang="scss">
.account {
  font-size: 28px;
  background: #F4F5F9 url('../../assets/images/account/icon-bg.png') no-repeat center top;
  background-size: 100% auto;
  height: 100vh;
}
</style>
