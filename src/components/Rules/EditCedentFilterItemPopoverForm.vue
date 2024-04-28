<template>
  <PopoverEditForm
    :is-edit="Boolean(item)"
    full-width
    create-label="Add"
    popover-class="w-full"
    @submit="handleSubmit"
    @remove="handleRemove"
  >
    <div class="space-y-2 text-2xs">
      <VField
        v-slot="{ field }"
        class="space-y-0.5"
        name="attribute"
        label="Attribute"
      >
        <VMultiSelect
          v-bind="field"
          :options="options"
          class="multiselect-sm"
          :can-clear="false"
          :can-deselect="false"
          searchable
          placeholder="Select"
        />
      </VField>

      <VField
        v-slot="{ field }"
        class="space-y-0.5"
        name="valueType"
        label="Value type"
      >
        <VRadioGroup
          v-bind="field"
          :options="[
            { label: 'Any', value: 'any' },
            { label: 'Fixed', value: 'fixed' },
          ]"
        />
      </VField>

      <VField
        v-if="form.values.valueType === 'fixed'"
        v-slot="{ field }"
        class="space-y-0.5"
        name="values"
        label="Fixed values"
      >
        <VMultiSelect
          v-bind="field"
          :options="['[10,20]', '[20,30]', '[30, 40]', '[40,50]', '[50,60]']"
          :close-on-select="false"
          class="multiselect-sm"
          mode="tags"
          searchable
          placeholder="Select"
        />
      </VField>
    </div>
  </PopoverEditForm>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import type { CedentFilterItem } from '@/components/Rules/types'
import { VMultiSelect } from '@/components/Form/VMultiSelect'
import VRadioGroup from '@/components/Form/VRadioGroup.vue'
import { yup } from '@/libs/yup'
import { PopoverEditForm, useInjectPopoverState } from '@/components/Popover'
import { VField } from '@/components/Form'

const props = defineProps<{
  item?: CedentFilterItem
}>()
const emit = defineEmits(['remove', 'save'])

const { isOpen } = useInjectPopoverState()!

const options = [
  'amount',
  'District',
  'duration',
]

const validationSchema = yup.object({
  attribute: yup.string().required(),
  valueType: yup.string().required(),
  values: yup.array()
    .of(yup.string())
    .when('valueType', ([valueType], schema) => {
      if (valueType === 'fixed') {
        return schema.min(1).required()
      }

      return schema
    }),
})
const form = useForm({
  validationSchema,
  initialValues: {
    valueType: 'any',
    ...props.item,
  },
})

watch(isOpen, () => form.resetForm())

const handleSubmit = form.handleSubmit((item) => {
  emit('save', item)
  isOpen.value = false
})
function handleRemove() {
  emit('remove')
  isOpen.value = false
}
</script>
