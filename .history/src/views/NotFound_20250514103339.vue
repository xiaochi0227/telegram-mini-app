<template>
  <div class="not-found">
    <van-nav-bar
      title="404"
      left-arrow
      @click-left="goBack"
      :style="{ backgroundColor: theme.backgroundColor, color: theme.textColor }"
    />
    
    <div class="content" :style="{ backgroundColor: theme.backgroundColor, color: theme.textColor }">
      <van-empty
        description="Page not found"
        :style="{ color: theme.textColor }"
      >
        <template #image>
          <van-icon name="warning-o" size="64" :style="{ color: theme.textColor }" />
        </template>
        <van-button
          round
          type="primary"
          :style="{
            backgroundColor: theme.buttonColor,
            color: theme.buttonTextColor,
          }"
          @click="goHome"
        >
          Back to Home
        </van-button>
      </van-empty>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { State } from '../store';

export default defineComponent({
  name: 'NotFoundView',
  setup() {
    const store = useStore<State>();
    const router = useRouter();

    const theme = computed(() => store.getters.theme);

    const goBack = () => {
      router.back();
    };

    const goHome = () => {
      router.push('/');
    };

    return {
      theme,
      goBack,
      goHome,
    };
  },
});
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