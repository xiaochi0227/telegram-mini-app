import { createStore } from 'vuex';

export interface State {
  user: {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
  } | null;
  theme: {
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    buttonTextColor: string;
  };
}

export default createStore<State>({
  state: {
    user: null,
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      buttonColor: '#2481cc',
      buttonTextColor: '#ffffff',
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_THEME(state, theme) {
      state.theme = {
        ...state.theme,
        ...theme,
      };
    },
  },
  actions: {
    initTelegramApp({ commit }) {
      const webApp = window.Telegram?.WebApp;
      if (webApp) {
        // 设置用户信息
        if (webApp.initDataUnsafe.user) {
          commit('SET_USER', webApp.initDataUnsafe.user);
        }
        
        // 设置主题
        if (webApp.themeParams) {
          commit('SET_THEME', {
            backgroundColor: webApp.themeParams.bg_color || '#ffffff',
            textColor: webApp.themeParams.text_color || '#000000',
            buttonColor: webApp.themeParams.button_color || '#2481cc',
            buttonTextColor: webApp.themeParams.button_text_color || '#ffffff',
          });
        }
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    userInfo: (state) => state.user,
    theme: (state) => state.theme,
  },
}); 