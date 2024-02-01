<template>
  <div>
    <label
      v-if="label"
      class="font-medium"
    >{{ label }}</label>
    <slot v-bind="slotData" />

    <ErrorMessage
      v-if="field.meta.touched"
      class="field-error"
      :name="name"
    />
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage } from 'vee-validate';
import { useHLField } from './useHLField';
import { toRefs } from 'vue';

const props = defineProps<{
  name: string,
  label?: string,
}>();

const { name, label } = toRefs(props);
const { slotData, field } = useHLField(name);
</script>

<style>
.field-error {
  display: block;
  margin-top: theme('spacing[0.5]');
  color: theme('colors.red.700');
  line-height: theme('lineHeight.4');
}

.error-absolute .field-error {
  position: absolute;
  margin-top: 0;
}
</style>
