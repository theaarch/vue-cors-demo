<template>
  <div class="main">
    <div class="main-pack">
      <pre>{{ userStore.info }}</pre>

      <button @click="userStore.getInfo()">更新个人信息</button>
      <button @click="userStore.logoutFn()">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import useUserStore from "@/stores/user";

const userStore = useUserStore();
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.main-pack {
  width: 400px;
}
</style>
