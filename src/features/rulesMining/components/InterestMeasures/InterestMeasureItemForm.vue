<template>
  <div class="relative">
    <InterestMeasureItemTemplate
      v-if="!isEdited"
      ref="triggerRef"
      :item="item"
      :disabled="isFormActive"
      as-button
      title="Edit (Click) / Remove (Right click)"
      @click="handleEdit"
      @click.right.prevent="handleRemove"
    />

    <template v-if="isEdited">
      <form
        class="flex min-w-max items-center"
        @submit="handleSave"
      >
        <InterestMeasureItemTemplate :item="item">
          <template
            v-if="!item"
            #label
          >
            <Field
              v-slot="{ field }"
              name="name"
            >
              <select
                v-bind="field"
                class="rounded border-blue-300 py-0.5 pr-9 text-sm font-medium focus:border-blue-400 focus:ring-blue-400"
              >
                <option
                  v-for="option in availableMeasures"
                  :key="option.name"
                  :value="option.name"
                >
                  {{ $t(`interestMeasures.${option.name}.name`) }}
                </option>
              </select>
            </Field>
          </template>

          <template #value>
            <HLFloating :show="showInvalidSubmission">
              <template #reference="{ setRef }">
                <HLField
                  v-slot="{ field, meta }"
                  name="value"
                >
                  <span :ref="setRef">
                    <input
                      v-if="!isCurrentMeasureBooleanType"
                      ref="valueInputRef"
                      v-maska
                      :data-maska="maska"
                      data-maska-tokens="0:[0-9]:optional"
                      v-bind="field"
                      type="text"
                      inputmode="decimal"
                      class="w-11 rounded px-0 py-0.5 text-center text-sm font-semibold focus:ring-1 focus:ring-blue-500"
                      :class="{
                        'border-blue-300 focus:border-blue-500': meta.valid,
                        'border-red-500': !meta.valid,
                      }"
                      @keydown.enter="handleEnterKey"
                      @keydown.esc="handleEscKey"
                      @keydown.delete="handleDeleteKey"
                    >
                  </span>
                </HLField>
              </template>

              <div class="flex w-max gap-x-2 rounded border border-red-100 bg-red-50 px-1.5 py-1 text-xs font-medium leading-none text-red-800 shadow-md">
                <icon-ph-warning class="size-3.5" />
                Incorrect input
              </div>
            </HLFloating>
          </template>
        </InterestMeasureItemTemplate>

        <div class="ml-1.5 space-x-0.5">
          <VButton
            title="Accept (Enter)"
            variant="ghost"
            size="md"
            class="p-1"
            :class="{
              shake: showInvalidSubmission,
            }"
          >
            <icon-ph-check-bold class="size-5" />
          </VButton>
          <VButton
            v-if="isEdited || !isCurrentMeasureBooleanType"
            variant="ghost"
            type="button"
            title="Cancel (Esc)"
            class="p-1"
            size="md"
            @click="handleClose"
          >
            <icon-ph-x class="size-5 text-gray-700" />
          </VButton>
          <VButton
            v-if="item && !currentMeasure.isRequired"
            variant="ghost"
            type="button"
            title="Remove (Alt + Delete)"
            size="md"
            class="p-1"
            @click="handleRemove"
          >
            <icon-ph-trash class="size-5 text-gray-700" />
          </VButton>
        </div>
      </form>

      <div class="absolute left-0 mt-0.5 w-72">
        <div class="text-xs">
          <p v-if="currentMeasure.range" class="italic text-gray-800">
            <span class="font-semibold">{{ formatInterestMeasureRange(currentMeasure.range) }}</span>,
            <span class="font-medium">{{ currentMeasure.type }}</span>
          </p>
          <p class="mt-0.5">
            {{ $t(`interestMeasures.${currentMeasure.name}.description`) }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { formatInterestMeasureRange } from '@rulesMining/utils/format'
import { vMaska } from 'maska'
import { storeToRefs } from 'pinia'
import { Field, useForm } from 'vee-validate'
import {
  computed,
  nextTick,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue'
import * as yup from 'yup'
import InterestMeasureItemTemplate from './InterestMeasureItemTemplate.vue'
import type { InterestMeasure, InterestMeasureActiveItem, InterestMeasureConfig } from '@/features/rulesMining/types/interestMeasure.types'
import { HLField, HLFloating } from '@/components/Form'
import VButton from '@/components/VButton.vue'
import { useInterestMeasuresStore } from '@/features/rulesMining/stores/interestMeasuresStore'

const props = defineProps<{
  item?: InterestMeasureActiveItem
}>()

const interestMeasuresStore = useInterestMeasuresStore()
const { availableMeasures: _availableMeasures, editedMeasure, isFormActive } = storeToRefs(useInterestMeasuresStore())

const isEdited = computed(() => (
  !props.item || editedMeasure.value === props.item?.name
))

const triggerRef = ref<{ $el: HTMLInputElement }>()
const valueInputRef = ref<HTMLInputElement>()

const availableMeasures = computed<InterestMeasureConfig[]>(() => [
  ..._availableMeasures.value,
  ...props.item ? [props.item] : [],
])

const initialItem = computed<InterestMeasureActiveItem | InterestMeasureConfig>(
  () => props.item ?? availableMeasures.value[0],
)

const initialValues = computed(() => {
  return {
    name: initialItem.value.name,
    value: 'value' in initialItem.value ? initialItem.value.value : initialItem.value.defaultValue,
  }
})

const validationSchema = ref(yup.object())
const form = useForm<{ name: InterestMeasure, value?: number }>({
  validationSchema,
  initialValues: initialValues.value,
})

const currentMeasure = computed(() => (
  interestMeasuresStore.getMeasure(form.values.name) ?? initialItem.value
))

const isCurrentMeasureBooleanType = computed(() => {
  return currentMeasure.value.type === 'Boolean'
})

watchEffect(() => {
  const { range } = currentMeasure.value
  if (!range) return
  const min = range.from.value + (range.from.closed ? 0 : 0.01)
  const max = range.to.value - (range.to.closed ? 0 : 0.01)

  validationSchema.value = yup.object({
    name: yup.string().required(),
    value: yup.number()
      .required()
      .min(min)
      .max(max),
  })
})

watch(() => form.values.name, () => {
  if (!currentMeasure.value?.defaultValue) return
  form.setFieldValue('value', currentMeasure.value.defaultValue)
})

watch(isEdited, () => {
  form.resetForm({ values: initialValues.value })
})

const maska = computed(() => {
  const { range, type } = currentMeasure.value
  if (!range) return

  const afterPoint = type === 'Double' ? '.00' : ''
  const wholeNumbers = Array.from({ length: String(range.to.value).length }).fill('0').join('')

  return `${wholeNumbers}${afterPoint}`
})

const showInvalidSubmission = ref(false)
const showInvalidSubmissionTimeout = ref<number>()

const handleSave = form.handleSubmit((values) => {
  const measureValue = isCurrentMeasureBooleanType.value ? 1 : values.value as number
  interestMeasuresStore.setMeasure(values.name, measureValue)
  interestMeasuresStore.closeForm()
}, () => {
  clearTimeout(showInvalidSubmissionTimeout.value)
  showInvalidSubmission.value = true
  showInvalidSubmissionTimeout.value = setTimeout(() => {
    showInvalidSubmission.value = false
  }, 2000)
})

function handleEdit() {
  if (!props.item?.name || isFormActive.value) return
  interestMeasuresStore.openForm(props.item.name)
}

async function refocusTrigger() {
  await nextTick()
  if (triggerRef.value) triggerRef.value.$el.focus()
}

function handleEscKey() {
  handleClose()
  refocusTrigger()
}

function handleEnterKey() {
  handleSave()
  refocusTrigger()
}

async function handleClose() {
  interestMeasuresStore.closeForm()
}

function handleDeleteKey(event: KeyboardEvent) {
  if (event.altKey) handleRemove()
}

function handleRemove() {
  if (!props.item?.name) return
  interestMeasuresStore.removeMeasure(props.item.name)
  interestMeasuresStore.closeForm()
}

watch(isEdited, async () => {
  if (!isEdited.value) return
  await nextTick()
  valueInputRef.value?.focus()
})

onMounted(() => {
  valueInputRef.value?.focus()
})
</script>
