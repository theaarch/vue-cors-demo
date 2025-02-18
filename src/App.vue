<template>
  <RouterView />
</template>

<script setup>
import useUserStore from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

watch(
  () => userStore.isLogin,
  (newVal) => {
    console.log(newVal);
    if (newVal) {
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }
);

onMounted(() => {
  console.log();
  if (userStore.isLogin) {
    router.replace("/");
  } else {
    router.replace("/login");
  }
});
</script>
