<template>
  <div>
    <p>已登陆</p>
    <p>首页</p>
    {{ userStore.info }}
  </div>
</template>
<script setup>
import useUserStore from "@/stores/user";
const userStore = useUserStore();
</script>
<style></style>