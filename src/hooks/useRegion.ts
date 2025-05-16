import { ref } from 'vue'
import { addressApi } from '@/api'
import { Notify } from 'vant'

interface RegionItem {
  id: string
  name: string
  [key: string]: any
}

const getCache = (key: string): RegionItem[] | null => {
  const cached = localStorage.getItem(key)
  if (!cached) return null
  return JSON.parse(cached)
}

const setCache = (key: string, data: RegionItem[]) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const useRegion = () => {
  const countries = ref<RegionItem[]>([])
  const provinces = ref<RegionItem[]>([])
  const cities = ref<RegionItem[]>([])

  // 获取国家列表
  const fetchCountries = async () => {
    try {
      const cachedData = getCache('countries')
      if (cachedData) {
        countries.value = cachedData
        return
      }

      const res = await addressApi.getAddressConfig({ type: '1', parent_id: '0' })
      
      if (res.code != 1) return;

      const data = res.data?.data || []
      countries.value = data
      setCache('countries', data)
    } catch (error) {
      console.error('Failed to fetch countries:', error)
      Notify({ message: '获取国家列表失败', type: 'danger' })
    }
  }

  // 获取省份列表
  const fetchProvinces = async (countryId: string) => {
    try {
      const cacheKey = `provinces_${countryId}`
      const cachedData = getCache(cacheKey)
      if (cachedData) {
        provinces.value = cachedData
        return
      }

      const res = await addressApi.getAddressConfig({ type: '2', parent_id: countryId })
      
      if (res.code != 1) return;

      const data = res.data?.data || []
      provinces.value = data
      setCache(cacheKey, data)
    } catch (error) {
      console.error('Failed to fetch provinces:', error)
      Notify({ message: '获取省份列表失败', type: 'danger' })
    } 
  }

  // 获取城市列表
  const fetchCities = async (provinceId: string) => {
    try {
      const cacheKey = `cities_${provinceId}`
      const cachedData = getCache(cacheKey)
      if (cachedData) {
        cities.value = cachedData
        return
      }

      const res = await addressApi.getAddressConfig({ type: '3', parent_id: provinceId })
      
      if (res.code != 1) return;

      const data = res.data?.data || []
      cities.value = data
      setCache(cacheKey, data)
    } catch (error) {
      console.error('Failed to fetch cities:', error)
      Notify({ message: '获取城市列表失败', type: 'danger' })
    }
  }

  return {
    countries,
    provinces,
    cities,
    fetchCountries,
    fetchProvinces,
    fetchCities
  }
}
