import { defineStore } from "pinia";
import AuthAPI from "@/api/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
  },

  actions: {
    async login(formData) {
      await AuthAPI.csrf();
      await AuthAPI.login(formData);
      await this.fetchUser();
    },

    async logout(callAPI = true) {
      if (callAPI) {
        await AuthAPI.logout();
      }

      this.user = null;
    },

    async fetchUser() {
      const data = await AuthAPI.user();
      this.user = data.data;
    },
  },

  persist: true,
});
