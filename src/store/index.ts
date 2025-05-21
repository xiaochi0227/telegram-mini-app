import { defineStore } from 'pinia';
import { initTelegramWebApp } from '../utils/telegram';
import { authApi } from '@/api/auth';
import { useUser } from '@/hooks/user';
import { Notify } from 'vant';


export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface Theme {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

export const useAppStore = defineStore('app', {
  state: () => ({
    tg_user_id: '',
    user: null as User | null,
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      buttonColor: '#2481cc',
      buttonTextColor: '#ffffff',
    } as Theme,
  }),

  actions: {
    setUser(user: User | null) {
      this.user = user;

      if (!user) return 

      localStorage.setItem('tg_user', JSON.stringify(user));
      this.setTgUserId(user)
    },
    

    setTheme(theme: Partial<Theme>) {
      this.theme = {
        ...this.theme,
        ...theme,
      };
    },

    // 设置tg_user_id
    setTgUserId(user: User | null) {
      this.tg_user_id = user?.id || ''

      localStorage.setItem('tg_user_id', this.tg_user_id);
    },

    async initTelegramApp() {
      const isInitialized = await initTelegramWebApp();

      if (!isInitialized) return

      const webApp = window.Telegram?.WebApp;

      if (!webApp) return

      // 检查用户信息
      if (webApp.initDataUnsafe.user) {
        this.setUser(webApp.initDataUnsafe.user);
      } else {
        Notify({ type: 'danger', message: '用户未授权，请通过 Telegram 客户端重新打开 WebApp。'})
      }

      // 校验
      const res = await authApi.tgUserCheck(webApp.initData)

      if (res.code != 1 && !res.data) {
        Notify({ type: 'danger', message: '用户校验未通过'})
        return
      }

      // 默认登录 如果登录过就会返回用户信息，没有就不放入缓存
      const { user, tgLogin } = useUser()

      if (!user.value) tgLogin({ tg_user_id: this.tg_user_id, user_id: '' })

      // // 设置主题
      // if (webApp.themeParams) {
      //   this.setTheme({
      //     backgroundColor: webApp.themeParams.bg_color || '#ffffff',
      //     textColor: webApp.themeParams.text_color || '#000000',
      //     buttonColor: webApp.themeParams.button_color || '#2481cc',
      //     buttonTextColor: webApp.themeParams.button_text_color || '#ffffff',
      //   });
      // }
    },
  },
}); 