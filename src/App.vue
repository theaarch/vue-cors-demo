<template>
  <RouterView />
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

watch(
  () => userStore.isAuthenticated,
  (newValue) => {
    console.log(newValue);
    if (newValue) {
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }
);

onMounted(() => {
  if (userStore.isAuthenticated) {
    router.replace("/");
  } else {
    router.replace("/login");
  }
});
</script>
