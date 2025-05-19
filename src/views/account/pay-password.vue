<template>
  <div class="mx-[1rem]">
    <div class=" bg-white px-[20px] mb-[24px]">
      <div class="flex justify-between items-center h-[100px]">
        <nav-bar />
      </div>
    </div>
    <PasswordInput v-model="password" @complete="handleComplete" @submit="handleSubmit" title="请输入验证码"/>
    <div class="flex justify-center items-center bg-white rounded-[24px] h-[400px] mt-[24px] flex-col">
      <div class="w-[100px] h-[100px] rounded-full bg-[#FF356D]"></div>
      <div class="text-[#212121] text-[40px] font-bold mt-[80px]">设置成功</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue';
import PasswordInput from '@/components/PasswordInput/index.vue';
import { ref } from 'vue';

const password = ref('');

const handleComplete = (value) => {
  console.log('密码输入完成:', value);
};

const handleSubmit = (value) => {
  console.log('提交密码:', value);
  // 这里可以发送请求验证密码
};
</script>

<style scoped>
/* 自定义样式（可选） */
</style>