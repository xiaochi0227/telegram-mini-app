<template>
  <div class="account px-[1rem] h-full overflow-y-auto" v-loading="isLoading">
    <van-sticky>
      <div class="bg-white px-[20px]">
        <div class="border-b border-[#f4f4f4] flex justify-between items-center h-[100px]">
          <nav-bar />
          <div class="flex items-center space-x-2">
            <van-image round width="32px" height="32px" :src="user
              ? user.photo_url
              : 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
              " />
            <!-- <div>
              mike
              <van-icon name="arrow-down" />
            </div> -->
          </div>
        </div>
      </div>
    </van-sticky>
    <div class="text-center bg-white px-[20px] pb-[32px]">
      <div class="text-sm py-3 text-left">{{ t('accountCenter.balance') }}</div>
      <Financial />
      <div class="flex justify-center space-x-4">
        <button class="bg-[#FF356D] text-white px-[6px] py-2 rounded-[12px] w-[300px] h-[72px] text-[24px]"
          @click="() => router.push('/recharge')">
          {{ t('accountCenter.recharge') }}
        </button>
        <button
          class="border border-[#E7E7E9] bg-white text-[#212121] px-[6px]py-2 rounded-[12px] w-[300px] h-[72px] text-[24px]"
          @click="() => router.push('/account/finance/operation-records')">
          {{ t('accountCenter.fundDetail') }}
        </button>
      </div>
    </div>

    <!-- Orders Section -->
    <div class="mt-[24px] bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]">
      <h2 class="font-bold mb-2">{{ t('accountCenter.purchaseOrder') }}</h2>
      <div class="grid grid-cols-2 gap-4">
        <template v-if="orderStatusCards.length">
          <div class="order-status" v-for="(item, index) in orderStatusCards" :key="index" @click="goPath(item.path)">
            <div class="flex items-center justify-between">
              <i :class="`iconfont ${item.icon}`"></i>
              <div class="num">{{ item.count }}</div>
            </div>
            <div class="pt-[16px] text-[24px]">{{ item.title }}</div>
          </div>
        </template>
      </div>
    </div>
    <!-- Logistics Section -->
    <div class="mt-[24px] bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]">
      <h2 class="font-bold mb-2">{{ t('accountCenter.logistics') }}</h2>
      <div class="grid grid-cols-3 gap-4" v-if="logisticsStatusCards.length">
        <div class="text-center logis-status" v-for="(item, index) in logisticsStatusCards" :key="index"
          @click="goPath(item.path)">
          <i :class="`iconfont ${item.icon}`"></i>
          <div class="mt-[28px] text-[24px]">{{ item.title }}</div>
        </div>
      </div>
      <div class="font-bold mt-[40px]">
        {{ t('accountCenter.logisticsPaid') }}
      </div>
      <div class="text-center mt-[16px] text-[#004CE0] font-bold text-[32px]">
        $ {{ allTotalPrice }}
      </div>
    </div>
    <!-- Logistics Status -->
    <!--div
      class="mb-6 bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px]"
      v-if="false"
    >
      <h2 class="font-bold mb-2">物流动态</h2>
      <div class="space-y-4">
        <div>
          <div class="flex items-center">
            <span
              class="bg-[#FFF0F4] text-[#FF356D] px-[10px] py-[6px] rounded-[4px] text-[20px] mr-[10px]"
              >NEW</span
            >
            <div class="text-gray-700">23904324</div>
          </div>
          <div class="text-gray-500 text-sm">
            发货 - 预计到达港口时间: 24.02.2017
          </div>
        </div>
        <div>
          <div class="text-gray-700">23904324</div>
          <div class="text-gray-500 text-sm">
            到达港口 - 预计到达港口时间: 24.02.2017
          </div>
        </div>
        <div>
          <div class="text-gray-700">23904324</div>
          <div class="text-gray-500 text-sm">
            发货 - 预计到达港口时间: 24.02.2017
          </div>
        </div>
      </div>
    </div-->

    <!-- Contact Section -->
    <div class="my-[24px] bg-white rounded-[24px] pt-[28px] pb-[40px] px-[20px] contact">
      <h2 class="font-bold mb-2">{{ t('nav.contact') }}</h2>
      <div class="flex justify-around items-center">
        <div class="text-center" v-for="method in contactMethods" :key="method.id">
          <i :class="['iconfont', method.icon, method.colorClass]" @click="handleContact(method.link)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Dialog } from 'vant';
