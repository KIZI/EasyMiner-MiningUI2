import { defineStore } from 'pinia'
import { computed, readonly, ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const activeTaskId = ref<number | null>(null)

  const isTaskSelected = computed(() => Boolean(activeTaskId.value))

  function setActiveTaskId(id: number) {
    activeTaskId.value = id
  }

  function clearActiveTask() {
    activeTaskId.value = null
  }

  return {
    activeTaskId: readonly(activeTaskId),
    clearActiveTask,
    isTaskSelected,
    setActiveTaskId,
  }
})
