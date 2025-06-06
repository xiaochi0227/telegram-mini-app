<template>
  <div class="home flex flex-col h-full">
    <div class="flex-1 overflow-y-auto scroll-container relative">
      <div class="language flex items-center space-x-1 absolute right-[20px] top-[40px] z-20"
        @click="(() => { show = true })">
        <img :src="nationalFlag" class="w-[42px]">
        <p class="text-[#fff] text-[24px]">{{ locale == 'zh' ? '中文' : 'Russian' }}</p>
        <img src="@/assets/images/home/down.svg" class="w-[32px]">
      </div>
      <div class="relative">
        <swiper ref="swiperRef" :modules="modules" :pagination="{ clickable: true }">
          <swiper-slide v-for="(item, index) in bannerImages" :key="index">
            <div class="swiper-container">
              <img :src="item.url">
              <div class="absolute left-[48px] right-[48px] top-[420px] text-white">
                <h3 class="text-[40px] font-bold mb-[16px]">{{ item.h3 }}</h3>
                <p class="text-[28px]">{{ item.desc }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div
        class="flex relative z-20 flex-col items-center bg-white rounded-lg shadow-md mx-[20px] mb-[20px] mt-[-36px] py-[72px] px-[64px]">
        <img src="../assets/images/logo.svg" alt="Pakupay Logo" class="w-[320px] mb-[20px]">
        <p class="text-center text-[28px] font-semibold text-[#000]">
          {{ t('home.bannerTitle') }}
        </p>
        <div class="grid grid-cols-2 gap-4 mt-6 w-full">
          <div class="flex items-center space-x-[12px]">
            <img src="../assets/images/home/home-icon-1.svg" alt="Icon 1" class="w-12 h-12">
            <div class="flex flex-col">
              <p class="text-[#FF5E2B] font-bold">
                <span class="text-[36px]">15</span>
                <span class="text-[22px] pl-[2px]">年</span>
              </p>
              <span class="text-[22px] text-[#151618]">{{ t('home.noligin.text1') }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-[12px]">
            <img src="../assets/images/home/home-icon-2.svg" alt="Icon 1" class="w-12 h-12">
            <div class="flex flex-col">
              <p class="text-[#FF5E2B]  font-bold">
                <span class="text-[36px]">18</span>
                <span class="text-[22px] pl-[2px]">万+</span>
              </p>
              <span class="text-[22px] text-[#151618]">{{ t('home.noligin.text2') }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-[12px]">
            <img src="../assets/images/home/home-icon-3.svg" alt="Icon 1" class="w-12 h-12">
            <div class="flex flex-col">
              <p class="text-[#FF5E2B] font-bold">
                <span class="text-[36px]">53</span>
                <span class="text-[22px] pl-[2px]">万+</span>
              </p>
              <span class="text-[22px] text-[#151618]">{{ t('home.noligin.text3') }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-[12px]">
            <img src="../assets/images/home/home-icon-4.svg" alt="Icon 1" class="w-12 h-12">
            <div class="flex flex-col">
              <p class="text-[#FF5E2B] font-bold">
                <span class="text-[36px] ">100</span>
                <span class="text-[22px] pl-[2px]">%</span>
              </p>
              <span class="text-[22px] text-[#151618]">{{ t('home.noligin.text4') }}</span>
            </div>
          </div>
        </div>
        <p class="text-center text-[24px] text-[#8A8A8B] mt-[80px] mb-[20px]">
          {{ t('home.noligin') }}
        </p>
        <div class="flex flex-col space-y-[16px] font-bold  w-full">
          <button class="bg-[#FF5E2B] text-white rounded-[20px] w-full" @click="goPath('/login')">
            {{ t('login.title') }}
          </button>
          <button class="bg-[#EFF1F7] text-[#151618]  rounded-[20px] w-full" @click="goPath('/register')">
            {{ t('login.register') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useContactHandler } from '@/hooks/useContactHandler';
import { useUser } from '@/hooks/user'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
const { handleContact } = useContactHandler();
const { user } = useUser() || {}
const { t, locale } = useI18n()
const router = useRouter()
const isLoading = ref(true);

const modules = [Pagination]

const show = ref(false);
const actions = [
  { name: '中文', value: 'zh' },
  { name: 'Russian', value: 'russian' },
];
const onSelect = (item) => {
  switchLanguage(item.value)
  show.value = false;
};

const switchLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('locale', lang);
};
const nationalFlag = computed(() =>
  locale.value === 'zh' ? new URL('@/assets/images/home/China.png', import.meta.url).href : new URL('@/assets/images/home/Russia.png', import.meta.url).href
);
const bannerImages = computed(() =>
  [
    { url: new URL('@/assets/images/home/home-banner-1.png', import.meta.url).href, h3: t('home.banner1.h3'), desc: t('home.banner1.desc') },
    { url: new URL('@/assets/images/home/home-banner-2.png', import.meta.url).href, h3: t('home.banner2.h3'), desc: t('home.banner2.desc') },
    { url: new URL('@/assets/images/home/home-banner-3.png', import.meta.url).href, h3: t('home.banner3.h3'), desc: t('home.banner3.desc') },
    { url: new URL('@/assets/images/home/home-banner-4.png', import.meta.url).href, h3: t('home.banner4.h3'), desc: t('home.banner4.desc') },
  ]
);
const goPath = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="scss">
.home {
  background: #0C0807;
}

:deep(.swiper-pagination-bullets) {
  bottom: 50px;
}

:deep(.swiper-pagination-bullet) {
  width: 20%;
  border-radius: 0;
  height: 6px;
  background: rgba($color: #fff, $alpha: 0.2);

  &.swiper-pagination-bullet-active {
    background: rgba($color: #fff, $alpha: 0.4);
  }
}
</style>