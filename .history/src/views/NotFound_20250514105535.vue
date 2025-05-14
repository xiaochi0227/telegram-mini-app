<template>
  <div class="not-found">
    <van-nav-bar
      title="404"
      left-arrow
      @click-left="goBack"
      :style="navBarStyle"
    />
    
    <div class="content" :style="contentStyle">
      <van-empty
        description="Page not found"
        :style="{ color: theme.value?.textColor || '#000000' }"
      >
        <template #image>
          <van-icon name="warning-o" size="64" :style="{ color: theme.value?.textColor || '#000000' }" />
        </template>
        <van-button
          round
          type="primary"
          :style="buttonStyle"
          @click="goHome"
        >
          Back to Home
        </van-button>
      </van-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store';

const router = useRouter();
const store = useAppStore();

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

const goBack = () => {
  router.back();
};

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
</style> 