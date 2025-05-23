<template>
  <div class="home flex flex-col h-full">
    <div class="language-switch" v-if="false">
      <button @click="switchLanguage('zh')" :class="{ active: locale === 'zh' }">中文</button>
      <button @click="switchLanguage('russian')" :class="{ active: locale === 'russian' }">russian</button>
    </div>
    <div>
      <div class="bg-white px-[20px]">
        <div class="flex justify-between items-center h-[100px]">
          <img src="@/assets/images/home/logo.png" class="w-[292px] h-[36px]">
          <nav-bar />
        </div>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto scroll-container relative">
      <div class="language flex items-center space-x-1 absolute right-[20px] top-[40px] z-20"
        @click="(() => { console.log(123); show = true })">
        <img :src="nationalFlag" class="w-[42px]">
        <img src="@/assets/images/home/down.png" class="w-[16px]">
      </div>
      <div class="home-banner relative z-10">
        <img src="@/assets/images/home/home-banner.png" calss="w-full">
        <img :src="mainText" class="main-text absolute w-[664px] top-[100px] left-[44px] right-[44px]">
        <img src="@/assets/images/home/home-text-1.png" class="text-1 absolute w-full top-0 left-0">
        <img src="@/assets/images/home/home-text-2.png" class="text-2 absolute w-[430px] h-[26px] bottom-[220px]">
        <img :src="subtittle" class="text-3 absolute left-[44px] top-[340px] w-[506px]">
        <div class="contact absolute left-[44px]  top-[440px] space-y-[24px]">
          <img :src="contactText" class="h-[64px]">
          <p class="flex items-center space-x-[10px]" @click="handleContact('+79959922888')">
            <i class="iconfont icon-Phone text-[#FF356D]"></i>
            <img src="@/assets/images/home/home-contact-1.png" class="h-[36px]">
          </p>
          <p class="flex items-center space-x-[10px]" @click="handleContact('+8617774072288')">
            <i class="iconfont icon-Phone text-[#FF356D]"></i>
            <img src="@/assets/images/home/home-contact-2.png" class="h-[36px]">
          </p>
          <p class="flex items-center space-x-[10px]" @click="handleContact('https://t.me/@pakupay')">
            <i class="iconfont icon-Phone text-[#28A7E7]"></i>
            <img src="@/assets/images/home/home-contact-3.png" class="h-[36px]">
          </p>
        </div>

        <div class="div-num flex justify-between absolute left-[36px] right-[36px] bottom-[320px]">
          <p class="flex flex-col">
            <img src="@/assets/images/home/home-num-1.png" class="w-[144px]">
            <span class="text-[24px] text-[#333] leading-[32px] pt-[20px]">млн товаров</span>
          </p>
          <p class="flex flex-col  transform -translate-y-[80px]">
            <img src="@/assets/images/home/home-num-2.png" class="w-[144px]">
            <span class="text-[24px] text-[#333] leading-[32px] pt-[20px]">млн товаров</span>
          </p>
          <p class="flex flex-col transform -translate-y-[160px]">
            <img src="@/assets/images/home/home-num-3.png" class="w-[144px]">
            <span class="text-[24px] text-[#333] leading-[32px] pt-[20px]">млн товаров</span>
          </p>
        </div>
        <div class="absolute btn  leading-[100px] text-[#fff] text-center bottom-[64px]" @click="
          () =>
            router.push({ path: '/inquiry' })
        ">{{ t('common.enquiry') }}</div>
      </div>

      <div class="px-[24px] pb-[32px]">
        <!-- 标题 -->
        <div class="text-center advantages rounded-t-2xl">
          <h1 class="main-title relative">
            <img src="@/assets/images/home/home-adv.png" class="adv-img">
            {{ t('home.advantage') }}
          </h1>
          <p class="subtittle pt-[24px] flex items-center justify-center">
            <img src="@/assets/images/home/home-star.png" class="w-[28px] h-[32px] mr-[10px]">
            <span class="leading-[32px]">PAKUPAY ADVANTAGES OF</span>
            <img src="@/assets/images/home/home-star.png" class="w-[28px] h-[32px] ml-[10px]">
          </p>
        </div>
        <div class="space-y-6 ">
          <div :class="`rounded-2xl shadow p-4 text-[#333]  container ${index == 0 ? 'mt-[-60px]' : ''}`"
            v-for="(item, index) in bannerLi" :key="index">
            <div class="flex mb-4">
              <img :src="item.icon" class="w-[28px] h-[32px] mt-[8px]">
              <h2 class="text-[32px] font-bold pl-[8px]">{{ item.title }}</h2>
            </div>
            <img :src="item.banner" class="w-full rounded-lg mb-4">
            <h3 class="text-[24px] font-bold" v-html="item.h3"></h3>
            <p class="text-[24px]  mt-2 flex" v-for="(child, cIdx) in item.pList" :key="cIdx">
              <img :src="child.icon" class="w-[20px] h-[20px] mr-[6px] mt-[6px]" v-if="child.icon">
              <span v-html="child.text"></span>
            </p>
          </div>

        </div>

      </div>
    </div>
  </div>
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from '@/store';
import { useI18n } from 'vue-i18n'
import NavBar from '@/components/nav-bar/index.vue'
import { useRouter } from 'vue-router'

