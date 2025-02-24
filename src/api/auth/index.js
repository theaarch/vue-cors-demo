import request from "@/utils/request";

const AuthAPI = {
  csrf() {
    return request({
      url: `/csrf-cookie`,
      method: "get",
    });
  },

  login(data) {
    return request({
      url: `/login`,
      method: "post",
      data: data,
    });
  },

  logout() {
    return request({
      url: `/logout`,
      method: "post",
    });
  },

  user() {
    return request({
      url: `/api/user`,
      method: "get",
    });
  },
};

export default AuthAPI;
