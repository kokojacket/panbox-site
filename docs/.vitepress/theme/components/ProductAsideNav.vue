<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'

type ProductNavItem = {
  text: string
  link: string
}

type ProductNavSection = {
  prefix: string
  title: string
  items: ProductNavItem[]
}

const productNavSections: ProductNavSection[] = [
  {
    prefix: '/products/search/',
    title: 'PanBox Search',
    items: [
      { text: '概览', link: '/products/search/overview' },
      { text: '快速开始', link: '/products/search/quickstart' },
      { text: '使用', link: '/products/search/usage' },
      { text: '风险提示', link: '/products/search/risk' }
    ]
  },
  {
    prefix: '/products/autosave/',
    title: 'PanBox Autosave',
    items: [
      { text: '概览', link: '/products/autosave/overview' },
      { text: '快速开始', link: '/products/autosave/quickstart' },
      { text: '使用', link: '/products/autosave/usage' },
      { text: '风险提示', link: '/products/autosave/risk' }
    ]
  },
  {
    prefix: '/products/sync/',
    title: 'PanBox Sync',
    items: [
      { text: '概览', link: '/products/sync/overview' },
      { text: '快速开始', link: '/products/sync/quickstart' },
      { text: '使用', link: '/products/sync/usage' },
      { text: '安全建议', link: '/products/sync/security' },
      { text: '风险提示', link: '/products/sync/risk' }
    ]
  }
]

const route = useRoute()

const currentSection = computed(() => {
  return productNavSections.find((section) => route.path.startsWith(section.prefix)) ?? null
})

function isActiveLink(link: string): boolean {
  const normalizedRoute = route.path.replace(/\/$/, '')
  const normalizedLink = link.replace(/\/$/, '')
  return normalizedRoute === normalizedLink
}
</script>

<template>
  <nav v-if="currentSection" class="pb-product-aside" aria-label="当前产品文档目录">
    <p class="pb-product-aside-title">{{ currentSection.title }}</p>
    <ul class="pb-product-aside-list">
      <li v-for="item in currentSection.items" :key="item.link">
        <a :href="item.link" :class="{ active: isActiveLink(item.link) }">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
