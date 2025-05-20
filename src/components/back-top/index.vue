<template>
  <!-- 返回顶部按钮 -->
  <div
    class="fixed bottom-20 right-[32px] z-50 flex justify-center items-center w-[80px] h-[80px] bg-[#FF356D] rounded-full text-[#fff] opacity-[0.9]"
    v-show="showBackTop"
		@click="scrollToTop"
  >
    <van-icon name="arrow-up" size="22" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Button, Icon } from 'vant'

const showBackTop = ref(false)
const container = ref(null)

const checkScroll = () => {
  if (container.value) {
    showBackTop.value = container.value.scrollTop > 200
  }
}

const scrollToTop = () => {
  if (container.value) {
    container.value.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

onMounted(() => {
  container.value = document.querySelector('.scroll-container')
  if (container.value) {
    container.value.addEventListener('scroll', checkScroll)
  }
})

onUnmounted(() => {
  if (container.value) {
    container.value.removeEventListener('scroll', checkScroll)
  }
})
</script>
