import { useField } from 'vee-validate';
import { computed, toRef, type MaybeRef } from 'vue';
import { waitForClickEvent } from '@/utils/waitForClickEvent';

export function useHLField(name: MaybeRef<string>) {
  const nameRef = toRef(name);
  const field = useField(nameRef);

  const isValid = computed(() => !field.meta.touched || field.meta.valid);

  async function handleBlur(e: Event) {
    await waitForClickEvent();
    field.handleBlur(e, true);
  }

  const slotData = computed(() => ({
    field: {
      'modelValue': field.value.value,
      'name': nameRef.value,
      'on:blur': handleBlur,
      'on:input': field.handleChange,
      'onUpdate:modelValue': field.handleChange,
      'value': field.value.value,
      'data-invalid': !isValid.value,
      'isValid': isValid.value,
    },
    meta: field.meta,
  }));

  return {
    field,
    slotData,
  };
}
