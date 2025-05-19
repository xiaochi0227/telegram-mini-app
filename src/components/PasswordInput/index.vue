<template>
  <div class="flex flex-col items-center justify-center p-4 pb-[100px] bg-white rounded-lg shadow-md ">
    <h2 class="text-[28px] font-bold mb-[60px] w-full">{{ title }}</h2>
    <div class="flex space-x-2">
      <input
        v-for="(_, index) in Array(length).fill(0)"
        :key="index"
        :ref="el => { if (el) inputRefs[index] = el }"
        type="password"
        maxlength="1"
        inputmode="numeric"
        :class="[
          'w-[80px] h-[80px] border rounded-lg text-center text-lg focus:outline-none',
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        ]"
        v-model="passwordArray[index]"
        @input="handleInput(index)"
        @keydown.delete="handleDelete(index)"
        @paste.prevent="handlePaste"
        @focus="handleFocus(index)"
      />
    </div>
    <p v-if="error" class="mt-[40px] text-[#ED2323] text-[24px]">{{ errorMessage }}</p>
     <!-- 确认按钮（当autoSubmit为false时显示） -->
     <button
      v-if="!autoSubmit"
      @click="handleConfirm"
      :disabled="!isComplete"
      :class="[
        'mt-4 px-6 py-2 rounded-lg  w-[90%] text-white',
        isComplete 
          ? 'bg-[#FF356D] ' 
          : 'bg-[#ccc]  cursor-not-allowed'
      ]"
    >
      {{ confirmText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from 'vue';

const props = withDefaults(defineProps<{
  length?: number; // 密码长度
  title?: string; // 标题
  error?: boolean; // 是否显示错误状态
  errorMessage?: string; // 错误提示信息
  autoSubmit?: boolean; // 是否自动提交
  focusOnMount?: boolean; // 是否在挂载时自动聚焦
  confirmText?: string; // 确认按钮文本
}>(), {
  length: 6,
  title: '请重复输入支付密码',
  error: false,
  errorMessage: '密码错误，请重新输入',
  autoSubmit: true,
  focusOnMount: true,
  confirmText: '确定'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'complete', value: string): void;
  (e: 'submit', value: string): void;
}>();

const passwordArray = ref<string[]>(Array(props.length).fill(''));
const inputRefs = ref<(HTMLInputElement | null)[]>([]);

// 计算属性：判断密码是否输入完成
const isComplete = computed(() => {
  return passwordArray.value.join('').length === props.length;
});

// 监听密码变化
watch(passwordArray, (newVal) => {
  const password = newVal.join('');
  emit('update:modelValue', password);
  
  // 检查是否输入完成且需要自动提交
  if (isComplete.value && props.autoSubmit) {
    emit('complete', password);
    emit('submit', password);
  }
}, { deep: true });

// 处理输入
const handleInput = (index: number) => {
  // 过滤非数字字符
  passwordArray.value[index] = passwordArray.value[index].replace(/\D/g, '');
  
  // 自动跳转到下一个输入框
  if (passwordArray.value[index] && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus();
    });
  }
};

// 处理删除键
const handleDelete = (index: number) => {
  if (!passwordArray.value[index] && index > 0) {
    // 当前为空且不是第一个输入框，则删除前一个字符并聚焦前一个输入框
    passwordArray.value[index - 1] = '';
    nextTick(() => {
      inputRefs.value[index - 1]?.focus();
    });
  }
};

// 处理粘贴
const handlePaste = (event: ClipboardEvent) => {
  const pasteData = event.clipboardData?.getData('text/plain').replace(/\D/g, '');
  if (pasteData && pasteData.length === props.length) {
    passwordArray.value = pasteData.split('').slice(0, props.length);
    nextTick(() => {
      inputRefs.value[props.length - 1]?.focus();
    });
  }
};

// 处理聚焦
const handleFocus = (index: number) => {
  // 聚焦时选中文本
  nextTick(() => {
    inputRefs.value[index]?.select();
  });
};

// 处理确认按钮点击
const handleConfirm = () => {
  if (isComplete.value) {
    const password = passwordArray.value.join('');
    emit('complete', password);
    emit('submit', password);
  }
};

// 清空密码
const clearPassword = () => {
  passwordArray.value = Array(props.length).fill('');
  nextTick(() => {
    inputRefs.value[0]?.focus();
  });
};

// 挂载时自动聚焦第一个输入框
onMounted(() => {
  if (props.focusOnMount) {
    nextTick(() => {
      inputRefs.value[0]?.focus();
    });
  }
});

// 暴露方法
defineExpose({
  clearPassword,
  focus: () => inputRefs.value[0]?.focus()
});
</script>