import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface GoodsItem {
  id: number
  product_name: string
  total_price: number
  product_num: number
  unit_price: number
  lead_time: number
  is_quotation: boolean
}

export const useInquiryStore = defineStore('inquiry', () => {
  const good = ref<GoodsItem>({})
	const inquiry = ref<InquiryItem>({})

  const setGood = (newGood: GoodsItem) => {
    good.value = newGood
  }

  const setInquiry = (newGood: InquiryItem) => {
    inquiry.value = newGood
  }

  return {
    good,
    setGood,
    inquiry,
		setInquiry
  }
}) 