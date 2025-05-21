import { defineStore } from 'pinia';
import { initTelegramWebApp } from '../utils/telegram';
import { authApi } from '@/api/auth';
import { useUser } from '@/hooks/user';

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
        console.warn('用户未授权，请通过 Telegram 客户端重新打开 WebApp。');
      }
      // const initData = 'user=%7B%22id%22%3A5822362402%2C%22first_name%22%3A%22chen%22%2C%22last_name%22%3A%22chen%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FQtCvoZYw5bnT9koYs1AQ0o0iTlt201X_pFs9pAiDBdPy9Njmzudyteo_0C5V9Dpm.svg%22%7D&chat_instance=8935802012094820424&chat_type=private&auth_date=1747796852&signature=nIV9AZa2MxPWL0nVPUtmibtDXrbeiYF9Tk_lIZLTAGJllXQJBrjDRIjushNOKinKk9JL2csRkYl_uh2AiyYRBQ&hash=631228e6000f52da59b8fbf5cea787e8bcc39a051c915da63b28ee3437561ef8'
      const initData = webApp.initData
      const res = await authApi.tgUserCheck(initData)

      if (res.code != 1 && !res.data) {
        console.warn('用户校验未通过');
        return
      }

      // 默认登录 如果登录过就会返回用户信息，没有就不放入缓存
      useUser().tgLogin({ tg_user_id: this.tg_user_id, user_id: '' })

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