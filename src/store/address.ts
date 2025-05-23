import { defineStore } from 'pinia'
import { addressApi } from '@/api'
import type { Address } from '@/api/types'

interface AddressState {
  // 所有地址列表信息
  addressList: Address[]
  // 下单页面地址列表
  shippingAddress: Address[]
}

export const useAddressStore = defineStore('address', {
  state: (): AddressState => ({
    addressList: [],
    shippingAddress: []
  }),

  actions: {
    // 更新地址的memo
    updateAddressMemo(addressId: number, memo: string) {
      const address = this.shippingAddress.find(addr => addr.id == addressId)
      if (address) {
        address.memo = memo
      }
    },

    // 有edit_id就是编辑 
    // 判断 shippingAddress 中是否有这个地址。有的话覆盖。没有的话就新增
    setAddress(address: Address | null, edit_id) {
      if (!address) {
        return;
      }

      const existingIndex = this.shippingAddress.findIndex(addr => addr.id == edit_id);

      if (edit_id && existingIndex !== -1) {
        // If address exists, update it
        this.shippingAddress[existingIndex] = { ...address };
      } else {
        // If address doesn't exist, add it
        this.shippingAddress.push({ ...address });
      }
    },

    toggleAddressActive(addressId: string) {
      this.addressList.forEach(item => {
        item.active = false
      })
      const address = this.addressList.find(addr => addr.id == addressId)
      if (address) {
        address.active = !address.active
      }
    },

    setAddressList(addresses: Address[]) {
      this.addressList = addresses
    },

    // 设置确认地址页面的地址信息
    setShippingAddressList(addresses: Address[]) {
      this.shippingAddress = addresses
    },

    // 删除下单页面地址
    removeAddress(address: Address) {
      const index = this.shippingAddress.findIndex(item => item.id == address.id)

      if (index < 0) return

      this.shippingAddress.splice(index, 1)
    },

    // 获取默认地址
    async fetchDefaultAddress() {
      try {
        const res = await addressApi.getAddressList({ is_default: 1 })

        if (res.code != 1) return

        const defaultAddress = res.data?.list?.[0]

        // 如果有默认地址，并且 shippingAddress 为空，则添加默认地址到 shippingAddress
        if (defaultAddress && this.shippingAddress.length === 0) {
          this.setAddress(defaultAddress)
        }
      } catch (error) {
        console.error('Failed to fetch address list:', error)
        throw error
      }
    },

    // 获取地址列表 sids 代表要过滤的数据 cid代表选中的数据
    async fetchAddressList(sids, cid) {
      try {
        const res = await addressApi.getAddressList({ is_default: '' })

        if (res.code != 1) return

        let list = (res.data?.list || []).filter(item => {
          return !sids.map(Number).includes(+item.id)
        })

        list.forEach(item => {
          item.active = cid == item.id ? true : false
        });

        this.setAddressList(list)
      } catch (error) {
        console.error('Failed to fetch address list:', error)
        throw error
      }
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'address',
        storage: localStorage,
      },
    ],
  },
}) 