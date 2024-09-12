<template>
  <PopoverRoot>
    <div class="flex flex-wrap gap-1">
      <PopoverTrigger
        class="inline-flex items-center rounded bg-slate-200 py-px pl-1.5 text-xs font-medium"
      >
        {{ item.attribute }}
        <span
          class="mx-0.5 grid h-[calc(100%-2px)] place-items-center rounded px-1 hover:bg-slate-300"
          @click.stop="handleRemove"
        >
          <icon-ph-x-bold :width="11" />
        </span>
      </PopoverTrigger>
      <div
        v-for="value in itemValues"
        :key="value"
        class="inline-flex items-center rounded bg-slate-100 px-1 py-px text-2xs"
      >
        {{ value }}
      </div>
      <EditCedentFilterItemPopoverForm
        :item="item"
        @remove="handleRemove"
        @save="handleSave"
      />
    </div>
  </PopoverRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PopoverTrigger } from 'radix-vue'
import EditCedentFilterItemPopoverForm from '@/components/Rules/EditCedentFilterItemPopoverForm.vue'
import type { CedentFilterItem } from '@/components/Rules/types'
import { Popover, PopoverButton } from '@/components/Popover'
import PopoverRoot from '@/components/RadixPopover/PopoverRoot.vue'

const props = defineProps<{
  item: CedentFilterItem
}>()
const emit = defineEmits(['remove', 'save'])

const itemValues = computed(() => (props.item.values?.length ? props.item.values : ['*']))

function handleRemove() {
  emit('remove')
}
function handleSave(item: CedentFilterItem) {
  emit('save', item)
}
</script>

<style scoped>

</style>
