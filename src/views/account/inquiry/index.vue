<template>
  <div class="flex flex-col h-full">
    <van-sticky>
      <div
        class="nav-header mx-[32px] px-[20px] mb-[24px] bg-[#fff] rounded-b-[12px]"
      >
        <nav-bar />
        <div
          class="relative pb-[28px] pt-[24px] border-t-[#F4F4F4] border-t-[1px]"
        >
          <div
            class="flex items-center w-full h-[62px] rounded-[12px] border border-[#F4F4F4] bg-[#fff] px-4 text-[#212121] text-[28px] cursor-pointer select-none"
            @click="showActionSheet = true"
          >
            <span class="flex-1">{{ selectedLabel }}</span>
            <van-icon name="arrow-down" class="text-[#9EA1AA]" />
          </div>
          <van-action-sheet
            v-model:show="showActionSheet"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
          />
        </div>
      </div>
    </van-sticky>

    <div class="px-[32px] overflow-y-auto">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="item in list"
            :key="item.id"
            class="bg-white rounded-[24px] shadow px-[20px] py-[24px] mb-[24px]"
            @click="handleDetail(item.id)"
          >
            <p class="text-[32px] text-[#212121] font-bold mb-[16px]">
              {{ item.order_no }}
            </p>

            <div class="flex justify-between items-center mb-[8px]">
              <span class="text-[#212121] text-[28px]">{{
                t('myInquiries.add_time')
              }}</span>
              <span class="text-[#515360] text-[24px]">{{
                item.add_time
              }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[#212121] text-[28px]">
                {{ t('myInquiries.product_count') }}/已报价
              </span>
              <span class="text-[#515360] text-[24px]">
                {{ item.product_count }}/{{ item.quotation_num }}
              </span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import NavBar from '@/components/nav-bar/index.vue'
import { inquiryApi } from '@/api'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface InquiryItem {
  id: string
  time: string
  count: string
}

const { t } = useI18n()
const router = useRouter()

const list = ref<InquiryItem[]>([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

// ActionSheet state
const showActionSheet = ref(false)
const selectedLabel = ref('全部')
const orderStatus = ref('')
const actions = [
  { name: t('common.all'), value: '' },
  { name: t('common.pendingQuotation'), value: 1 },
  { name: t('common.inQuotation'), value: 2 },
  { name: t('common.completedQuotation'), value: 3 },
]

// 状态选择
const onSelect = (action: any) => {
  selectedLabel.value = action.name
  orderStatus.value = action.value
  showActionSheet.value = false
  onRefresh()
}

const fetchMyInquiryList = async () => {
  const params = {
    order_by: '',
    order_status: orderStatus.value,
    page: page.value,
    limit: pageSize.value,
  }

  loading.value = true

  const res = await inquiryApi.getMyInquiryList(params)

  loading.value = false

  if (res.code != 1) return

  list.value = list.value.concat(res.data?.list || [])
  total.value = res.data?.total || 0

  // 判断是否加载完所有数据
  finished.value = list.value.length >= total.value
}

const onLoad = () => {
  page.value += 1
  fetchMyInquiryList()
}

const onRefresh = async () => {
  page.value = 1
  list.value = []
  finished.value = false
  await fetchMyInquiryList()
  refreshing.value = false
}

const handleDetail = (id) => {
  router.push('/account/inquiry-detail?id=' + id)
}

// ... 其他代码
onMounted(() => {
  onRefresh()
})
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
