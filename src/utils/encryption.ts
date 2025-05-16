// utils/secureParams.ts
import CryptoJS from 'crypto-js';

// 密钥
const key = CryptoJS.enc.Utf8.parse('7382950164725834');
// 初始向量
const iv = CryptoJS.enc.Utf8.parse('1234567890123456');

/**
 * 加密参数（AES+Base64URL）
 * @param data 要加密的数据（对象或字符串）
 * @returns 加密后的Base64URL字符串
 */
export function encryptParams(data: unknown): string {
  try {
    // 1. 将数据转换为JSON字符串（如果是对象）
    const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);

    // 2. AES加密
    const encrypted = CryptoJS.AES.encrypt(jsonStr, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // 3. 转换为Base64URL格式（URL安全）
    return encrypted.toString().replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    console.error('加密失败:', error);
    throw error;
  }
}

/**
 * 解密参数 - 支持带IV的密文
 * @param encryptedStr 加密的Base64URL字符串
 * @returns 解密后的原始数据
 */
export function decryptParams(encryptedStr: string): unknown {
  try {
    if (!encryptedStr) {
      // console.error('解密失败: 输入字符串为空');
      return null;
    }

    // 1. 将Base64URL转换回标准Base64
    let base64 = encryptedStr.replace(/-/g, '+').replace(/_/g, '/');
    // console.log('Base64转换后:', base64);

    // 补全Base64末尾的等号
    while (base64.length % 4) {
      base64 += '=';
    }
    // console.log('补全等号后:', base64);

    // 验证Base64格式
    if (!/^[A-Z0-9+/=]+$/i.test(base64)) {
      // console.error('解密失败: 无效的Base64格式');
      return null;
    }

    // 2. AES解密
    const decrypted = CryptoJS.AES.decrypt(base64, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // 检查解密结果
    if (!decrypted || !decrypted.sigBytes) {
      // console.error('解密失败: 解密结果为空');
      return null;
    }

    const jsonStr = decrypted.toString(CryptoJS.enc.Utf8);
    // console.log('解密后的字符串:', jsonStr);

    // 3. 尝试解析为JSON对象
    try {
      const result = JSON.parse(jsonStr);
      // console.log('JSON解析结果:', result);
      return result;
    } catch (parseError) {
      // console.log('JSON解析失败，返回原始字符串');
      return jsonStr;
    }
  } catch (error) {
    // console.error('解密失败:', error);
    if (error instanceof Error) {
      // console.error('错误详情:', {
      //   message: error.message,
      //   stack: error.stack,
      //   name: error.name,
      // });
    }
    return null;
  }
}
