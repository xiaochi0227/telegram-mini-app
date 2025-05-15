import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export interface CartItem {
  id: number
  images: string
  product_name: string
  price: number
  product_num: number
  unit_price: number
  service_price: number
  selected?: boolean
  initial_quantity?: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])


  const setItems = (newItems: CartItem[]) => {
    items.value = newItems
  }

  // 监听 items 的变化
  watch(
    items,
    (newVal, oldVal) => {
      console.log('Cart items changed:', { newVal, oldVal })
    },
    { deep: true }
  )

  const totalItems = computed(() => items.value.length)

  return {
    items,
    totalItems,
		setItems
  }
}) 