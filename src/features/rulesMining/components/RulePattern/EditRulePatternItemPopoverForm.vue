<template>
  <PopoverEditForm
    :is-edit="Boolean(item)"
    full-width
    create-label="Add"
    popover-class="w-80"
    :title="item.name"
    @submit="handleSubmit"
    @remove="handleRemove"
  >
    <div class="mt-1 space-y-3 pb-2 text-xs">
      <VField
        v-slot="{ field }"
        class="space-y-1"
        name="valueType"
        label="Value type"
      >
        <VRadioGroup
          v-bind="field"
          :options="typeOptions"
        />
        <p v-if="form.values.valueType === 'any'" class="pt-0.5 text-2xs leading-tight text-gray-900">
          The system will try to use all individual attribute values.
        </p>
      </VField>

      <template v-if="form.values.valueType === 'fixed'">
        <VField
          v-slot="{ field }"
          class="space-y-1"
          name="fixedValue"
          label="Fixed value"
        >
          <VInput v-bind="field" />
        </VField>
      </template>

      <VField
        v-if="false"
        v-slot="{ field }"
        class="space-y-1 pt-1"
        name="isNegated"
        label="Negation"
      >
        <SwitchGroup
          as="div"
          class="flex items-center gap-x-2"
        >
          <VSwitch v-bind="field" />
          <SwitchLabel class="text-2xs font-medium">
            Find rules NOT containing item
          </SwitchLabel>
        </SwitchGroup>
      </VField>
    </div>
  </PopoverEditForm>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { computed, watch } from 'vue'
import type { CedentItem } from '@rulesMining/types/rulePattern.types'
import { SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore'
import { yup } from '@/libs/yup'
import { PopoverEditForm, useInjectPopoverState } from '@/components/Popover'
import { VField, VInput, VRadioGroup, VSwitch } from '@/components/Form'

const props = defineProps<{
  item: CedentItem
}>()

const { isOpen } = useInjectPopoverState()!

const ValueType = {
  Any: 'any',
  Fixed: 'fixed',
} as const

const typeOptions = [
  { label: 'Any', value: ValueType.Any },
  { label: 'Fixed', value: ValueType.Fixed },
]

const validationSchema = yup.object({
  valueType: yup.string().required(),
  fixedValue: yup.string().label('Fixed value').when('valueType', ([valueType], schema) => {
    if (valueType === ValueType.Fixed) {
      return schema.required()
    }
    return schema
  }),
  // values: yup.string().when('valueType', (([valueType], schema) => {
  //     if (valueType === 'fixed') {
  //       return schema.required()
  //     }
  //     return schema
  //   }),
  // values: yup.array()
  //   .of(yup.string())
  //   .when('valueType', ([valueType], schema) => {
  //     if (valueType === 'fixed') {
  //       return schema.min(1).required()
  //     }

  //     return schema
  //   }),
})

const initialValues = computed(() => {
  return {
    valueType: props.item.fixedValue ? ValueType.Fixed : ValueType.Any,
    fixedValue: props.item.fixedValue,
  }
})

const form = useForm({
  validationSchema,
  initialValues: initialValues.value,
})

watch(isOpen, () => form.resetForm({ values: initialValues.value }))

const rulePatternStore = useRulePatternStore()

const handleSubmit = form.handleSubmit((values) => {
  isOpen.value = false
  rulePatternStore.setItemOptions({
    id: props.item.id,
    fixedValue: values.fixedValue,
  })
})

function handleRemove() {
  isOpen.value = false
  rulePatternStore.removeItemById(props.item.id)
}
</script>