const appStore = useAppStore();
const user = appStore.user;
const { t, locale } = useI18n()
const router = useRouter()
console.log(locale.value)

const tips = window.Telegram?.WebApp.initData

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
const mainText = computed(() =>
  locale.value === 'zh' ? new URL('@/assets/images/home/home-text.png', import.meta.url).href : new URL('@/assets/images/home/home-text-ru.png', import.meta.url).href
);
const subtittle = computed(() =>
  locale.value === 'zh' ? new URL('@/assets/images/home/home-text-3.png', import.meta.url).href : new URL('@/assets/images/home/home-text-ru3.png', import.meta.url).href
);
const contactText = computed(() =>
  locale.value === 'zh' ? new URL('@/assets/images/home/home-contact.png', import.meta.url).href : new URL('@/assets/images/home/home-contact-ru.png', import.meta.url).href
);

const bannerLi = computed(() =>
  [
    {
      icon: new URL('@/assets/images/home/home-icon-1.png', import.meta.url).href,
      title: t('home.bannerPurchaseTitle'),
      banner: new URL('@/assets/images/home/home-pic-1.png', import.meta.url).href,
      h3: t('home.bannerPurchaseH3'),
      pList: [
        {
          icon: '',
          text: t('home.bannerPurchaseP1'),
        },
        {
          icon: '',
          text: t('home.bannerPurchaseP2'),
        },
      ],
    },
    {
      icon: new URL('@/assets/images/home/home-icon-2.png', import.meta.url).href,
      title: t('home.bannerQuotationTitle'),
      banner: new URL('@/assets/images/home/home-pic-2.png', import.meta.url).href,
      h3: t('home.bannerQuotationH3'),
      pList: [
        {
          icon: '',
          text: t('home.bannerQuotationP1'),
        },
        {
          icon: '',
          text: t('home.bannerQuotationP2'),
        },
      ],
    },
    {
      icon: new URL('@/assets/images/home/home-icon-3.png', import.meta.url).href,
      title: t('home.bannerRubleTitle'),
      banner: new URL('@/assets/images/home/home-pic-3.png', import.meta.url).href,
      h3: t('home.bannerRubleH3'),
      pList: [
        {
          icon: new URL('@/assets/images/home/home-checked.png', import.meta.url).href,
          text: t('home.bannerRubleP1'),
        },
        {
          icon: new URL('@/assets/images/home/home-checked.png', import.meta.url).href,
          text: t('home.bannerRubleP2'),
        },
        {
          icon: new URL('@/assets/images/home/home-checked.png', import.meta.url).href,
          text: t('home.bannerRubleP3'),
        },
      ],
    },
    {
      icon: new URL('@/assets/images/home/home-icon-4.png', import.meta.url).href,
      title: t('home.bannerDirectTitle'),
      banner: new URL('@/assets/images/home/home-pic-4.png', import.meta.url).href,
      h3: t('home.bannerDirectH3'),
      pList: [
        {
          icon: new URL('@/assets/images/home/home-checked.png', import.meta.url).href,
          text: t('home.bannerDirectP1'),
        },
        {
          icon: new URL('@/assets/images/home/home-checked.png', import.meta.url).href,
          text: t('home.bannerDirectP2'),
        },
        {
          icon: new URL('@/assets/images/home/home-checked.png', import.meta.url).href,
          text: t('home.bannerDirectP3'),
        },
      ],
    },
  ])

