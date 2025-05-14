import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { Button, NavBar, Cell, CellGroup, Empty, Icon } from 'vant'
import 'vant/lib/index.css'

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
