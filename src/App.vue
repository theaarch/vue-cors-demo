<template>
  <RouterView />
</template>
<script setup>
import useUserStore from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();
watch(() => userStore.isLogin, (newVal) => {
  console.log(newVal);
  if (newVal) {
    router.replace('/');
  } else {
    router.replace('/login');
  }
})
onMounted(() => {
  console.log(userStore.isLogin);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  if (isAuthenticated) {
    router.replace('/');
  } else {
    router.replace('/login');
  }
})
</script>
