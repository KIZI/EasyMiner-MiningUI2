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
        v-slot="{field}"
        class="space-y-1"
        name="valueType"
        label="Value type"
      >
        <VRadioGroup
          v-bind="field"
          :options="[
            {label: 'Any', value: 'any'},
            {label: 'Fixed', value: 'fixed'}
          ]"
        />
        <p class="pt-0.5 text-2xs leading-tight text-gray-900">
          The system will try to use all individual attribute values.
        </p>
      </VField>

      <VField
        v-if="form.values.valueType === 'fixed'"
        v-slot="{field}"
        class="space-y-1"
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

      <VField
        v-slot="{field}"
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
import { useForm } from 'vee-validate';
import { watch } from 'vue';
import type { CedentItem } from '@rulesMining/types/rulePattern.types';
import { SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { useRulePatternStore } from '@rulesMining/stores/rulePatternStore';
import { yup } from '@/libs/yup';
import { PopoverEditForm, useInjectPopoverState } from '@/components/Popover';
import { VField, VSwitch, VRadioGroup, VMultiSelect } from '@/components/Form';

const props = defineProps<{
  item: CedentItem,
}>();
const emit = defineEmits(['remove', 'save']);

const { isOpen } = useInjectPopoverState()!;

const options = [
  'amount',
  'District',
  'duration',
];

const validationSchema = yup.object({
  attribute: yup.string().required(),
  valueType: yup.string().required(),
  values: yup.array()
    .of(yup.string())
    .when('valueType', ([valueType], schema) => {
      if (valueType === 'fixed') {
        return schema.min(1).required();
      }

      return schema;
    }),
});
const form = useForm({
  validationSchema,
  initialValues: {
    valueType: 'any',
    ...props.item,
  },
});

watch(isOpen, () => form.resetForm());

const handleSubmit = form.handleSubmit((item) => {
  emit('save', item);
  isOpen.value = false;
});

const rulePatternStore = useRulePatternStore();
function handleRemove() {
  isOpen.value = false;
  rulePatternStore.removeItemById(props.item.id);
}
</script>
