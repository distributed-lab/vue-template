<template>
  <div class="main-layout">
    <app-navbar />

    <router-view v-slot="{ Component, route }">
      <transition :name="(route.meta.transition as string) || 'fade'" mode="out-in">
        <component class="main-layout__content" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { AppNavbar } from '@/ui'
</script>

<style scoped lang="scss">
.main-layout {
  padding: 0 var(--app-padding-right) 0 var(--app-padding-left);
}
</style>
