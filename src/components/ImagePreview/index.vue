<template>

  <!-- 图片预览遮罩层 -->
  <div class="h-full fixed z-9 left-0 right-0 top-0 bottom-0  bg-[rgba(0,0,0,.8)] flex items-center justify-center"
    v-if="showPreview" @click="closePreview">
    <div class="close-btn z-10 absolute top-[20px] right-[20px]" @click="closePreview">
      <van-icon name="cross" size="24" color="#fff" />
    </div>
    <swiper ref="swiperRef" @slide-change="handleSlideChange" :initial-slide="currentIndex" :modules="modules"
      :zoom="true" :pagination="{
        type: 'fraction',
      }">
      <swiper-slide v-for="(item) in images" :key="item">
        <div class="swiper-zoom-container">
          <img :src="item" @click.stop="onClickImage" @dblclick.stop="toggleZoom">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Zoom, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/zoom'
import 'swiper/css/pagination'
const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  }
})

const swiperRef = ref(null)
const showPreview = ref(false)
const currentIndex = ref(0)
const isZoomed = ref(false)

// 点击图片
const onClickImage = () => {
  if (isZoomed.value) {
    toggleZoom()
  }
}

// 切换缩放状态
const toggleZoom = () => {
  if (!swiperRef.value) return
  const zoom = swiperRef.value.swiper.zoom
  if (zoom.scale > 1) {
    zoom.out()
    isZoomed.value = false
  } else {
    zoom.in()
    isZoomed.value = true
  }
}

// 开启图片预览
const openPreview = (index) => {
  currentIndex.value = index
  showPreview.value = true
}

// 关闭图片预览
const closePreview = () => {
  if (isZoomed.value) {
      zoomOut()
    } else {
      showPreview.value = false
    }
  
}

// 滑动切换回调
const handleSlideChange = (swiper) => {
  currentIndex.value = swiper.activeIndex
}

// Swiper 模块配置
const modules = [Zoom, Pagination]
// 暴露方法给父组件
defineExpose({
  openPreview,
  closePreview
})
</script>

<style scoped lang="scss">
:deep(.swiper) {
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .swiper-pagination {
    color: #fff;
  }
}
</style>