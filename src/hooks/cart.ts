import { ref, computed, watch, type Ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { carApi } from '@/api'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'


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

export const useCart = () => {
	const { setItems } = useCartStore()
	const items = ref<CartItem[]>([])
	const selectedRowKeys = ref<number[]>([])
	const loading = ref(false)
	const route = useRoute()

	// 防抖更新
	const debouncedUpdateCart = useDebounceFn(async (id: number, product_num: number) => {
		const res = await carApi.editCart({ id, product_num })
		if (res.code !== 1) return
		selectedRowKeys.value = [...selectedRowKeys.value]
	}, 500)

	// 获取购物车数据
	const initItems = async (no_loading: boolean, selectedAll: boolean = true) => {
		if (!no_loading) loading.value = true
		const res = await carApi.getCarList({ page: 1, limit: 999 })
		if (!no_loading) loading.value = false

		if (res.code !== 1) {
			// res.code == 303 && clearUser()
			return
		}
		const cart_list = res.data.list
		items.value = cart_list
		if (selectedAll) {
			selectedRowKeys.value = cart_list.map((item: CartItem) => item.id)
		}

		setItems(items.value)
	}

	const removeItem = async (id: number) => {
		const res = await carApi.delCart({ ids: [id] })
		if (res.code !== 1) return
		items.value = items.value.filter(item => item.id !== id)
		selectedRowKeys.value = selectedRowKeys.value.filter(item => item !== id)

		setItems(items.value)
	}

	const updateQuantity = (id: number, product_num: number) => {
		items.value = items.value.map(item => item.id === id ? { ...item, product_num } : item)
		debouncedUpdateCart(id, product_num)

		setItems(items.value)
	}

	const toggleSelect = (selected: boolean, id: number) => {
		if (selected) {
			selectedRowKeys.value = [...selectedRowKeys.value, id]
		} else {
			selectedRowKeys.value = selectedRowKeys.value.filter(item => item !== id)
		}
	}

	const toggleSelectAll = (selected: boolean) => {
		selectedRowKeys.value = selected ? items.value.map(item => item.id) : []
	}

	const clearCart = async (ids: number[]) => {
		const res = await carApi.delCart({ ids })
		if (res.code !== 1) return
		items.value = []
		selectedRowKeys.value = []

		setItems(items.value)
	}

	const totalItems = computed(() => items.value.length)
	const isAllSelected = computed(() =>
		items.value.length > 0 && items.value.every(item => selectedRowKeys.value.includes(item.id))
	)

	// 自动初始化
	// watch(
	//   () => user.value,
	//   (val) => {
	//     if (val) {
	//       const isCartPage = route.path === '/cart'
	//       initItems(!isCartPage)
	//     }
	//   },
	//   { immediate: true }
	// )

	return {
		loading,
		removeItem,
		updateQuantity,
		toggleSelect,
		toggleSelectAll,
		clearCart,
		selectedRowKeys,
		isAllSelected,
		initItems,
	}
}