const handleShowPopup = async () => {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.showPopup({
      title: t('common.popupTitle'),
      message: t('common.getPhoneMessage'),
      buttons: [
        { id: "close", type: "close", text: t('common.close') },
      ],
    });
  } else {
    console.error(t('common.telegramNotAvailable'));
  }
};


interface Contact {
  contact: string
}
const handleContact = (contact: Contact['contact']): void => {
  if (window.Telegram && window.Telegram.WebApp) {
    try {
      window.Telegram.WebApp.openLink(`${contact}`);
    } catch (e) {
      // 回退方案：复制到剪贴板并提示用户
      let msg = ''
      if (contact.startsWith('tel:')) {
        navigator.clipboard.writeText('+79959922888');
        msg = `电话号码 ${'+79959922888'} 已复制，请打开拨号界面粘贴拨打`
      } else {
        navigator.clipboard.writeText('support@pakupay.com');
        msg = `邮箱 ${'support@pakupay.com'} 已复制`
      }
      window.Telegram.WebApp.showAlert(msg);
    }
  }
  // window.location.href = `${contact}`
}
</script>

<style scoped lang="scss">
.home {
  background: linear-gradient(to bottom, #FBEBDF, #FF9F6C);
  // background-image: url('@/assets/images/home/home-bg.png');
  // background-position: center;
  // background-size:100%;
}


button {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
}

.language-switch {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.language-switch button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-switch button.active {
  background: #2481cc;
  color: white;
  border-color: #2481cc;
}

.advantages {
  background: #FFECE2;
  box-shadow: inset 0px 8px 8px 0px rgba(255, 255, 255, 0.3);
  padding: 88px 0 100px;
}

.container {
  background: #FFF3ED;
  box-shadow: 0px 2px 6px 0px #FF8845, inset 0px 10px 12px 0px rgba(255, 255, 255, 0.25), inset 0px -10px 12px 0px rgba(255, 255, 255, 0.25);
  position: sticky;
  top: 0;
}

.main-title {
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  text-transform: none;

  /* 文字渐变色 */
  background: linear-gradient(89.99999999985019deg, #FF356D 0%, #FF8DAD 100%);
  -webkit-background-clip: text;
  /* Safari/Chrome */
  background-clip: text;
  color: transparent;
  /* 让文字透明，显示渐变背景 */

  /* 兼容旧版 WebKit 浏览器 */
  -webkit-text-fill-color: transparent;

}

.subtittle {
  font-weight: bold;
  font-size: 16px;
  color: #FCC0A9;
  letter-spacing: 14px;
  text-align: center;
}

.home-banner {
  .text-2 {
    left: 50%;
    transform: translateX(-50%);
  }

  .btn {
    width: 686px;
    height: 100px;
    background: linear-gradient(92deg, #FF356D 32%, #FF92B1 50%, #FF6893 69%);
    border-radius: 16px;
    left: 50%;
    transform: translateX(-50%);
  }

  .iconfont {
    font-size: 30px;
  }
}

.adv-img {
  position: absolute;
  left: 50%;
  width: 240px;
  top: -30px;
  transform: translateX(-50%);
}
</style>