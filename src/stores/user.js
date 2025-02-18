import { defineStore } from "pinia";
import AuthAPI from "@/api/auth";

const useUserStore = defineStore(
  "user",
  () => {
    // 登录
    const isLogin = ref(false);
    const loginFn = async (formData) => {
      await AuthAPI.csrf();
      await AuthAPI.login(formData).then((data) => {
        isLogin.value = true;
        getInfo();
      });
    };

    // 退出登录
    const logoutFn = async (type = true) => {
      // type cookie是否失效 失效不调用接口
      if (type) {
        await AuthAPI.logout();
      }
      isLogin.value = false;
      info.value = {};
    };

    // 获取用户信息
    const info = ref({});
    const getInfo = async () => {
      info.value = await AuthAPI.user();
    };

    return { isLogin, loginFn, info, getInfo, logoutFn };
  },
  {
    persist: true,
  }
);

export default useUserStore;
