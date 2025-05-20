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

interface GoodsPicture {
  url: string
}

export const useInquiryStore = defineStore('inquiry', () => {
  const good = ref<GoodsItem>({})
	const inquiry = ref<InquiryItem>({})
  const goodsPicture = ref<GoodsPicture>([])

  const setGood = (newGood: GoodsItem) => {
    good.value = newGood
  }

  const setInquiry = (newGood: InquiryItem) => {
    inquiry.value = newGood
  }

  const setGoodsPicture = (picture: GoodsPicture) => {
    goodsPicture.value = picture
  }

  const removeGoodsPicture = (index) => {
    goodsPicture.value.splice(index, 1)
  }

  return {
    good,
    setGood,
    inquiry,
		setInquiry,
    goodsPicture,
    setGoodsPicture,
    removeGoodsPicture
  }
}) 