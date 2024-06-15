<template>
  <VModal
    :open="isOpen"
    class="max-w-4xl px-5 pb-4 pt-3"
    keep-alive
    :dismissible="task.state !== 'in_progress'"
    @close="close"
  >
    <IframeWrapper class="mt-2">
      <iframe
        ref="iframeRef"
        class="h-dvh max-h-[600px] w-full"
        :src="iframeSrc"
        frameborder="0"
      />
    </IframeWrapper>
  </VModal>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import { type PreprocessingTask, useDataPreprocessingTask } from '@preprocessing/composables/useDataPreprocessing'
import VModal from '@/components/VModal.vue'
import { useMinerQuery } from '@/api/miners/useMinerQuery'
import IframeWrapper from '@/components/IframeWrapper.vue'

const props = defineProps<{
  task: PreprocessingTask
}>()
const { task } = toRefs(props)

const { minerId } = useMinerQuery()

const iframeRef = ref()
const { isOpen, close } = useDataPreprocessingTask(task)

const iframeSrc = computed(() => {
  const { source } = task.value
  const isSingle = source.length === 1

  const action = isSingle ? 'add-attribute' : 'add-attributes'
  const urlBase = `/easyminercenter/em/attributes/${action}`

  const searchParams = new URLSearchParams()

  if (isSingle) {
    searchParams.append('column', String(source[0].id))
  }
  else {
    const namesString = source.map(source => source.name).join(',')
    searchParams.append('columnNames', namesString)
  }

  searchParams.append('miner', String(minerId))
  searchParams.append('mode', 'iframe')
  searchParams.append('returnPostMessage', '1')

  return `${urlBase}?${searchParams}`
})
</script>
