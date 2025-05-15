import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './assets/iconfont/iconfont.css'
import App from './App.vue'
import router from './router'
import * as Vant from './plugins/vant'
import i18n from './plugins/i18n'

// 动态设置根字体大小
function setRootFontSize() {
   const baseSize = 32 // 基础值，设计稿宽度为 375px 时的 rootValue
   const designWidth = 750 // 设计稿宽度
   const screenWidth = document.documentElement.clientWidth || window.innerWidth
 
   // 根据屏幕宽度动态计算 font-size
   const fontSize = (screenWidth / designWidth) * baseSize
 
   // 设置到 html 的根元素
   document.documentElement.style.fontSize = `${fontSize}px`
 }
 
 // 初始化根字体大小
 setRootFontSize()
 
 // 监听窗口大小变化，实时调整
 window.addEventListener('resize', setRootFontSize)

const app = createApp(App)
const pinia = createPinia()

// 注册所有 Vant 组件
Object.values(Vant).forEach(component => {
  if (component && component.name) {
    app.use(component)
  }
})

console.log('i18n:', i18n)

// 使用路由、状态管理和国际化
app.use(router)
   .use(pinia)
   .use(i18n)

app.mount('#app')
