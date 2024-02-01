<template>
  <slot v-bind="slotData" />
</template>

<script setup lang="ts">
import {useHLField} from './useHLField';
import { toRefs } from 'vue';

const props = defineProps<{
  name: string,
}>();

const { name } = toRefs(props);
const { slotData } = useHLField(name);
</script>