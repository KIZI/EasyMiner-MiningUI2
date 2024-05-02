<template>
  <div class="">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <slot />
      </div>

      <SlideTransition direction="up">
        <MenuItems
          class="absolute right-0 z-30 mt-3 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white px-2 shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                class="group flex w-full items-center gap-x-3 rounded-md py-2.5 pl-5 text-sm font-semibold text-gray-900"
                :class="{ 'bg-blue-100': active }"
                href="/easyminercenter/em/user/details"
              >
                <icon-ph-user-bold class="size-5 text-primary-700" />
                My profile
              </a>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                class="group flex w-full items-center gap-x-3 rounded-md py-2.5 pl-5 text-sm font-semibold text-gray-900"
                :class="{ 'bg-blue-100': active }"
                href="/easyminercenter/em/user/logout"
              >
                <icon-ph-sign-out class="size-5 text-red-700" />
                Logout
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </SlideTransition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import SlideTransition from '@/components/Transitions/SlideTransition.vue'
</script>
