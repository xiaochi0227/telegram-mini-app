import { Dialog } from 'vant'; // 假设你使用的是 Vant 的 Dialog 组件

interface Contact {
  contact: string;
}

export function useContactHandler() {
  const handleContact = (contact: Contact['contact']): void => {
    // 检查是否在 Telegram WebApp 环境中
    const isTelegramWebApp = window.Telegram && window.Telegram.WebApp;

    try {
      if (isTelegramWebApp) {
        // 尝试使用 Telegram WebApp API
        window.Telegram.WebApp.openLink(contact);
      } else {
        // 非 Telegram WebApp 环境，直接打开链接
        window.open(contact, '_blank');
      }
    } catch (e) {
      // 如果上述方法都失败，使用回退方案
      let msg = '';
      let textToCopy = '';

      if (contact.startsWith('tel:')) {
        textToCopy = contact.replace('tel:', '');
        msg = `电话号码 ${textToCopy} 已复制，请打开拨号界面粘贴拨打`;
      } else if (contact.startsWith('mailto:')) {
        textToCopy = contact.replace('mailto:', '');
        msg = `邮箱 ${textToCopy} 已复制`;
      } else {
        textToCopy = contact;
        msg = `链接已复制到剪贴板`;
      }

      // 尝试复制到剪贴板
      try {
        navigator.clipboard.writeText(textToCopy);
        // 使用弹窗提示
        Dialog.alert({
          message: msg,
        });
      } catch (clipboardError) {
        // 如果复制到剪贴板也失败，直接显示消息
        Dialog.alert({
          message: msg,
        });
      }
    }
  };

  return {
    handleContact,
  };
}