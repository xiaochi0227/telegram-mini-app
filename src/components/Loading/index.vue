<template>
  <Transition name="loading">
    <div v-if="modelValue" class="loading-overlay">
      <div>
        <img src="../../assets/images/loading.gif" class="w-[300px]">
        <button v-if="showClose" @click="close" class="p-[8px] bg-[#FF5E2B] text-[#fff] text-[24px]">关闭</button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import i18n from '../../plugins/i18n';

defineProps({
  text: {
    type: String,
    default: `${i18n.global.t('loading')}...`
  },
  showClose: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue']);

const close = () => {
  emit('update:modelValue', false);
};
</script>

<style scoped lang="scss">
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 进入和离开的过渡效果 */
.loading-enter-active {
  //transition: all 0.3s ease-out;
}

.loading-leave-active {
  transition: all 0.3s ease-in;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

.loading-enter-from .loading-content {
  transform: translateY(-20px) scale(0.95);
}

.loading-leave-to .loading-content {
  transform: translateY(20px) scale(0.95);
}

/* 保留原有的旋转动画 */
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>