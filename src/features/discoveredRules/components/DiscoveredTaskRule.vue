<template>
  <TaskRuleComponent
    v-model:selected="selected"
    :rule="rule"
    :class="{
      'bg-slate-50': isOdd,
    }"
  >
    <template #actions>
      <VIconButton
        :title="isSelected ? 'Remove from selected rules' : 'Add to selected rules'"
        :loading="isToggleLoading"
        class="text-green-700"
        @click="handleToggle(rule)"
      >
        <component
          :is="isSelected ? IconPhCheckCircleFill : IconPhCheckCircle"
          class="size-5"
        />
      </VIconButton>
    </template>
  </TaskRuleComponent>
</template>

<script setup lang="ts">
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import { computed, toRefs } from 'vue'
import IconPhCheckCircle from '~icons/ph/check-circle.vue'
import IconPhCheckCircleFill from '~icons/ph/check-circle-fill.vue'
import TaskRuleComponent from '@/components/Task/TaskRule.vue'
import type { TaskRule } from '@/api/tasks/types'
import VIconButton from '@/components/VIconButton.vue'

const props = defineProps<{
  rule: TaskRule
  isOdd: boolean
}>()
const { rule } = toRefs(props)

const selected = defineModel<TaskRule[]>('selected')

const { handleToggle, isRuleSelected, isToggleLoading } = useSelectedRules()
const isSelected = computed(() => isRuleSelected(rule.value))
</script>

<style scoped>

</style>
