<template>
  <div class="login">
    <form @submit.prevent="handleLogin" class="pack">
      <div class="item">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="formData.email" />
      </div>
      <div class="item">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="formData.password"
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="remember"
          id="remember"
          v-model="formData.remember"
        />
        <label for="remember" style="margin-left: 10px">Remember me</label>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import AuthAPI from "@/api/auth";

const router = useRouter();
const userStore = useUserStore();

const formData = ref({
  email: "test@example.com",
  password: "password",
  remember: false,
});

const handleLogin = async () => {
  await userStore.login(formData.value);
};
</script>

<style>
.login {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pack {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
  background: #ebebeb;
  border-radius: 10px;
}

.item {
  height: 40px;
  width: 100%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  background: #fff;
}

.item input {
  flex: 1;
  width: 1px;
}

input {
  border: none;
  outline: none;
  height: 100%;
  padding: 0;
}
</style>
