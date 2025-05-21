<template>
  <div class="captcha-container">
    <img
      v-if="captchaImage"
      :src="captchaImage"
      class="captcha-image"
      @click="generateCaptcha"
    />
		<van-icon class="mr-4" name="replay" @click="generateCaptcha" v-else/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { authApi } from '@/api';

interface Props {
  callInterface?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['code-change'])
const captchaImage = ref('');

const generateCaptcha = async () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 100;
  canvas.height = 38;

  // Generate random code (4 characters)
  let code = '';
  if (props.callInterface) {
    const res = await authApi.getVerificationCode();
    if (res.code != 1) return;
    code = res.data;
  } else {
    code = Math.random().toString(36).substring(2, 6).toUpperCase();
  }

	emit('code-change', code)

  // Fill background
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add noise
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2)`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Add lines
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.5)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // Draw text
  ctx.fillStyle = '#333';
  ctx.font = 'bold 24px Arial';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < code.length; i++) {
    ctx.save();
    ctx.translate(12 + i * 20, 20);
    ctx.rotate((Math.random() - 0.5) * 0.4);
    ctx.fillText(code[i], 0, 0);
    ctx.restore();
  }

  captchaImage.value = canvas.toDataURL();
};

onMounted(() => {
  generateCaptcha();
});
</script>

<style scoped>
.captcha-container {
  display: flex;
  align-items: center;
  height: 88px;
}

.captcha-image {
  height: 88px;
  cursor: pointer;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.refresh-button {
  padding: 4px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
}
</style>