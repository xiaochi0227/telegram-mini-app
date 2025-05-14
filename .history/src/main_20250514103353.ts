import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, NavBar, Cell, CellGroup, Empty, Icon } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

// 注册 Vant 组件
app.use(Button)
   .use(NavBar)
   .use(Cell)
   .use(CellGroup)
   .use(Empty)
   .use(Icon)

// 使用路由和状态管理
app.use(router)
   .use(store)

app.mount('#app')
