<template>
  <div class="home">
    <van-nav-bar
      title="Home"
      :style="navBarStyle"
    />
    
    <div class="content" :style="contentStyle">
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
          :style="buttonStyle"
          @click="goToProfile"
        >
          View Profile
        </van-button>
        <van-button
          v-else
          type="primary"
          block
          :style="buttonStyle"
          @click="initTelegram"
        >
          Login with Telegram
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store';

const router = useRouter();
const store = useAppStore();

const user = computed(() => store.userInfo);
const theme = computed(() => store.theme);

const navBarStyle = computed(() => ({
  backgroundColor: theme.value?.backgroundColor || '#ffffff',
  color: theme.value?.textColor || '#000000',
}));

const contentStyle = computed(() => ({
  backgroundColor: theme.value?.backgroundColor || '#ffffff',
  color: theme.value?.textColor || '#000000',
}));

const buttonStyle = computed(() => ({
  backgroundColor: theme.value?.buttonColor || '#2481cc',
  color: theme.value?.buttonTextColor || '#ffffff',
}));

const goToProfile = () => {
  router.push('/profile');
};

const initTelegram = () => {
  store.initTelegramApp();
};
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