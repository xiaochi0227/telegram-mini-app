<template>
  <div class="app-container">
    <!-- 页面内容 -->
    <router-view />
    
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/search">搜索</van-tabbar-item>
      <van-tabbar-item name="cart" to="/cart">
        <template #icon="props">
          <van-icon :name="props.active ? 'shopping-cart' : 'shopping-cart-o'" />
          <van-badge :content="cartCount" v-if="cartCount > 0" />
        </template>
        购物车
      </van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o" dot to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const active = ref('/')
const tabbar = reactive([])

</script>

<style>
.app-container {
  padding-bottom: 50px; /* 为底部导航栏留出空间 */
}
</style>