import { useRouter } from 'vue-router'
import NavBar from '@/components/nav-bar/index.vue'
import Financial from './components/Financial.vue'
import { accountApi } from '@/api'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '../../store/index'
const router = useRouter()
const { t } = useI18n()

const { user } = useAppStore()

const contactMethods = [
  {
    id: 'telegram',
    icon: 'icon-telegram',
    colorClass: 'text-[#28A7E7]',
    link: 'https://t.me/@pakupay',
    tooltip: '通过Telegram联系我们',
  },
  {
    id: 'whatsapp',
    icon: 'icon-whatsup',
    colorClass: 'text-[#33CC33]',
    link: 'https://wa.me/+79153050184',
    tooltip: '通过WhatsApp联系我们',
  },
  {
    id: 'phone',
    icon: 'icon-Phone',
    colorClass: 'text-[#FF356D]',
    link: 'tel:+79959922888',
    tooltip: '拨打客服电话',
  },
  {
    id: 'email',
    icon: 'icon-Email',
    colorClass: 'text-[#FF356D]',
    link: 'mailto:support@pakupay.com',
    tooltip: '发送电子邮件',
  },
]

interface Contact {
  contact: string
}
const handleContact = (contact: Contact['contact']): void => {
  // 检查是否在 Telegram WebApp 环境中
  const isTelegramWebApp = window.Telegram && window.Telegram.WebApp;

  try {
    if (isTelegramWebApp) {
      // 尝试使用 Telegram WebApp API
      window.Telegram.WebApp.openLink(contact);
    } else {
      // 非 Telegram WebApp 环境，直接打开链接
      window.open(contact, '_blank');
    }
  } catch (e) {
    // 如果上述方法都失败，使用回退方案
    let msg = '';
    let textToCopy = '';

    if (contact.startsWith('tel:')) {
      textToCopy = '+79959922888';
      msg = `电话号码 ${textToCopy} 已复制，请打开拨号界面粘贴拨打`;
    } else if (contact.startsWith('mailto:')) {
      textToCopy = 'support@pakupay.com';
      msg = `邮箱 ${textToCopy} 已复制`;
    } else {
      textToCopy = contact;
      msg = `链接已复制到剪贴板`;
    }

    // 尝试复制到剪贴板
    try {
      navigator.clipboard.writeText(textToCopy);
      // 使用原生 alert 作为最后的回退方案
      Dialog.alert({
        message: msg,
      })
    } catch (clipboardError) {
      // 如果复制到剪贴板也失败，直接显示消息
      Dialog.alert({
        message: msg,
      })
    }
  }
}

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
      title: t(item.titleKey),
      count: data[item.key] || 0,
      icon: item.icon,
      path: item.path,
    }))

    // Update logistics status cards
    logisticsStatusCards.value = LOGISTICS_STATUS_MAP.map((item) => ({
      title: t(item.titleKey),
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
  border: 1px solid #e7e7e9;
  border-radius: 24px;
  padding: 32px;
  height: 200px;
  box-sizing: border-box;

  .iconfont {
    font-size: 32px;
    color: #ff356d;
  }

  .num {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #ef2424;
    text-align: center;
    line-height: 42px;
    color: #fff;
    font-size: 24px;
  }
}

.logis-status {
  border: 1px solid #e7e7e9;
  border-radius: 20px;
  padding: 40px 0 64px;

  .iconfont {
    font-size: 32px;
    color: #ff356d;
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
