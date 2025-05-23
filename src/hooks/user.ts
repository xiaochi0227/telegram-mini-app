import { ref, computed, readonly } from 'vue';
import { useRouter } from 'vue-router';
import type { TgLoginParams, LoginParams, RegisterParams, TgCodeParams } from '@/api/types';
import { authApi } from '@/api/auth';

export interface User {
  id: string;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
  token?: string;
}

export function useUser() {
  const router = useRouter();
  const user = ref<User | null>(null);
  const loading = ref(true);

  // 初始化检查用户登录状态
  const checkAuth = () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        user.value = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // 清除可能损坏的数据
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      loading.value = false;
    }
  };

  // 立即执行检查
  checkAuth();

  //选择登录对应的pakupay账号
  // 进入后先调用该接口判断是否之前登陆过，登陆过就默认登录并放入登录信息
  const tgLogin = async (params: TgLoginParams): Promise<boolean> => {
    try {
      const res = await authApi.tgLogin(params);

      if (res.code !== 1 || !res.data || !res.data.userInfo) return false;

      const { userInfo } = res.data;

      // 存储认证数据到 localStorage
      localStorage.setItem('token', userInfo.token);
      localStorage.setItem('user', JSON.stringify(userInfo));

      user.value = userInfo;
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // 登录
  const login = async (params: LoginParams): Promise<boolean> => {
    try {
      const res = await authApi.login(params);

      if (res.code !== 1) return false;
      const { userInfo } = res.data;

      // 存储认证数据到 localStorage
      localStorage.setItem('token', userInfo.token);
      localStorage.setItem('user', JSON.stringify(userInfo));

      user.value = userInfo;
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  // 注册
  const register = async (params: RegisterParams): Promise<boolean> => {
    try {
      const res = await authApi.register(params);

      if (res.code !== 1) return false;
      const { userInfo } = res.data;

      // 存储认证数据到 localStorage
      localStorage.setItem('token', userInfo.token);
      localStorage.setItem('user', JSON.stringify(userInfo));

      user.value = userInfo;
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  // 获取验证码
  const getVerificationCode = async (params: TgCodeParams): Promise<boolean> => {
    try {
      const res = await authApi.getTgChatCode(params);

      if (res.code !== 1) return false;

      return true;
    } catch (error) {
      console.error('get verify code:', error);
      return false;
    }
  };

  // 登出
  const logout = async (): boolean => {
    try {
      const res = await authApi.logout()

      if (res.code !== 1) return false;

      clearUser()

      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      return false;
    }
  };

  // 清除用户数据
  const clearUser = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    user.value = null;
    router ? router.push('/') : location.href = '/'
  };

  // 设置用户名
  const setUserName = (username: string): void => {
    if (!user.value) return;

    const updatedUser = { ...user.value, nickname: username };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    user.value = updatedUser;
  };

  // 设置用户
  const setUser = (newUser: User | null | ((prev: User | null) => User | null)): void => {
    if (typeof newUser === 'function') {
      const updatedUser = newUser(user.value);
      user.value = updatedUser;
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } else {
      user.value = newUser;
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
      }
    }
  };

  // 暴露只读的用户状态
  const currentUser = computed(() => readonly(user.value));

  return {
    user: currentUser,
    loading: readonly(loading),
    login,
    register,
    logout,
    clearUser,
    setUserName,
    setUser,
    checkAuth,
    tgLogin,
    getVerificationCode
  };
}
