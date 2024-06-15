import { type Ref, computed, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useQueryClient } from '@tanstack/vue-query'
import type { DatasourceColumn } from '@/api/datasources/types'
import { queryKeys } from '@/api/queryKeys'

const preprocessingTasks = ref<PreprocessingTask[]>([])

function removeTask(task: PreprocessingTask) {
  const index = preprocessingTasks.value.indexOf(task)
  preprocessingTasks.value.splice(index, 1)
}

function reopenTask(task: PreprocessingTask) {
  task.isOpen = true
}

type PreprocessingState = 'new' | 'in_progress' | 'done' | 'failed'
const activeStates: PreprocessingState[] = ['in_progress', 'failed', 'done']

export function useDataPreprocessing() {
  function open(source: PreprocessingSource) {
    preprocessingTasks.value.push({
      commonId: constructCommonId(source),
      state: 'new',
      isOpen: true,
      source,
      attributes: [],
    })
  }

  const activeTasks = computed(() => {
    return preprocessingTasks.value.filter(task => activeStates.includes(task.state))
  })

  const tasksInProgress = computed(() => {
    return preprocessingTasks.value.filter(task => task.state === 'in_progress')
  })

  const isLoading = computed(() => {
    return tasksInProgress.value.length > 0
  })

  return {
    open,
    removeTask,
    reopenTask,
    activeTasks,
    isLoading,
    tasks: preprocessingTasks,
  }
}

export function useDataPreprocessingTask(task: Ref<PreprocessingTask>) {
  const queryClient = useQueryClient()

  const isOpen = computed(() => {
    return task.value.isOpen
  })

  function close() {
    task.value.isOpen = false
    if (task.value.state === 'new') remove()
  }

  function remove() {
    removeTask(task.value)
  }

  useEventListener(window, 'message', ({ data }: MessagePayload) => {
    if (data.type !== 'preprocessing') return
    if (!task.value.id) {
      if (task.value.commonId !== data.attributes.map(attribute => attribute.columnId).join('-')) return
      task.value.id = constructId(data.attributes)
      task.value.attributes = data.attributes
    }

    if (task.value.id !== constructId(data.attributes)) return
    task.value.state = data.state

    if (data.state === 'done') {
      queryClient.invalidateQueries({ queryKey: queryKeys.metasources.active() })
      task.value.isOpen = false
      removeTask(task.value)
    }
  })

  return {
    isOpen,
    close,
  }
}

type MessagePayload = MessageEvent<{
  type: string
  state: PreprocessingState
  attributes: PreprocessingAttribute[]
}>

export type PreprocessingTask = {
  id?: string
  commonId: string
  state: PreprocessingState
  isOpen: boolean
  source: PreprocessingSource
  attributes: PreprocessingAttribute[]
}

type PreprocessingAttribute = {
  id: number
  name: string
  columnId: number
  columnName: string
}
export type PreprocessingSource = Partial<DatasourceColumn>[]

function constructId(source: PreprocessingAttribute[]) {
  return source.map(column => column.id).join('-')
}
function constructCommonId(source: PreprocessingSource) {
  return source.map(column => column.id).join('-')
}
