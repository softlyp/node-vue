<template lang="pug">
  div(class="flex justify-center items-center h-screen bg-gray-100")
    div(class="bg-white p-8 rounded-lg shadow-md w-96")
      h1(class="text-2xl font-semibold text-center mb-6") Crear Cuenta
      form(@submit.prevent="register")
        div(class="mb-4")
          TextInput(v-model="username" placeholder="Usuario")
        div(class="mb-6")
          TextInput(v-model="password" type="password" placeholder="Cree Contraseña")
        Btn( :loading="isLoading" :disabled="isLoading" variant="primary" type="submit") Crear Cuenta
</template>

<script setup lang="ts">
import {ref, inject} from 'vue'
import {useRouter} from 'vue-router'
import {api_host} from '../config/constants'
import {useAuthStore} from '../store/authStore'
import TextInput from '../components/TextInput.vue'
import Btn from '../components/Btn.vue'

const axios = inject('axios') as any
const authStore = useAuthStore()
const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(false)

const register = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    return
  }
  try {
    isLoading.value = true
    const res = await axios.post(`${api_host}/auth/register`, {
      username: username.value,
      password: password.value
    })

    if (res.data) {
      alert(res.data.message)
      router.push('/login')
    }
  } catch {
    alert('Error al crear cuenta')
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 800)
  }
}
</script>
