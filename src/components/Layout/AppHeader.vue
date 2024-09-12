<template>
  <div class="bg-brand pb-10 pt-2 xl:pb-20 xl:pt-6">
    <div class="mx-auto max-w-[1440px] sm:pl-6">
      <div class="text-white [&>*]:leading-tight">
        <div class="flex items-end">
          <div>
            <div class="font-['Times_New_Roman'] text-2xl xl:text-5xl">
              EasyMiner
            </div>
            <div class="max-xl:text-md xl:mt-1">
              easy association rule mining
            </div>
          </div>

          <div class="mx-auto">
            <span class="text-xs font-medium">
              <Truncate :length="appConfig.truncateLength.miner" :text="miner?.name" />
            </span>
          </div>

          <div class="flex items-start pr-4">
            <button
              v-if="false"
              class="group inline-flex flex-col items-center gap-y-1 bg-cover opacity-70 hover:opacity-100 xl:gap-y-1.5"
              title="Create new miner or open existing one..."
            >
              <span :style="`background-image: url(${imageHelp})`" class="size-7 bg-contain xl:size-12" />
              <span class="hidden text-xs group-hover:inline-block">Help</span>
            </button>
            <a
              class="group ml-6 inline-flex flex-col items-center gap-y-1 bg-cover hover:opacity-100 xl:gap-y-1.5 xl:opacity-80"
              title="Create new miner or open existing one..." href="/easyminercenter/em/data"
            >
              <span :style="`background-image: url(${imageMiner})`" class="size-7 bg-contain xl:size-12" />
              <span class="text-xs group-hover:inline-block xl:hidden">Miners</span>
            </a>

            <UserMenu>
              <MenuButton class="ml-8 inline-flex flex-col items-center gap-y-1 bg-cover xl:gap-y-1.5">
                <span :style="`background-image: url(${imageUser})`" class="size-7 bg-contain xl:size-12" />
                <span class="text-xs">
                  <Truncate class="inline-block" :text="user?.name" :length="20" />
                </span>
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
import { useUserQuery } from '@/api/auth/useUserQuery'

import imageUser from '@/assets/user.png'
import imageMiner from '@/assets/new-miner.png'
import imageHelp from '@/assets/help.png'
import UserMenu from '@/components/Layout/UserMenu.vue'

const { data: miner } = useMinerQuery()
const { data: user } = useUserQuery()
</script>
