<template>
  <div
    class="flex items-start gap-x-4 px-6 pb-4 pt-3"
    :class="{
      'bg-slate-50': isEven
    }"
  >
    <VCheckbox
      class="mt-1.5 h-4 w-4"
      @click.stop
    />
    <div class="space-y-2">
      <div
        class="text-sm font-medium leading-relaxed tracking-wide"
      >
        {{ task.text }}
      </div>

      <div class="space-x-5 text-xs leading-none">
        <span>
          05.03.2023 21:36
        </span>
        <span>
          Confidence:
          <span class="font-semibold text-primary-700">
            {{ formatDecimal(task.confidence) }}
          </span>
        </span>
        <span>
          Support:
          <span class="font-semibold text-primary-700">
            {{ formatDecimal(task.support) }}
          </span>
        </span>
        <span>
          Lift:
          <span class="font-semibold text-primary-700">
            {{ formatDecimal(task.lift) }}
          </span>
        </span>
        <span>
          Rule length:
          <span class="font-semibold text-primary-700">
            {{ formatDecimal(task.ruleLength) }}
          </span>
        </span>
      </div>
    </div>
    <div class="ml-auto flex items-center gap-x-2">
      <VButton
        size="md"
        variant="ghost"
        class="mt-0.5 space-x-3 p-1.5"
        :class="{
          'hover:bg-slate-100': !isEven,
          'hover:bg-slate-200': isEven,
        }"
        @click="setActiveTaskId(task.id)"
      >
        <icon-ph-arrow-right class="h-5 w-5" />
      </VButton>
      <VButton
        size="md"
        variant="ghost"
        class="mt-0.5 space-x-3 p-1.5 hover:bg-red-50"
      >
        <icon-ph-trash class="h-5 w-5 text-red-700" />
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import VButton from '@/components/VButton.vue';
import VCheckbox from '@/components/Form/VCheckbox.vue';
import { useTasksStore } from '@/stores/tasksStore';
import { formatDecimal } from '@/utils/format';

const { setActiveTaskId } = useTasksStore();

const props = defineProps<{
  task: any,
  isEven?: boolean,
}>();
</script>
