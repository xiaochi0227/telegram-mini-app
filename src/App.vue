<template>
  <div id="app" :style="appStyle">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAppStore } from './store';

const store = useAppStore();
const theme = computed(() => store.theme);

const appStyle = computed(() => ({
  backgroundColor: theme.value?.backgroundColor || '#ffffff',
  color: theme.value?.textColor || '#000000',
}));

onMounted(() => {
  store.initTelegramApp();
});
</script>

<style>
#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
