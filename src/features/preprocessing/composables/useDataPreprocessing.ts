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

// const dataPreprocessing = useDataPreprocessing();
// window.dataPreprocessing = dataPreprocessing;
// dataPreprocessing.open([
//   { id: 1, name: 'x' },
//   { id: 2, name: 'x' },
//   { id: 3, name: 'x' },
//   { id: 4, name: 'x' },
//   { id: 5, name: 'x' },
//   { id: 6, name: 'x' },
// ]);

window.postMessage({
  type: 'preprocessing',
  attributes: [
    { id: 1, columnId: 1, columnName: 'created attribute name' },
    { id: 2, columnId: 2, columnName: 'created attribute name' },
    { id: 3, columnId: 3, columnName: 'created attribute name' },
    { id: 4, columnId: 4, columnName: 'created attribute name' },
    { id: 5, columnId: 5, columnName: 'created attribute name' },
    { id: 6, columnId: 6, columnName: 'created attribute name' },
  ],
  state: 'in_progress',
})

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

  return {
    open,
    removeTask,
    reopenTask,
    activeTasks,
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
    console.log({ data })

    if (!task.value.id) {
      if (task.value.commonId !== data.attributes.map(attribute => attribute.columnId).join('-')) return
      task.value.id = constructId(data.attributes)
      task.value.attributes = data.attributes
    }

    if (task.value.id !== constructId(data.attributes)) return

    task.value.state = data.state
    task.value.isOpen = false

    if (data.state === 'done') {
      queryClient.invalidateQueries({ queryKey: queryKeys.metasources.active() })

      setTimeout(() => {
        removeTask(task.value)
      }, 5000)
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
export type PreprocessingSource = DatasourceColumn[]

function constructId(source: PreprocessingAttribute[]) {
  return source.map(column => column.id).join('-')
}
function constructCommonId(source: PreprocessingSource) {
  return source.map(column => column.id).join('-')
}

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'started',
//   column: 29550,
//   attributeName: 'amount_equifrequent_5',
// });

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'done',
//   column: 29550,
//   attributeName: 'amount_equifrequent_5',
// });

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'failed',
//   column: 29550,
//   attributeName: 'amount_equifrequent_5',
// });

// window.addEventListener('message', (event) => {
//   window.event = event;
// });

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'started',
//   column: 29550, // id zdrojového sloupce
//   attributeName: 'amount_equifrequent_5', // název vytvářeného atributu
// });

// window.parent.postMessage({
//   type: 'add-attribute',
//   state: 'started',
//   columnNames: 'amount,birth_number,District', // jména zdrojových sloupců
// });
