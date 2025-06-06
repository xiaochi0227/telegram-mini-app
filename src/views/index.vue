<template>
  <div class="account flex flex-col h-full">
    <van-sticky>
      <div class="bg-white px-[20px]">
        <div class="border-[#f4f4f4] flex justify-between items-center h-[100px]">
          <div class="flex items-center space-x-2" @click="goPath('/account/info')">
            <van-image round width="32px" height="32px" :src="user
              ? user.photo_url
              : Default
              " />
            <span class="ml-[16px] text-[28px] font-bold text-[#515360] max-w-[320px] truncate">
              {{ getName() }}
            </span>
          </div>
          <div class="language flex items-center space-x-1 absolute right-[20px] top-[40px] z-20"
            @click="(() => { show = true })">
            <img :src="nationalFlag" class="w-[42px]">
            <p class="text-[#6D7278] text-[24px]">{{ locale == 'zh' ? '中文' : 'Russian' }}</p>
            <img src="@/assets/images/home/down.svg" class="w-[32px]">
          </div>
        </div>
      </div>
    </van-sticky>
    <div class="flex-1 px-[32px] overflow-y-auto">
      <div class="flex justify-between items-center h-[88px] px-[24px] bg-[#fff] mt-[20px] rounded-[16px]"
        v-if="noticeShow">
        <div class="flex text-[#151618] items-center space-x-[16px]">
          <img src="@/assets/images/index/notice.svg" class="w-[40px] h-[40px]" />
          <span>{{ t('accountCenter.logisticsPaid') }} $ {{ allTotalPrice }}</span>
        </div>
        <div @click="noticeShow = false">
          <img src="@/assets/images/index/close.svg" class="w-[40px] h-[40px]" />
        </div>
      </div>
      <div class="text-center bg-white px-[28px] py-[32px] mt-[20px]">
        <!-- <div class="text-sm py-3 text-left">{{ t('accountCenter.balance') }}</div> -->
        <Financial />
        <div class="flex justify-center space-x-4 mt-[32px]">
          <button class="bg-[#EFF1F7] text-[#151618] px-[6px] py-2 rounded-[20px] w-[300px] h-[88px] text-[24px]"
            @click="() => router.push('/account/finance/operation-records')">
            {{ t('accountCenter.fundDetail') }}
          </button>
          <button class="bg-[#FF5E2B] text-white px-[6px] py-2 rounded-[20px] w-[300px] h-[88px] text-[24px]"
            @click="() => router.push('/recharge')">
            {{ t('accountCenter.recharge') }}
          </button>

        </div>
      </div>

      <!-- Orders Section -->
      <div class="mt-[24px] bg-white rounded-[16px] py-[32px] px-[28px]">
        <h2 class="font-bold  flex items-center justify-between" @click="goPath('/account/purchase')">
          <span>{{ t('footer.purchase') }}</span>
          <img src="@/assets/images/index/right.svg" class="w-[40px] h-[40px]" />
        </h2>
        <p class="text-[24px] text-[#6D7278] mt-[8px] mb-[20px]">询价 → 购买下单 → 采购动态跟踪 → 交付</p>
        <div class="flex  w-full">
          <template v-if="orderStatusCards.length">
            <div class="order-status relative flex-1" v-for="(item, index) in orderStatusCards" :key="index"
              @click="goPath(item.path)">
              <div class="flex items-center justify-between flex-col ">
                <i :class="`iconfont ${item.icon}`"></i>
                <div class="pt-[8px] text-[28px]">{{ item.title }}</div>
              </div>
              <div class="num flex items-center justify-center">
                <span>{{ item.count }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- Logistics Section -->
      <div class="mt-[24px] bg-white rounded-[16px] py-[32px]  px-[28px]">
        <h2 class="font-bold flex items-center justify-between" @click="goPath('/account/logistics')">
          <span>中俄物流运输</span>
          <img src="@/assets/images/index/right.svg" class="w-[40px] h-[40px]" />
        </h2>
        <p class="text-[24px] text-[#6D7278] mt-[8px] mb-[20px]">中俄点到点全包物流</p>
        <div class="flex w-full" v-if="logisticsStatusCards.length">
          <div class="flex items-center justify-between  flex-col logis-status w-[25%]"
            v-for="(item, index) in logisticsStatusCards" :key="index" @click="goPath(item.path)">
            <i :class="`iconfont ${item.icon}`"></i>
            <div class="pt-[8px] text-[28px]">{{ item.title }}</div>
          </div>
        </div>
      </div>


      <!-- Contact Section -->
      <div class="my-[24px] bg-white rounded-[16px] py-[32px]  px-[28px] contact">
        <h2 class="font-bold mb-2">{{ t('nav.contact') }}</h2>
        <div class="flex">
          <div class="flex items-center justify-between  flex-col w-[25%]" v-for="method in contactMethods"
            :key="method.id">
            <img :src="method.icon" @click="handleContact(method.link)" />
            <p class="text-[24px] text-[#6D7278]">{{ method.tooltip }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed,watch } from 'vue'
import { useRouter } from 'vue-router'
import Financial from './account/components/Financial.vue'
import { accountApi } from '@/api'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../store/index'
import { useContactHandler } from '@/hooks/useContactHandler';
import Default from '@/assets/images/default.png'
import { useUser } from '@/hooks/user'
import { formattedPhone } from '@/utils/format'

const { user: pakupayUser } = useUser()

const getName = () => {
  if (!pakupayUser.value) return ''

  const username = pakupayUser.value.username

  if (username.includes('@')) {
    return username
  }
  return '+7 ' + formattedPhone(username)
}

const { handleContact } = useContactHandler();

const router = useRouter()
const { t, locale } = useI18n()

const { user } = useAppStore()

const noticeShow = ref(true);
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

const contactMethods = [
  {
    id: 'telegram',
    icon: new URL('@/assets/images/index/contact-1.svg', import.meta.url).href,
    link: 'https://t.me/pakupay',
    tooltip: 'Telegram',
  },
  {
    id: 'whatsapp',
    icon: new URL('@/assets/images/index/contact-2.svg', import.meta.url).href,
    link: 'https://wa.me/+79153050184',
    tooltip: 'WhatsApp',
  },
  {
    id: 'phone',
    icon: new URL('@/assets/images/index/contact-3.svg', import.meta.url).href,
    link: 'tel:+79959922888',
    tooltip: 'Phone',
  },
]

const isLoading = ref(true)
const allTotalPrice = ref(0)
interface StatusCard {
  title: string
  count: number
  icon: string
  path: string
}

const orderStatusCards = ref<StatusCard[]>([])
const logisticsStatusCards = ref<StatusCard[]>([])

const ORDER_STATUS_MAP = [
  {
    key: 'inquiry_sheet_count',
    titleKey: 'accountCenter.inquiry',
    icon: 'icon-Enquiry',
    path: '/account/inquiry?status=2',
  },
  {
    key: 'confirmation_count',
    titleKey: 'accountCenter.pendingConfirmation',
    icon: 'icon-Confirm',
    path: '/account/purchase?status=1',
  },
  {
    key: 'need_pay_count',
    titleKey: 'accountCenter.pendingPayment',
    icon: 'icon-Payment',
    path: '/account/purchase?status=2',
  },
  {
    key: 'buy_order_count',
    titleKey: 'accountCenter.procurement',
    icon: 'icon-Purchase',
    path: '/account/purchase?status=4',
  },
]

const LOGISTICS_STATUS_MAP = [
  {
    key: 'transit_count',
    titleKey: 'accountCenter.inTransit',
    icon: 'icon-Transport',
    path: '/account/logistics?status=2',
  },
  {
    key: 'allocation_count',
    titleKey: 'accountCenter.pendingAllocation',
    icon: 'icon-Sorting',
    path: '/account/logistics?status=3',
  },
  {
    key: 'signed_for_count',
    titleKey: 'accountCenter.signed',
    icon: 'icon-Time',
    path: '/account/logistics?status=4',
  },
]

const fetchAccountIndex = async () => {
  try {
    const { data } = await accountApi.getAccountIndex()

    // Update all total price
    allTotalPrice.value = data.all_total_price

    // Update order status cards
    orderStatusCards.value = ORDER_STATUS_MAP.map((item) => ({
      title:t(item.titleKey),
      count: data[item.key] || 0,
      icon: item.icon,
      path: item.path,
    }))

    // Update logistics status cards
    logisticsStatusCards.value = LOGISTICS_STATUS_MAP.map((item) => ({
      title:t(item.titleKey),
      count: data[item.key] || 0,
      icon: item.icon,
      path: item.path,
    }))
  } catch (error) {
    console.error('Failed to fetch account index:', error)
    // You might want to handle errors here, e.g., show a notification
  }
}

const goPath = (path: string) => {
  router.push(path)
}

watch(locale, async (newLocale) => {
  console.log(`Locale changed to: ${newLocale}`);
  await fetchAccountIndex(); // Refetch data when locale changes
});

onMounted(async () => {
  await fetchAccountIndex()
  isLoading.value = false
})
</script>

<style scoped lang="scss">
.account {
  font-size: 28px;
  color: #515360;
}

.order-status {
  .iconfont {
    font-size: 54px;
    color: #151618;
  }

  .num {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #FA4C4C;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    position: absolute;
    top: 4px;
    right: 32px;
    border: 4px solid #fff;
  }
}

.logis-status {

  .iconfont {
    font-size: 54px;
    color: #151618;
  }
}

.contact>div>div {

  &:nth-child(1),
  &:nth-child(2) {
    .iconfont {
      font-size: 64px;
    }
  }

  &:nth-child(3),
  &:nth-child(4) {
    .iconfont {
      font-size: 54px;
    }
  }
}
</style>
