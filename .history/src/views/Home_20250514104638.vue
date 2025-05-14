<template>
  <div class="home">
    <van-nav-bar
      title="Home"
      :style="{ backgroundColor: theme.backgroundColor, color: theme.textColor }"
    />
    
    <div class="content" :style="{ backgroundColor: theme.backgroundColor, color: theme.textColor }">
      <van-cell-group inset>
        <van-cell title="Welcome to Telegram Mini App" />
        <van-cell v-if="user" :title="`Hello, ${user.firstName}!`" />
        <van-cell v-else title="Please login with Telegram" />
      </van-cell-group>

      <div class="button-group">
        <van-button
          v-if="user"
          type="primary"
          block
          :style="{
            backgroundColor: theme.buttonColor,
            color: theme.buttonTextColor,
          }"
          @click="goToProfile"
        >
          View Profile
        </van-button>
        <van-button
          v-else
          type="primary"
          block
          :style="{
            backgroundColor: theme.buttonColor,
            color: theme.buttonTextColor,
          }"
          @click="initTelegram"
        >
          Login with Telegram
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { State } from '../store';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useStore<State>();
    const router = useRouter();

    const user = computed(() => store.getters.userInfo);
    const theme = computed(() => store.getters.theme);

    const goToProfile = () => {
      router.push('/profile');
    };

    const initTelegram = () => {
      store.dispatch('initTelegramApp');
    };

    return {
      user,
      theme,
      goToProfile,
      initTelegram,
    };
  },
});
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 16px;
}

.button-group {
  margin-top: 24px;
  padding: 0 16px;
}
</style> 