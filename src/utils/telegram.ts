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
        requestPhone: () => Promise<{ phone_number: string }>;
      };
    };
  }
}


export async function initTelegramWebApp(): Promise<boolean> {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.error('Telegram WebApp is not available');
    return false;
  }

  // 初始化 WebApp
  webApp.ready();
  webApp.expand();

  return true;
}

export async function requestPhoneNumber(): Promise<string | null> {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.error('Telegram WebApp is not available');
    return null;
  }

  try {
    const result = await webApp.requestPhone();
    return result.phone_number;
  } catch (error) {
    console.error('Failed to get phone number:', error);
    return null;
  }
} 