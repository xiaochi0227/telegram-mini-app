<template>
  <div class="flex flex-col h-[100vh] overflow-hidden">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>
    <div>{{ order_no }}</div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav-bar/index.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { decryptParams } from '@/utils/encryption';

const route = useRoute()
const decryptedData = ref({})

const order_no = computed(() => {
  return decryptedData.value.order_no || ''
})

const init = () => {
  const encryptedData = route.query.query || ''
  // 解密后的传参
  decryptedData.value = encryptedData
    ? decryptParams(decodeURIComponent(encryptedData))
    : {}
}

init()
</script>
