<template>
  <div class="bg-brand pb-20 pt-6">
    <div class="mx-auto max-w-[1440px] sm:pl-6">
      <div class="text-white [&>*]:leading-tight">
        <div class="flex items-end">
          <div>
            <div class="font-['Times_New_Roman'] text-5xl">
              EasyMiner
            </div>
            <div class="mt-1">
              easy association rule mining
            </div>
          </div>

          <div class="mx-auto">
            <span class="text-xs font-medium">
              <Truncate
                :length="appConfig.truncateLength.miner"
                :text="miner?.name"
              />
            </span>
          </div>

          <div class="flex items-start pr-4">
            <button
              class="group inline-flex flex-col items-center gap-y-1.5 bg-cover opacity-70 hover:opacity-100"
              title="Create new miner or open existing one..."
            >
              <span
                :style="`background-image: url(${imageHelp})`"
                class="size-12"
              />
              <span class="hidden text-xs group-hover:inline-block">Help</span>
            </button>
            <a
              class="group ml-6 inline-flex flex-col items-center gap-y-1.5 bg-cover opacity-70 hover:opacity-100"
              title="Create new miner or open existing one..."
              href="/easyminercenter/em/data"
            >
              <span
                :style="`background-image: url(${imageMiner})`"
                class="size-12"
              />
              <span class="hidden text-xs group-hover:inline-block">Miners</span>
            </a>

            <UserMenu>
              <MenuButton class="ml-8 inline-flex flex-col items-center gap-y-1.5 bg-cover">
                <span
                  :style="`background-image: url(${imageUser})`"
                  class="size-12"
                />
                <span class="text-xs">John Doe</span>
              </MenuButton>
            </UserMenu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuButton } from '@headlessui/vue'
import { useMinerQuery } from '@/api/miners/useMinerQuery'
import { appConfig } from '@/config/appConfig'
import Truncate from '@/components/Truncate.vue'

import imageUser from '@/assets/user.png'
import imageMiner from '@/assets/new-miner.png'
import imageHelp from '@/assets/help.png'
import PopoverButton from '@/components/Popover/PopoverButton.vue'
import Popover from '@/components/Popover/Popover.vue'
import PopoverPanel from '@/components/Popover/PopoverPanel.vue'
import UserMenu from '@/components/Layout/UserMenu.vue'

const { data: miner } = useMinerQuery()
</script>
