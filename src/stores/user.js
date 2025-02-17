import { defineStore } from 'pinia'
import AuthAPI from "@/api/auth";
const useUserStore = defineStore('user', () => {

  // 登录
  const isLogin = ref(false)
  const loginFn = async (formData) => {
    await AuthAPI.csrf();
    await AuthAPI.login(formData).then((data) => {
      isLogin.value = true
      getInfo()
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

export default useUserStore