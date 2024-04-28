import { useMutation } from '@tanstack/vue-query'
import { createSharedComposable } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { api } from '@/api/api'
import type { MiningState } from '@/features/rulesMining/types/rulesMining.types'
import { useMinerQuery } from '@/api/miners/useMinerQuery'
import { useTaskRulesQuery } from '@/api/tasks/useTaskRulesQuery'
import { useTaskStateQuery } from '@/api/tasks/useTaskStateQuery'
import { useAbortController } from '@/composables/useAbortController'
import { useInterestMeasuresStore } from '@/features/rulesMining/stores/interestMeasuresStore'
import { useRulePatternStore } from '@/features/rulesMining/stores/rulePatternStore'
import {
  constructMinerLabel,
  isTaskRunning,
} from '@/features/rulesMining/utils/rulesMining'
import { useTasksStore } from '@/stores/tasksStore'
import type { CreateTaskInput } from '@/api/tasks/types'
import { useErrorHandler } from '@/composables/useErrorHandler'

export const useRulesMining = createSharedComposable(() => {
  const { minerId } = useMinerQuery()

  const rulePatternStore = useRulePatternStore()
  const interestMeasuresStore = useInterestMeasuresStore()
  const tasksStore = useTasksStore()

  const { handleError } = useErrorHandler()
  const { abortRequests, signal } = useAbortController()
  const aborted = ref(false)

  const startTaskMutation = useMutation({
    mutationFn: (id: number) => api.tasks.start(id, { signal: signal.value }),
    onSuccess: (task) => {
      tasksStore.setActiveTaskId(task.id)
    },
    onError: handleError,
  })

  const createTaskMutation = useMutation({
    mutationFn: (task: CreateTaskInput) => api.tasks.create(task, { signal: signal.value }),
    onSuccess: (task) => {
      startTaskMutation.mutate(task.id)
    },
    onError: handleError,
  })

  const stopTaskMutation = useMutation({
    mutationFn: api.tasks.stop,
    onError: handleError,
  })

  const startedTaskId = computed(() => startTaskMutation.data.value?.id)

  const taskStateQuery = useTaskStateQuery(startedTaskId, {
    refetchInterval: (query) => {
      const task = query?.state.data
      if (!task || query.state.status === 'pending') return false

      if (isTaskRunning(task)) {
        return 500
      }

      return false
    },
    signal,
  })

  const taskRulesQuery = useTaskRulesQuery(startedTaskId)

  const isMiningAvailable = computed(() => {
    const isPatternValid = rulePatternStore.consequent.length > 0
    const isInterestMesuresValid = interestMeasuresStore.activeItems.length > 0

    return isPatternValid && isInterestMesuresValid
  })

  const isLoading = computed(() => (
    createTaskMutation.isPending.value
    || startTaskMutation.isPending.value
    || taskStateQuery.isLoading.value
    || taskRulesQuery.isLoading.value
  ))

  const miningState = computed<MiningState>(() => {
    const taskState = taskStateQuery.data.value?.state

    if (isLoading.value || taskState === 'new') return 'in_progress'
    if (aborted.value) return 'aborted'
    if (taskState === 'solved' && !taskRulesQuery.rules.value.length) return 'no_rules_found'
    if (taskState) return taskState

    if (isMiningAvailable.value) {
      if (interestMeasuresStore.isFormActive) return 'blocked_by_interest_measures'

      return 'available'
    }

    return 'disabled'
  })

  const isInProgress = computed(() => miningState.value === 'in_progress')

  function startMining() {
    const { antecedent, consequent } = rulePatternStore.rulePatternInput
    const IMs = interestMeasuresStore.interestMeasuresInput

    const name = constructMinerLabel(
      rulePatternStore.antecedent,
      rulePatternStore.consequent,
    )

    tasksStore.clearActiveTask()
    aborted.value = false

    createTaskMutation.mutate({
      IMs,
      antecedent,
      consequent,
      miner: minerId,
      name,
      limitHits: 1000,
    })
  }

  function abortMining() {
    abortRequests()

    if (tasksStore.activeTaskId) {
      stopTaskMutation.mutate(tasksStore.activeTaskId)
    }

    resetMiningState()
  }

  function resetMiningState() {
    startTaskMutation.reset()
    aborted.value = false
  }

  watch(
    [
      () => rulePatternStore.rulePatternInput,
      () => interestMeasuresStore.interestMeasuresInput,
    ],
    () => {
      if (isInProgress.value) return
      resetMiningState()
    },
    { deep: true },
  )

  return {
    isInProgress,
    isLoading,
    miningState,
    startMining,
    abortMining,
  }
})
