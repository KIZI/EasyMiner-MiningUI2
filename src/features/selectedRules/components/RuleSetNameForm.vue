<template>
  <form
    class="flex items-center gap-x-2"
    @submit="handleSubmit"
  >
    <VField
      v-slot="{ field }"
      name="name"
      class="error-absolute text-xs"
    >
      <VInput
        v-bind="field"
        ref="inputRef"
        class="w-60 py-0 text-lg"
        placeholder="Name of RuleSet"
      />
    </VField>
    <div class="flex">
      <VButton
        size="md"
        variant="ghost"
        class="p-1.5 text-gray-700"
      >
        <icon-ph-check class="size-5" />
      </VButton>

      <VButton
        type="button"
        variant="ghost"
        size="md"
        class="p-1.5 text-gray-700"
        @click="$emit('close')"
      >
        <icon-ph-x class="size-5" />
      </VButton>
      <VButton
        v-if="ruleSet"
        type="button"
        variant="ghost"
        size="md"
        class="p-1.5 text-gray-700"
      >
        <icon-ph-trash class="size-5" />
      </VButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import { computed, onMounted, ref, toRefs } from 'vue'
import { useSelectedRules } from '@selectedRules/composables/useSelectedRules'
import VButton from '@/components/VButton.vue'
import VInput from '@/components/Form/VInput.vue'
import { api } from '@/api/api'
import type { RuleSet } from '@/api/ruleSets/types'
import { yup } from '@/libs/yup'
import { useErrorHandler } from '@/composables/useErrorHandler'

const props = defineProps<{
  ruleSet?: RuleSet
}>()
const emit = defineEmits(['close'])

const { ruleSet } = toRefs(props)

const { handleError } = useErrorHandler()
const { invalidateCurrentRuleSet } = useSelectedRules()

const validationSchema = yup.object({ name: yup.string().required().max(100) })
const initialValues = computed(() => ({ name: ruleSet.value?.name ?? '' }))

const form = useForm<yup.InferType<typeof validationSchema>>({
  validationSchema,
  initialValues,
})

const updateMutation = useMutation({
  mutationFn: api.ruleSets.update,
  onSuccess: () => {
    invalidateCurrentRuleSet()
    emit('close')
  },
  onError: handleError,
})
const handleSubmit = form.handleSubmit((values) => {
  if (!ruleSet.value) return

  updateMutation.mutate({
    id: ruleSet.value.id,
    name: values.name.trim(),
  })
})

const inputRef = ref<{ $el: HTMLInputElement }>()
onMounted(async () => {
  inputRef.value?.$el.focus()
})
</script>
