<template>
  <Listbox
    v-slot="{ open }"
    v-model="activeRuleSetId"
    :class="{ 'relative z-[110]': isOpen }"
    as="div"
  >
    {{ setIsOpen(open) }}

    <ListboxButton as="template">
      <VButton
        size="md"
        variant="ghost"
        class="relative z-50 gap-x-2 p-1.5 text-sm"
      >
        <icon-heroicons-chevron-up-down-20-solid class="size-5 text-gray-700" />
      </VButton>
    </ListboxButton>

    <ListboxOptions
      class="absolute -left-0.5 -top-1.5 z-40 w-max rounded border border-black/10 bg-white p-1 shadow-lg"
    >
      <div class="flex h-10 items-center pl-8 pr-2">
        <div class="relative flex items-center">
          <icon-ph-magnifying-glass class="absolute left-2 size-3.5 text-slate-700" />
          <VInput
            ref="searchInputRef"
            v-model="searchQuery"
            class="h-7 w-52 pl-6 text-xs"
            placeholder="Search rulesets"
          />
          <button
            v-if="searchQuery"
            class="absolute right-2"
            @click="searchQuery = ''"
          >
            <icon-ph-x class="size-3.5 text-slate-700" />
          </button>
        </div>
      </div>
      <hr class="pb-1">
      <div class="max-h-56 overflow-y-auto overscroll-contain">
        <ListboxOption
          v-for="(ruleSet) in filteredRuleSets"
          :key="ruleSet.id"
          v-slot="{ active, selected }"
          as="template"
          :value="ruleSet.id"
        >
          <li
            class="cursor-pointer rounded px-3 py-1.5 text-sm font-medium"
            :class="{
              'bg-slate-100': active,
              'font-semibold': selected,
            }"
          >
            <Truncate
              :length="appConfig.truncateLength.ruleSet"
              :text="ruleSet.name"
            />
          </li>
        </ListboxOption>
      </div>
    </ListboxOptions>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { computed, nextTick, ref } from 'vue'
import { useSelectedRulesStoreRefs } from '@selectedRules/stores/selectedRulesStore'
import { useRuleSetsQuery } from '@/api/ruleSets/useRuleSetsQuery'
import { useBackdropModel } from '@/components/Backdrop'
import VButton from '@/components/VButton.vue'
import VInput from '@/components/Form/VInput.vue'
import Truncate from '@/components/Truncate.vue'
import { appConfig } from '@/config/appConfig'

const { activeRuleSetId } = useSelectedRulesStoreRefs()
const { ruleSets } = useRuleSetsQuery()

const isOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<{ $el?: HTMLInputElement }>()

useBackdropModel({ vModel: isOpen, opacity: 0.05 })

const filteredRuleSets = computed(() => {
  const trimmedSearchQuery = searchQuery.value.trim()
  if (!trimmedSearchQuery) return ruleSets.value

  return ruleSets.value.filter((ruleSet) => {
    return ruleSet.name.toLowerCase().indexOf(trimmedSearchQuery.toLowerCase()) === 0
  })
})

function setIsOpen(value: boolean) {
  isOpen.value = value

  if (value) {
    nextTick(() => {
      setTimeout(() => {
        searchInputRef.value?.$el?.focus()
      }, 0)
    })
  }

  if (!value) {
    searchQuery.value = ''
  }
}
</script>
