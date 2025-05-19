<template>
  <div class="flex flex-col h-full">
    <div
      class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
    >
      <nav-bar />
    </div>

    <div class="flex-1 px-[32px] overflow-y-auto"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
</script>

<style scoped lang="scss"></style>
