<template>
  <PopoverEditForm
    :is-edit="isEdit"
    :title="ruleSet ? 'Edit RuleSet' : 'Create a new RuleSet'"
    remove-confirm-label="Do you really want to delete this RuleSet?"
    class="w-64"
    confirm-remove
    preserve-height
    :is-create-loading="currentMutation.isPending.value"
    :is-remove-loading="removeMutation.isPending.value"
    @submit="handleSubmit"
    @remove="handleRemove"
  >
    <VField
      v-slot="{ field }"
      name="name"
      label="Name"
      class="text-xs"
    >
      <VInput
        v-bind="field"
        ref="inputRef"
        placeholder="Name of the RuleSet"
      />
    </VField>

    <MutationErrorMessage
      :mutation="currentMutation"
      class="mt-3"
    />
  </PopoverEditForm>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, toRefs, watch } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import { useSelectedRulesStore } from '@selectedRules/stores/selectedRulesStore'
import { yup } from '@/libs/yup'
import { api } from '@/api/api'
import type { RuleSet } from '@/api/ruleSets/types'
import { useRuleSetsQuery } from '@/api/ruleSets/useRuleSetsQuery'
import { PopoverEditForm, useInjectPopoverState } from '@/components/Popover'
import { MutationErrorMessage, VField, VInput, useHLForm } from '@/components/Form'
import { useErrorHandler } from '@/composables/useErrorHandler'
import { useActiveRuleSetDetailQuery } from '@/api/ruleSets/useRuleSetDetailQuery'

const props = defineProps<{
  ruleSet?: RuleSet
}>()
const { ruleSet } = toRefs(props)

const { handleError } = useErrorHandler()
const { setActiveRuleSetId } = useSelectedRulesStore()
const activeRuleSetDetailQuery = useActiveRuleSetDetailQuery()
const ruleSetsQuery = useRuleSetsQuery()
const { isOpen } = useInjectPopoverState()!

const inputRef = ref<{ $el: HTMLInputElement }>()

const isEdit = computed(() => !!ruleSet.value)

const validationSchema = yup.object({
  name: yup.string().trim()
    .required()
    .min(3)
    .max(100),
})
const initialValues = computed(() => ({ name: ruleSet.value?.name ?? '' }))

const form = useHLForm<yup.InferType<typeof validationSchema>>({
  validationSchema,
  initialValues: initialValues.value,
  keepValuesOnUnmount: true,
})

const updateMutation = useMutation({
  mutationFn: api.ruleSets.update,
  onSuccess: () => {
    activeRuleSetDetailQuery.refetch()
    ruleSetsQuery.refetch()
    isOpen.value = false
  },
})
const createMutation = useMutation({
  mutationFn: api.ruleSets.create,
  onSuccess: (newRuleset) => {
    setActiveRuleSetId(newRuleset.id)
    ruleSetsQuery.refetch()
    isOpen.value = false
  },
})
const removeMutation = useMutation({
  mutationFn: api.ruleSets.remove,
  onSuccess: async () => {
    await ruleSetsQuery.refetch()
    setActiveRuleSetId(ruleSetsQuery.ruleSets.value[0]?.id)
    isOpen.value = false
  },
  onError: handleError,
})

const currentMutation = computed(() => (isEdit.value ? updateMutation : createMutation))

const handleSubmit = form.handleSubmit(({ name }) => {
  if (!ruleSet.value) {
    createMutation.mutate({
      name,
    })
    return
  }

  updateMutation.mutate({
    id: ruleSet.value.id,
    name,
  })
})

function handleRemove() {
  if (!ruleSet.value) return
  removeMutation.mutate(ruleSet.value.id)
}

watch(isOpen, async (value) => {
  form.resetForm({ values: initialValues.value })

  if (value) {
    await nextTick()
    inputRef.value?.$el?.focus()
  }

  if (!value) {
    createMutation.reset()
    updateMutation.reset()
    removeMutation.reset()
  }
})
</script>
