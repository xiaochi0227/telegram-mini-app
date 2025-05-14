<template>
  <div id="app" :style="{ backgroundColor: theme.backgroundColor, color: theme.textColor }">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAppStore } from './store';

const store = useAppStore();
const theme = computed(() => store.theme);

onMounted(async () => {
  // 初始化 Telegram WebApp
  await store.initTelegramApp();
});
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
