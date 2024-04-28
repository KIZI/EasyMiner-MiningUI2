<template>
  <div
    v-if="debouncedErrorMessage"
    class="flex gap-x-2 rounded-sm border border-red-300 bg-red-50 px-2 pb-1 pt-0.5 text-xs font-medium leading-4 text-red-700 transition-opacity"
    :class="{
      'opacity-30': mutation.isPending.value,
    }"
  >
    <icon-ph-warning class="mt-0.5 size-4 shrink-0" />
    {{ debouncedErrorMessage }}
  </div>
</template>

<script setup lang="ts">
import type { UseMutationReturnType } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  mutation: UseMutationReturnType<any, any, any, any>
}>()

const errorMessage = computed(() => {
  const error = props.mutation.error.value as AxiosError
  if (!error) return null
  if (!error.response) return 'An error occurred. Please try again.'

  const data = error.response.data as { message?: string, errors?: { message: string }[] }
  const fieldMessage = data?.errors?.[0]?.message
  const generalMessage = data?.message

  return fieldMessage ?? generalMessage
})

const debouncedErrorMessage = ref(errorMessage.value)

watch(errorMessage, () => {
  if (props.mutation.isPending.value) return
  debouncedErrorMessage.value = errorMessage.value
})
</script>
