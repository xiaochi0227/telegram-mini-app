<template>
  <div class="home">
    <h1>欢迎来到 Telegram Mini App</h1>
    <div v-if="user">
      <p>{{ JSON.stringify(user) }}</p>
      <p><strong>用户 ID:</strong> {{ user.id }}</p>
      <p><strong>用户名:</strong> {{ user.first_name }} {{ user.last_name }}</p>
      <img :src="user.photo_url" />
    </div>
    <div v-else>
      <p>未获取到用户信息，请确保已通过 Telegram 客户端打开 WebApp。</p>
    </div>
    <button @click="handleShowPopup">点击获取手机号</button>
  </div>
</template>

<script>
import { useAppStore } from '@/store';
import { ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    const appStore = useAppStore();
    const user = appStore.user;

    const handleShowPopup = async () => {
      const phoneNumber = await requestPhoneNumber();
      if (phoneNumber) {
        console.log('User phone number:', phoneNumber);
      } else {
        console.log('User denied phone number access');
      }
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.showPopup({
          title: "弹出框标题",
          message: `手机号是${phoneNumber}`,
          buttons: [
            { id: "close", type: "close", text: "关闭" },
          ],
        });
      } else {
        console.error("Telegram WebApp 对象不可用");
      }
    };

    return {
      user,
      handleShowPopup,
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

button {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
}
</style>