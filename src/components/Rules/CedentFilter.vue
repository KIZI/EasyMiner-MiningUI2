<template>
  <div class="space-y-1.5">
    <div class="text-xs font-medium">
      {{ label }}
    </div>
    <div class="space-y-4">
      <div
        v-if="items.length"
        class="space-y-2"
      >
        <CedentFilterItemComponent
          v-for="item in items"
          :key="item.attribute"
          :item="item"
          @save="handleSave"
          @remove="handleRemove(item)"
        />
      </div>
      <PopoverRoot>
        <PopoverTrigger
          :as="VButton"
          variant="basic"
          class="gap-x-1.5 px-1 py-px text-2xs font-medium"
        >
          <icon-ph-plus-bold class="size-3" />
          Add
        </PopoverTrigger>

        <EditCedentFilterItemPopoverForm
          @save="handleSave"
        />
      </PopoverRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PopoverTrigger } from 'radix-vue'
import CedentFilterItemComponent from '@/components/Rules/CedentFilterItem.vue'
import EditCedentFilterItemPopoverForm from '@/components/Rules/EditCedentFilterItemPopoverForm.vue'
import VButton from '@/components/VButton.vue'
import type { CedentFilter, CedentFilterItem } from '@/components/Rules/types'
import { Popover, PopoverButton } from '@/components/Popover'
import PopoverRoot from '@/components/RadixPopover/PopoverRoot.vue'

defineProps<{
  label: string
}>()
const modelValue = defineModel<CedentFilter>({
  required: true,
})

const items = computed(() => [...modelValue.value.values()])

function handleRemove(item: CedentFilterItem) {
  modelValue.value.delete(item.attribute)
}

function handleSave(item: CedentFilterItem) {
  modelValue.value.set(item.attribute, item)
}
</script>

<style scoped>

</style>
