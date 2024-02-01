<template>
  <div class="relative">
    <InteresetMeasureItemTemplate
      v-if="!isEdited"
      :item="item"
      :disabled="isFormActive"
      as="button"
      @click="handleEdit"
    />

    <template v-if="isEdited">
      <form
        class="flex min-w-[max-content] items-center"
        @submit="handleSave"
      >
        <InteresetMeasureItemTemplate :item="item">
          <template
            v-if="!item"
            #label
          >
            <Field
              v-slot="{field}"
              name="name"
            >
              <select
                v-bind="field"
                class="rounded border-blue-300 py-0.5 pr-9 text-sm font-medium focus:border-blue-400 focus:ring-blue-400"
              >
                <option
                  v-for="option in availableItems"
                  :key="option.name"
                  :value="option.name"
                >
                  {{ option.label }}
                </option>
              </select>
            </Field>
          </template>

          <template #value>
            <HLField
              v-slot="{field, meta}"
              name="value"
            >
              <input
                ref="valueInputRef"
                v-maska
                :data-maska="maska"
                data-maska-tokens="0:[0-9]:optional"
                v-bind="field"
                type="text"
                inputmode="decimal"
                class="w-11 rounded px-0 py-0.5 text-center text-sm font-semibold"
                :class="{
                  'border-blue-300 focus:border-blue-500': meta.valid,
                  'border-red-500': !meta.valid,
                }"
                @keydown.enter="handleSave"
                @keydown.esc="handleClose"
              >
            </HLField>
          </template>
        </InteresetMeasureItemTemplate>

        <div class="ml-1.5 space-x-0.5">
          <HLFloating :show="showInvalidSubmission">
            <template #reference="{ setRef }">
              <VButton
                :ref="setRef"
                title="Accept (Enter)"
                variant="ghost"
                size="md"
                class="p-1"
                :class="{
                  'shake': showInvalidSubmission,
                }"
              >
                <icon-ph-check class="h-5 w-5" />
              </VButton>
            </template>

            <div class="flex w-[max-content] gap-x-2 rounded border border-red-100 bg-red-50 px-1.5 py-1 text-xs font-medium leading-none text-red-800 shadow-md">
              <icon-ph-warning class="h-3.5 w-3.5" />
              Incorrect input
            </div>
          </HLFloating>
          <VButton
            variant="ghost"
            type="button"
            title="Cancel (Esc)"
            class="p-1"
            size="md"
            @click="handleClose"
          >
            <icon-ph-x class="h-5 w-5" />
          </VButton>
          <VButton
            v-if="item && !currentItem.isRequired"
            variant="ghost"
            type="button"
            title="Remove"
            size="md"
            class="p-1"
            @click="handleRemove"
          >
            <icon-ph-trash class="h-5 w-5" />
          </VButton>
        </div>
      </form>

      <div class="absolute left-0 mt-0.5 w-72">
        <div class="text-xs">
          <p class="italic text-gray-800">
            <span class="font-semibold">{{ formatInterestMeasureRange(currentItem.range) }}</span>,
            <span class="font-medium">{{ currentItem.type }}</span>
          </p>
          <p class="mt-0.5">
            {{ currentItem.description }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { formatInterestMeasureRange } from '@rulesMining/utils/format';
import { vMaska } from 'maska';
import { storeToRefs } from 'pinia';
import { Field, useForm } from 'vee-validate';
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue';
import * as yup from 'yup';
import InteresetMeasureItemTemplate from './InterestMeasureItemTemplate.vue';
import type { InterestMeasure, InterestMeasureItem } from '@/features/rulesMining/types/interestMeasure.types';
import { HLField, HLFloating } from '@/components/Form';
import VButton from '@/components/VButton.vue';
import { useInterestMeasuresStore } from '@/features/rulesMining/stores/interestMeasuresStore';

const props = defineProps<{
  item?: InterestMeasureItem,
}>();

const interestMeasuresStore = useInterestMeasuresStore();
const { unusedItems, editedItem, isFormActive } = storeToRefs(useInterestMeasuresStore());

const isEdited = computed(() => (
  !props.item || editedItem.value === props.item?.name
));

const valueInputRef = ref<HTMLInputElement>();

const availableItems = computed<InterestMeasureItem[]>(() => [
  ...unusedItems.value,
  ...props.item ? [props.item] : [],
]);

const initialItem = computed(() => props.item ?? availableItems.value[0]);

const initialValues = computed(() => ({
  name: initialItem.value.name,
  value: initialItem.value.value ?? initialItem.value.defaultValue,
}));

const validationSchema = ref(yup.object());
const form = useForm<{name: InterestMeasure, value: number}>({
  validationSchema,
  initialValues,
});

const currentItem = computed(() => (
  interestMeasuresStore.getItem(form.values.name) ?? initialItem.value
));

watchEffect(() => {
  const { range } = currentItem.value;
  const min = range.from.value + (range.from.closed ? 0 : 0.01);
  const max = range.to.value - (range.to.closed ? 0 : 0.01);

  validationSchema.value = yup.object({
    name: yup.string().required(),
    value: yup.number()
      .required()
      .min(min)
      .max(max),
  });
});

watch(() => form.values.name, () => {
  if (!currentItem.value?.defaultValue) return;
  form.setFieldValue('value', currentItem.value.defaultValue);
});

watch(isEdited, () => {
  form.resetForm();
});

const maska = computed(() => {
  const { range, type } = currentItem.value;

  const afterPoint = type === 'Double' ? '.00' : '';
  const wholeNumbers = new Array(String(range.to.value).length).fill('0').join('');

  return `${wholeNumbers}${afterPoint}`;
});

const showInvalidSubmission = ref(false);
const showInvalidSubmissionTimeout = ref<number>();

const handleSave = form.handleSubmit((values) => {
  interestMeasuresStore.setItemValue(values.name, values.value);
  interestMeasuresStore.closeItemForm();
}, () => {
  clearTimeout(showInvalidSubmissionTimeout.value);
  showInvalidSubmission.value = true;
  showInvalidSubmissionTimeout.value = setTimeout(() => {
    showInvalidSubmission.value = false;
  }, 2000);
});

function handleEdit() {
  if (!props.item?.name || isFormActive.value) return;
  interestMeasuresStore.openItemForm(props.item.name);
}

function handleClose() {
  interestMeasuresStore.closeItemForm();
}

function handleRemove() {
  if (!props.item?.name) return;
  interestMeasuresStore.clearItemValue(props.item.name);
  interestMeasuresStore.closeItemForm();
}

watch(isEdited, async () => {
  if (!isEdited.value) return;
  await nextTick();
  valueInputRef.value?.focus();
});

onMounted(() => {
  valueInputRef.value?.focus();
});
</script>
