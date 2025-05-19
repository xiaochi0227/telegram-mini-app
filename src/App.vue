<template>
  <div id="app" :style="appStyle">
    <div class="flex-1 overflow-hidden">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" />
      </router-view>
    </div>

    <!-- 底部导航栏 -->
    <van-tabbar
      v-model="active"
      route
      :fixed="false"
      v-if="active"
    >
      <van-tabbar-item
        v-for="(item, index) of tabbar"
        :key="index"
        :name="item.name"
        :to="item.path"
      >
        <template #icon="props">
          <i
            class="iconfont"
            :class="item.icon"
            :style="{ color: item.name == active ? '#FF356D' : '#DADADA' }"
          ></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, reactive } from 'vue'
import { useAppStore } from './store'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useAppStore()
const theme = computed(() => store.theme)

const appStyle = computed(() => ({
  backgroundColor: theme.value?.backgroundColor || '#ffffff',
  color: theme.value?.textColor || '#000000',
}))

const active = computed(() => {
  return route.meta.active
})

const tabbar = reactive([
  {
    name: 'home',
    icon: 'icon-Home',
    path: '/',
  },
  {
    name: 'inquiry',
    icon: 'icon-Inquiry',
    path: '/inquiry',
  },
  {
    name: 'cart',
    icon: 'icon-Basket',
    path: '/cart',
  },
  {
    name: 'user',
    icon: 'icon-Account',
    path: '/account/center',
  },
])

onMounted(() => {
  store.initTelegramApp()
})
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s, color 0.3s;
  background-color: #f9fafc !important;

  :deep(.van-tabbar-item__icon) {
    margin-bottom: 0 !important;

    .iconfont {
      font-size: 50px !important;
    }
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
