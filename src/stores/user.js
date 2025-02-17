import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import AuthAPI from "@/api/auth";
export const useUserStore = defineStore('user', () => {

  // 登录
  const isLogin = ref(false)
  const loginFn = async () => {
    await AuthAPI.csrf();
    await AuthAPI.login(formData.value).then((data) => {
      localStorage.setItem('isAuthenticated', true);
      isLogin.value = true
      // router.replace({ path: "/dashboard" });
    });
  }
  // 获取用户信息
  const info = ref({})
  const getInfo = async () => {
    info.value = await AuthAPI.user()
  }
  return { isLogin, loginFn, info, getInfo }
}, {
  persist: true
})
