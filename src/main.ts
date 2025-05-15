import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import './assets/iconfont/iconfont.css'
import App from './App.vue'
import router from './router'
import * as Vant from './plugins/vant'
import i18n from './plugins/i18n'

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
