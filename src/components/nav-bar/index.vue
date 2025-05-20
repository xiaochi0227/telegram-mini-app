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
      <span
        class="nav-title text-[#FF356D] font-bold text-[32px] ml-[10px] leading-[32px]"
      >
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
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-[#D9D9D9]"></div>
            <span class="ml-3 text-lg font-bold text-[#515360]">mike</span>
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

const props = withDefaults(
  defineProps<{
    hideIcon?: boolean // loading
  }>(),
  {
    hideIcon: false,
  }
)

const route = useRoute()
const router = useRouter()
const navTitle = computed(() => route.meta.title || '标题')
const showPopup = ref(false)

// 菜单项数组
const menuItems = [
  { title: '账户中心', icon: 'user-o', path: '/account' },
  { title: '我的询价', icon: 'comment-o', path: '/account/inquiry' },
  { title: '采购订单', icon: 'icon-caigou', path: '/account/purchase' },
  { title: '物流订单', icon: 'logistics', path: '/account/logistics' },
  { title: '资金管理', icon: 'balance-o', path: '/account/finance' },
]

function onMenuClick(item: any) {
  if (item.path) {
    router.push(item.path)
    showPopup.value = false
  }
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
