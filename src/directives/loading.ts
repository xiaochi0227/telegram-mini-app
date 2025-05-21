import { createApp, h,ref } from 'vue'
import Loading from '@/components/Loading/index.vue'

import type { ComponentPublicInstance } from 'vue';

let loadingInstance: (ComponentPublicInstance & { isVisible: boolean }) | null = null
let loadingApp = null

interface LoadingDirectiveBinding {
  value: boolean;
  oldValue?: boolean;
  arg?: string;
}

interface LoadingDirectiveElement extends HTMLElement {}

export default {
  mounted(el: LoadingDirectiveElement, binding: LoadingDirectiveBinding) {
    if (binding.value) {
      showLoading(el, binding.arg);
    }
  },
  updated(el: LoadingDirectiveElement, binding: LoadingDirectiveBinding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        showLoading(el, binding.arg);
      } else {
        hideLoading();
      }
    }
  }
}

interface ShowLoadingOptions {
  target: HTMLElement | null;
  text: string | undefined;
}

function showLoading(target: ShowLoadingOptions['target'], text: ShowLoadingOptions['text']) {
  if (!loadingInstance) {
    // 创建新的div容器
    const loadingEl: HTMLDivElement = document.createElement('div');
    document.body.appendChild(loadingEl);
    
    // 创建Vue应用实例
    loadingApp = createApp({
      setup() {
        const isVisible = ref<boolean>(true);
        
        const close = (): void => {
          isVisible.value = false;
        };
        
        return {
          isVisible,
          close
        };
      },
      render() {
        return h(Loading, {
          text: text,
          showClose: false,
          modelValue: this.isVisible,
          'onUpdate:modelValue': (val: boolean) => {
            this.isVisible = val;
          }
        });
      }
    });
    
    // 挂载并保存实例
    loadingInstance = loadingApp.mount(loadingEl) as ComponentPublicInstance & { isVisible: boolean };
  } else {
    // 如果已有实例，确保显示
    loadingInstance.isVisible = true;
    // 更新文本
    if (text) {
      // 这里需要根据你的Loading组件实现来更新文本
      // 可能需要通过$refs或其他方式
    }
  }
}

function hideLoading() {
  if (loadingInstance) {
    loadingInstance.isVisible = false
    // 或者完全销毁实例
    // loadingApp.unmount()
    // document.body.removeChild(loadingInstance.$el)
    // loadingInstance = null
    // loadingApp = null
  }
}

// 全局方法
export function showGlobalLoading(text: string): void {
  showLoading(null, text);
}

export function hideGlobalLoading() {
  hideLoading()
}