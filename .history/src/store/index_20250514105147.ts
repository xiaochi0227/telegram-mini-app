import { defineStore } from 'pinia';
import { initTelegramWebApp } from '../utils/telegram';

export interface User {
  id?: number;
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
    user: null as User | null,
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      buttonColor: '#2481cc',
      buttonTextColor: '#ffffff',
    } as Theme,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userInfo: (state) => state.user,
    theme: (state) => state.theme,
  },

  actions: {
    setUser(user: User | null) {
      this.user = user;
    },

    setTheme(theme: Partial<Theme>) {
      this.theme = {
        ...this.theme,
        ...theme,
      };
    },

    async initTelegramApp() {
      const isInitialized = await initTelegramWebApp();
      if (isInitialized) {
        const webApp = window.Telegram?.WebApp;
        if (webApp) {
          // 设置用户信息
          if (webApp.initDataUnsafe.user) {
            this.setUser(webApp.initDataUnsafe.user);
          }
          
          // 设置主题
          if (webApp.themeParams) {
            this.setTheme({
              backgroundColor: webApp.themeParams.bg_color || '#ffffff',
              textColor: webApp.themeParams.text_color || '#000000',
              buttonColor: webApp.themeParams.button_color || '#2481cc',
              buttonTextColor: webApp.themeParams.button_text_color || '#ffffff',
            });
          }
        }
      }
    },
  },
}); 