<template>
  <div id="app">
    <nav class="bg-gray-800 p-4 flex gap-4 text-white">
      <router-link to="/register" v-if="!auth.isAuthenticated" class="hover:text-gray-300">¿No tienes cuenta?</router-link>
      <router-link to="/login"v-if="!auth.isAuthenticated" class="hover:text-gray-300">Acceder</router-link>
      <button @click="exit" v-if="auth.isAuthenticated" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Cerrar sesión</button>
    </nav>
    <router-view />
  </div>
</template>
<script>

import { useRouter } from 'vue-router';
import { useAuthStore } from './store/authStore';

export default {
  setup() {
    const router = useRouter();
    const auth = useAuthStore();

    const exit = () => {
      router.push('login')
      auth.logout()
    }
 
    
    return {
      auth,
      exit
    };
  }
};
</script>

<style>
nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>