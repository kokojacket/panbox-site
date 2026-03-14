<template>
  <div class="pb-contact-qr-wrap" @mouseenter="handleEnter" @mousemove="handleMove" @mouseleave="handleLeave">
    <img class="pb-contact-qr" :src="src" :alt="alt" @load="handleLoad" />

    <Teleport to="body">
      <div v-if="visible" class="pb-contact-qr-popup" :style="popupStyle" aria-hidden="true">
        <img class="pb-contact-qr-popup-image" :src="src" :alt="alt" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineProps<{
  src: string
  alt: string
}>()

const visible = ref(false)
const popupX = ref(0)
const popupY = ref(0)
const naturalWidth = ref(320)
const naturalHeight = ref(320)

const PREVIEW_MAX_WIDTH = 320
const PREVIEW_MAX_HEIGHT = 360
const POPUP_PADDING = 14
const GAP = 20
const EDGE_OFFSET = 16

const previewImageWidth = computed(() => {
  const ratio = naturalWidth.value / naturalHeight.value || 1
  let width = PREVIEW_MAX_WIDTH
  let height = width / ratio

  if (height > PREVIEW_MAX_HEIGHT) {
    height = PREVIEW_MAX_HEIGHT
    width = height * ratio
  }

  return Math.round(width)
})

const previewImageHeight = computed(() => {
  const ratio = naturalWidth.value / naturalHeight.value || 1
  let height = PREVIEW_MAX_HEIGHT
  let width = height * ratio

  if (width > PREVIEW_MAX_WIDTH) {
    width = PREVIEW_MAX_WIDTH
    height = width / ratio
  }

  return Math.round(height)
})

const popupWidth = computed(() => previewImageWidth.value + POPUP_PADDING * 2)
const popupHeight = computed(() => previewImageHeight.value + POPUP_PADDING * 2)

const popupStyle = computed(() => ({
  left: `${popupX.value}px`,
  top: `${popupY.value}px`,
  width: `${popupWidth.value}px`,
  height: `${popupHeight.value}px`
}))

function updatePopupPosition(event: MouseEvent): void {
  if (typeof window === 'undefined') {
    return
  }

  let left = event.clientX + GAP
  let top = event.clientY - popupHeight.value / 2

  const maxLeft = window.innerWidth - popupWidth.value - EDGE_OFFSET
  if (left > maxLeft) {
    left = Math.max(EDGE_OFFSET, event.clientX - popupWidth.value - GAP)
  }

  const maxTop = window.innerHeight - popupHeight.value - EDGE_OFFSET
  top = Math.min(Math.max(EDGE_OFFSET, top), Math.max(EDGE_OFFSET, maxTop))

  popupX.value = left
  popupY.value = top
}

function handleLoad(event: Event): void {
  const target = event.target
  if (!(target instanceof HTMLImageElement)) {
    return
  }

  if (target.naturalWidth > 0 && target.naturalHeight > 0) {
    naturalWidth.value = target.naturalWidth
    naturalHeight.value = target.naturalHeight
  }
}

function handleEnter(event: MouseEvent): void {
  if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
    return
  }

  visible.value = true
  updatePopupPosition(event)
}

function handleMove(event: MouseEvent): void {
  if (!visible.value) {
    return
  }

  updatePopupPosition(event)
}

function handleLeave(): void {
  visible.value = false
}
</script>

<style scoped>
.pb-contact-qr-popup {
  position: fixed;
  z-index: 60;
  padding: 14px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(249, 250, 252, 0.96));
  box-shadow: 0 30px 72px rgba(35, 25, 16, 0.18), 0 12px 24px rgba(35, 25, 16, 0.08);
  pointer-events: none;
  backdrop-filter: blur(18px);
  overflow: hidden;
}

.pb-contact-qr-popup-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 22px;
  background: #fff;
}
</style>
