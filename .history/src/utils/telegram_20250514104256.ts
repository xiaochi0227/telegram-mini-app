import crypto from 'crypto';
import config from '../config';

export function validateInitData(initData: string): boolean {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    // 按字母顺序排序参数
    const params: string[] = [];
    urlParams.forEach((value, key) => {
      params.push(`${key}=${value}`);
    });
    params.sort();

    // 创建数据检查字符串
    const dataCheckString = params.join('\n');

    // 创建 HMAC-SHA-256 哈希
    const secretKey = crypto.createHmac('sha256', 'WebAppData')
      .update(config.botToken)
      .digest();

    const hmac = crypto.createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return hmac === hash;
  } catch (error) {
    console.error('Error validating init data:', error);
    return false;
  }
}

export function initTelegramWebApp() {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.error('Telegram WebApp is not available');
    return false;
  }

  // 验证初始化数据
  if (!validateInitData(webApp.initData)) {
    console.error('Invalid init data');
    return false;
  }

  // 初始化 WebApp
  webApp.ready();
  webApp.expand();

  return true;
} 