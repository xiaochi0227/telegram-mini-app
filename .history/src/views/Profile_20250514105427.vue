<template>
  <div class="profile">
    <van-nav-bar
      title="Profile"
      left-arrow
      @click-left="goBack"
      :style="{ backgroundColor: theme.backgroundColor, color: theme.textColor }"
    />
    
    <div class="content" :style="{ backgroundColor: theme.backgroundColor, color: theme.textColor }">
      <van-cell-group inset>
        <van-cell title="User Information" />
        <van-cell v-if="user" title="First Name" :value="user.firstName" />
        <van-cell v-if="user?.lastName" title="Last Name" :value="user.lastName" />
        <van-cell v-if="user?.username" title="Username" :value="user.username" />
      </van-cell-group>

      <div class="button-group">
        <van-button
          type="danger"
          block
          :style="{
            backgroundColor: '#ff4d4f',
            color: '#ffffff',
          }"
          @click="logout"
        >
          Logout
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

const goBack = () => {
  router.back();
};

const logout = () => {
  store.setUser(null);
  router.push('/');
};
</script>

<style scoped>
.profile {
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