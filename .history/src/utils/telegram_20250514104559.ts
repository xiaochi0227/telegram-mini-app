import config from '../config';

async function sha256(message: string): Promise<ArrayBuffer> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return hashBuffer;
}

async function hmacSha256(key: ArrayBuffer, message: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const msgBuffer = new TextEncoder().encode(message);
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgBuffer);
  return signature;
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function validateInitData(initData: string): Promise<boolean> {
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
    const secretKey = await sha256('WebAppData');
    const hmac = await hmacSha256(secretKey, dataCheckString);
    const hmacHex = arrayBufferToHex(hmac);

    return hmacHex === hash;
  } catch (error) {
    console.error('Error validating init data:', error);
    return false;
  }
}

export async function initTelegramWebApp(): Promise<boolean> {
  const webApp = window.Telegram?.WebApp;
  if (!webApp) {
    console.error('Telegram WebApp is not available');
    return false;
  }

  // 验证初始化数据
  const isValid = await validateInitData(webApp.initData);
  if (!isValid) {
    console.error('Invalid init data');
    return false;
  }

  // 初始化 WebApp
  webApp.ready();
  webApp.expand();

  return true;
} 