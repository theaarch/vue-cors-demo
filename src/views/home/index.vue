<template>
  <div class="main">
    <div class="main-pack">
      <pre>{{ userStore.user }}</pre>

      <button @click="userStore.fetchUser()">Fetch User</button>
      <button @click="userStore.logout()">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

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
