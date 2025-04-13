<template lang="pug">
  input(
    :type="type"
    :placeholder="placeholder"
    v-model="modelValueProxy"
    class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  )
</template>

<script setup lang="ts">
import {computed, defineProps, defineEmits} from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})
</script>
