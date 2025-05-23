import { defineStore } from 'pinia';
import type { Address } from '@/api/types';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    addresses: [] as Address[],
    products: [] as Product[],
  }),

  actions: {
    // Address management
    setAddressList(addresses: Address[]) {
			this.addresses = addresses
		},
		setProducts(products: Product[]) {
			this.products = products
		}
  },
}); 