<template>
  <div />
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

declare function fetchNote(id: any): Promise<any>

// const noteId = computed(() => useRoute().query.id);

const noteDetail = ref()
const isLoading = ref(false)

watch(noteId, async () => {
  isLoading.value = true
  try {
    noteDetail.value = await fetchNote(noteId.value)
  }
  finally {
    isLoading.value = false
  }
}, { immediate: true })

const noteId = computed(() => useRoute().query.id)

const noteDetailQuery = useQuery({
  queryKey: ['notes', noteId],
  queryFn: () => fetchNote(noteId.value),
  staleTime: 60 * 1000 * 5, // 5 minutes,
})

const { isLoading, data, isSuccess, isError } = noteDetailQuery

noteDetailQuery
</script>
