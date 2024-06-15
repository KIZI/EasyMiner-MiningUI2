import { SpecialInterestMeasures } from '@rulesMining/types/interestMeasure.types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createSharedComposable } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { api } from '@/api/api'
import type { MiningState } from '@/features/rulesMining/types/rulesMining.types'
import { useMinerQuery } from '@/api/miners/useMinerQuery'
import { useTaskRulesQuery } from '@/api/tasks/useTaskRulesQuery'
import { useAbortController } from '@/composables/useAbortController'
import { useInterestMeasuresStore } from '@/features/rulesMining/stores/interestMeasuresStore'
import { useRulePatternStore } from '@/features/rulesMining/stores/rulePatternStore'
import {
  constructMinerLabel,
  interestMeasureToIMSimpleInput,
  isTaskRunning,
} from '@/features/rulesMining/utils/rulesMining'
import { useTasksStore } from '@/stores/tasksStore'
import type { CreateTaskInput } from '@/api/tasks/types'
import { useErrorHandler } from '@/composables/useErrorHandler'
import { queryKeys } from '@/api/queryKeys'
import { layout } from '@/components/Layout'

export const useRulesMining = createSharedComposable(() => {
  const { minerId } = useMinerQuery()

  const rulePatternStore = useRulePatternStore()
  const interestMeasuresStore = useInterestMeasuresStore()
  const tasksStore = useTasksStore()

  const { handleError } = useErrorHandler()
  const abortController = useAbortController()
  const { signal } = abortController

  const queryClient = useQueryClient()

  const startTaskMutation = useMutation({
    mutationFn: (id: number) => api.tasks.start(id, { signal: signal.value }),
    onSuccess: (task) => {
      tasksStore.setActiveTaskId(task.id)
      queryClient.invalidateQueries({ queryKey: queryKeys.miner.tasks() })
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

  const taskRulesQuery = useTaskRulesQuery(startedTaskId, {
    refetchInterval: (query) => {
      const task = query?.state.data?.task
      if (!task) return false

      if (isTaskRunning(task)) {
        return 500
      }

      if (task.state === 'solved') {
        layout.showDiscoveredRules()
      }

      return false
    },
    signal,
  })

  const isMiningAvailable = computed(() => {
    const isPatternValid = rulePatternStore.consequent.length > 0
    const isInterestMeasuresValid = interestMeasuresStore.activeMeasures.length > 0

    return isPatternValid && isInterestMeasuresValid
  })

  const isLoading = computed(() => (
    createTaskMutation.isPending.value
    || startTaskMutation.isPending.value
    || taskRulesQuery.isLoading.value
  ))

  const miningState = computed<MiningState>(() => {
    const taskState = taskRulesQuery.task.value?.state

    if (isLoading.value || taskState === 'new') return 'in_progress'
    if (abortController.aborted.value) return 'aborted'
    if (taskState === 'solved' && !taskRulesQuery.rules.value.length) return 'no_rules_found'
    if (taskState) return taskState

    if (isMiningAvailable.value) {
      if (interestMeasuresStore.isFormActive) return 'blocked_by_interest_measures'

      return 'available'
    }

    return 'disabled'
  })

  const isInProgress = computed(() => miningState.value === 'in_progress')

  const interestMeasuresInput = computed(() => (
    interestMeasuresStore.activeMeasures.map(interestMeasureToIMSimpleInput)
  ))
  const specialInterestMeasuresInput = computed(() => ([
    ...(interestMeasuresStore.isPruningEnabled ? [{ name: SpecialInterestMeasures.CBA }] : []),
  ]))

  async function startMining() {
    const { antecedent, consequent } = rulePatternStore.rulePatternInput
    const IMs = interestMeasuresInput.value
    const specialIMs = specialInterestMeasuresInput.value

    const name = constructMinerLabel(
      rulePatternStore.antecedent,
      rulePatternStore.consequent,
    )

    tasksStore.clearActiveTask()
    abortController.reset()

    createTaskMutation.mutate({
      IMs,
      specialIMs,
      antecedent,
      consequent,
      miner: minerId,
      name,
      limitHits: 1000,
    })
  }

  function resetMiningState() {
    startTaskMutation.reset()
  }

  function abortMining() {
    abortController.abort()

    if (tasksStore.activeTaskId) {
      stopTaskMutation.mutate(tasksStore.activeTaskId)
      tasksStore.clearActiveTask()
    }

    resetMiningState()
    layout.closeDiscoveredRules()
  }

  watch(
    [
      () => rulePatternStore.rulePatternInput,
      interestMeasuresInput,
      specialInterestMeasuresInput,
    ],
    () => {
      if (isInProgress.value) return
      resetMiningState()
      abortController.reset()
    },
    { deep: true },
  )

  return {
    startedTaskId,
    isInProgress,
    isLoading,
    miningState,
    startMining,
    abortMining,
  }
})
