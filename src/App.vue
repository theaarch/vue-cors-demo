<template>
  <RouterView />
</template>
<script setup>
// import useUserStore from "@/stores/user";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// const userStore = useUserStore();
onMounted(() => {
  // console.log(userStore.isLogin);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated) {
    router.replace({ path: "/dashboard" });
  } else {
    router.replace({ path: "/login" });
  }
})
</script>
