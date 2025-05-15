import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { Button, NavBar, Cell, CellGroup, Empty, Icon } from 'vant'
import 'vant/lib/index.css'

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

// 注册 Vant 组件
app.use(Button)
   .use(NavBar)
   .use(Cell)
   .use(CellGroup)
   .use(Empty)
   .use(Icon)

// 使用路由和状态管理
app.use(router)
   .use(pinia)

app.mount('#app')
