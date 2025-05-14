<template>
  <div class="home">
    <h1>欢迎来到 Telegram Mini App</h1>
    <div v-if="user">
      <p>{{ JSON.stringify(user) }}</p>
      <p><strong>用户 ID:</strong> {{ user.id }}</p>
      <p><strong>用户名:</strong> {{ user.username || '未设置' }}</p>
      <p><strong>姓名:</strong> {{ user.firstName }} {{ user.lastName || '' }}</p>
    </div>
    <div v-else>
      <p>未获取到用户信息，请确保已通过 Telegram 客户端打开 WebApp。</p>
    </div>
  </div>
</template>

<script>
import { useAppStore } from '@/store';

export default {
  name: 'Home',
  setup() {
    const appStore = useAppStore();
    const user = appStore.user;

    return {
      user,
    };
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}

p {
  font-size: 16px;
  margin: 5px 0;
}
</style>