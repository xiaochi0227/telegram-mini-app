// Telegram WebApp 类型定义
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        initData: string;
        showPopup: (params: {
          title: string;
          message: string;
          buttons: Array<{ id: string; type: string; text: string }>;
        }) => void;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        onEvent: (event: string, callback: () => void) => void;
      };
    };
  }
}

export async function initTelegramWebApp(): boolean {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.error('Telegram WebApp is not available');
    return false;
  }

  // 初始化 WebApp
  webApp.ready();
  webApp.expand();

  return true
}

// 注意：获取手机号需要通过 Bot API 实现，这里只提供获取用户基本信息的函数 