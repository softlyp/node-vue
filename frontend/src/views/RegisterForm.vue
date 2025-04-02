<template lang="pug">
  div(class="flex justify-center items-center h-screen bg-gray-100")
    div(class="bg-white p-8 rounded-lg shadow-md w-96")
      h1(class="text-2xl font-semibold text-center mb-6") Crear Cuenta
      form(@submit.prevent="register")
        div(class="mb-4")
          input(v-model="username" placeholder="Cree Usuario" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500")
        div(class="mb-6")
          input(type="password" v-model="password" placeholder="Cree Contraseña" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500")
        button(type="submit"  class="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500") Crear Cuenta
</template>

<script lang="ts">
import {inject, ref} from 'vue';
import {api_host} from '../config/constants'
import {useAuthStore} from '../store/authStore';
import {useRouter} from "vue-router";

export default {
  setup() {
    const axios = inject("axios");
    const authStore = useAuthStore(); 
    const router = useRouter();

    const username = ref('');
    const password = ref('');
    const register = async () => {
      try {
        const res = await axios.post(`${api_host}/auth/register`,
            {username: username.value, password: password.value}
        );
        if (res.data) {
          alert(res.data.message);
          router.push('/login');
        }
      } catch {
        alert('error al crear Cuenta');
      }
    }

    return {
      username,
      password,
      register
    };
  }
};


</script>
