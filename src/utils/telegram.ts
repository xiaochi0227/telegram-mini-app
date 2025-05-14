import config from '../config';


export async function initTelegramWebApp(): Promise<boolean> {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.error('Telegram WebApp is not available');
    return false;
  }

  // 打印初始化数据
  console.log('Telegram WebApp init data:', webApp.initData);
  
  // 解析并打印用户信息
  const urlParams = new URLSearchParams(webApp.initData);
  const user = urlParams.get('user');
  if (user) {
    console.log('User info:', JSON.parse(user));
  }

  // 初始化 WebApp
  webApp.ready();
  webApp.expand();

  return true;
} 