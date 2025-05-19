<template>
  <!-- 底部导航栏 -->
  <van-tabbar
    v-model="active"
    route
    active-color="#ee0a24"
    inactive-color="#000"
  >
    <van-tabbar-item
      name="cart"
      v-for="(item, index) of tabbar"
      :key="index"
      :to="item.path"
    >
      <template #icon="props">
        <i class="iconfont" :class="item.icon"></i>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, reactive } from 'vue'

const active = ref('/')
const tabbar = reactive([
  {
    icon: 'icon-Home',
    path: '/',
  },
  {
    icon: 'icon-Inquiry',
    path: '/inquiry',
  },
  {
    icon: 'icon-Basket',
    path: '/cart',
  },
  {
    icon: 'icon-Account',
    path: '/account/center',
  },
])
</script>

<style>
.app-container {
  padding-bottom: 50px; /* 为底部导航栏留出空间 */
}
</style>
