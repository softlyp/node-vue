<template lang="pug">
  button(
    :type="type"
    :disabled="isDisabled"
    :class="buttonClass"
    class="w-full inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition duration-150 ease-in-out"
  )
    span(
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full"
    )
    slot
</template>

<script lang="ts" setup>
import {computed, defineProps} from 'vue'

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  loading?: boolean
}>()

const isDisabled = computed(() => props.disabled || props.loading)

const buttonClass = computed(() => {
  const base = 'focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  const disabledClass = isDisabled.value
      ? 'opacity-50 cursor-not-allowed'
      : ''

  return `${base} ${variants[props.variant || 'primary']} ${disabledClass}`
})
</script>
