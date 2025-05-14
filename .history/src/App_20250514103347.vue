<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import type { State } from './store';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<State>();
    const theme = computed(() => store.getters.theme);

    onMounted(() => {
      // 初始化 Telegram WebApp
      store.dispatch('initTelegramApp');
    });

    return {
      theme,
    };
  },
});
</script>

<template>
  <div id="app" :style="{ backgroundColor: theme.backgroundColor, color: theme.textColor }">
    <router-view />
  </div>
</template>

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
