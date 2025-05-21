<template>
  <div>
    <div class="flex items-center py-[32px]">
      <template v-if="!hideIcon">
        <van-icon
          v-if="route.meta.showBack"
          name="arrow-left"
          size="24"
          color="#FF356D"
          @click="router.back()"
        />
        <van-icon
          v-else
          name="bars"
          size="24"
          color="#212121"
          @click="showPopup = true"
        />
      </template>
      <span class="nav-title text-[#FF356D] font-bold text-[32px] ml-[10px]">
        {{ navTitle }}
      </span>
    </div>
    <van-popup
      v-model:show="showPopup"
      position="left"
      :style="{ width: '70vw', height: '100vh' }"
    >
      <div
        class="sidebar bg-[#F9FAFC] p-[32px] h-full flex flex-col justify-between"
      >
        <!-- 顶部用户信息 -->
        <div class="bg-[#FFFFFF] rounded-[24px] px-[32px] py-[48px]">
          <div class="flex items-center" @click="goAccountInfo">
            <van-image
              round
              width="32px"
              height="32px"
              :src="
                user
                  ? user.photo_url
                  : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
              "
            />
            <span class="ml-3 text-[28px] font-bold text-[#515360]">
              {{ pakupayUser.username }}
            </span>
            <van-icon name="arrow" class="ml-2" color="#515360" />
          </div>
          <!-- 菜单列表 -->
          <van-cell-group inset>
            <van-cell
              v-for="item in menuItems"
              :key="item.title"
              :title="item.title"
              class="text-[24px]"
              :class="{ active: item.path === route.path }"
              @click="onMenuClick(item)"
            >
              <template #icon>
                <i
                  class="iconfont"
                  :class="item.icon"
                  style="font-size: 24px; color: #ff356d"
                ></i>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../../store/index'
import { useUser } from '@/hooks/user'

const props = withDefaults(
  defineProps<{
    hideIcon?: boolean // loading
  }>(),
  {
    hideIcon: false,
  }
)

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { user } = useAppStore()
const { user: pakupayUser } = useUser()
const navTitle = computed(() => route.meta.title || '标题')
const showPopup = ref(false)

// 菜单项数组
const menuItems = [
  { title: t('nav.account'), icon: 'user-o', path: '/account/center' },
  { title: t('menu.inquiries'), icon: 'comment-o', path: '/account/inquiry' },
  { title: t('menu.orders'), icon: 'icon-caigou', path: '/account/purchase' },
  { title: t('menu.logistics'), icon: 'logistics', path: '/account/logistics' },
  { title: t('menu.finance'), icon: 'balance-o', path: '/account/finance' },
]

function onMenuClick(item: any) {
  if (item.path) {
    router.push(item.path)
    showPopup.value = false
  }
}

const goAccountInfo = () => {
  router.push('/account/info')
}
</script>

<style scoped lang="scss">
.sidebar {
  .van-cell-group {
    margin: 0;

    .van-cell {
      margin-top: 64px;
      padding: 0;
      line-height: 1;
      font-size: 26px;
      font-weight: 500;
      color: #a5a8b9;

      &.active {
        color: #ff356d;
      }

      &:after {
        display: none;
      }
    }
  }
}
</style>
