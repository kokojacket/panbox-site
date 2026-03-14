<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const items = [
  {
    id: 'search',
    title: 'PanBox Search',
    image: '/hero/search-dashboard.png'
  },
  {
    id: 'autosave',
    title: 'PanBox Autosave',
    image: '/hero/autosave-dashboard.png'
  },
  {
    id: 'sync',
    title: 'PanBox Sync',
    image: '/hero/sync-dashboard.png'
  }
] as const

type ShowcaseItem = (typeof items)[number]

const activeItem = ref<ShowcaseItem | null>(null)
const previousBodyOverflow = ref('')
const previousHtmlOverflow = ref('')

const openPreview = (item: ShowcaseItem) => {
  activeItem.value = item
}

const closePreview = () => {
  activeItem.value = null
}

const restoreScrollLock = () => {
  if (typeof document === 'undefined') {
    return
  }

  document.body.style.overflow = previousBodyOverflow.value
  document.documentElement.style.overflow = previousHtmlOverflow.value
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closePreview()
  }
}

watch(activeItem, (item) => {
  if (typeof document === 'undefined') {
    return
  }

  if (item) {
    previousBodyOverflow.value = document.body.style.overflow
    previousHtmlOverflow.value = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return
  }

  restoreScrollLock()
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  restoreScrollLock()
})
</script>

<template>
  <div class="pb-hero-showcase" aria-label="PanBox 产品界面预览">
    <div class="pb-hero-stage">
      <button
        v-for="item in items"
        :key="item.id"
        type="button"
        class="pb-hero-shot"
        :class="`pb-hero-shot--${item.id}`"
        :aria-label="`查看 ${item.title} 界面大图`"
        @click="openPreview(item)"
      >
        <img class="pb-hero-shot-image" :src="item.image" :alt="`${item.title} 界面截图`" loading="lazy" />
      </button>
    </div>

    <Teleport to="body">
      <transition name="pb-lightbox">
        <div
          v-if="activeItem"
          class="pb-lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="`${activeItem.title} 界面预览`"
        >
          <div class="pb-lightbox-backdrop" @click="closePreview" />
          <div class="pb-lightbox-panel">
            <button type="button" class="pb-lightbox-close" aria-label="关闭预览" @click="closePreview">
              关闭
            </button>
            <img class="pb-lightbox-image" :src="activeItem.image" :alt="`${activeItem.title} 界面截图大图`" />
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
