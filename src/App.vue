<template>
  <div class="app" :style="appStyle" v-loading="loading">
    <div class="flex-1 overflow-hidden">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" />
      </router-view>
    </div>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route :fixed="false" v-if="active">
      <van-tabbar-item
        v-for="(item, index) of tabbar"
        :key="index"
        :name="item.name"
        :to="item.path"
      >
      <span class="text-[24px]" :style="{ color: item.name == active ? '#151618' : '#DADADA' }">{{ item.text }}</span>
        <template #icon>
          <i
            class="iconfont"
            :class="item.icon"
            :style="{ color: item.name == active ? '#151618' : '#DADADA' }"
          ></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useAppStore } from './store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useAppStore()
const theme = computed(() => store.theme)
const loading = ref(false)

const appStyle = computed(() => ({
  backgroundColor: theme.value?.backgroundColor || '#ffffff',
  color: theme.value?.textColor || '#000000',
}))

const active = computed(() => {
  return route.meta.active
})

const tabbar = reactive([
  {
    name: 'index',
    icon: 'icon-Home',
    path: '/index',
    text: '首页',
  },
  {
    name: 'inquiry',
    icon: 'icon-Inquiries',
    path: '/inquiry',
    text: '询价',
  },
  {
    name: 'cart',
    icon: 'icon-Basket',
    path: '/cart',
    text: '购物车',
  },
  {
    name: 'user',
    icon: 'icon-User',
    path: '/account/center',
    text: '账户中心',
  },
])

onMounted(async () => {
  loading.value = true
  await store.initTelegramApp()
  loading.value = false
})
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s, color 0.3s;
  background-color: #f9fafc !important;
  border-top: 2px solid #ededed;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  :deep(.van-tabbar-item){
    line-height: 32px!important;
  }
  :deep(.van-tabbar-item__icon) {
    margin-bottom: 0 !important;

    .iconfont {
      font-size: 42px !important;
    }
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
