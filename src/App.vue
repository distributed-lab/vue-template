<template>
  <div v-if="isAppInitialized" class="app__container">
    <app-navbar class="app__navbar" />
    <router-view v-slot="{ Component, route }">
      <transition :name="(route.meta.transition as string) || 'fade'" mode="out-in">
        <component class="app__main" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { config } from '@config'
import { onUnmounted, ref } from 'vue'

import { AppNavbar } from '@/common'
import { useNotifications } from '@/composables'
import { bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { NotificationPayload } from '@/types'

const isAppInitialized = ref(false)

const { showToast } = useNotifications()

const init = async () => {
  try {
    document.title = config.APP_NAME

    initNotifications()
  } catch (error) {
    ErrorHandler.process(error)
  }
  isAppInitialized.value = true
}

const initNotifications = () => {
  bus.on(BUS_EVENTS.success, showSuccessToast)
  bus.on(BUS_EVENTS.warning, showWarningToast)
  bus.on(BUS_EVENTS.error, showErrorToast)
  bus.on(BUS_EVENTS.info, showInfoToast)
}

onUnmounted(() => {
  bus.off(BUS_EVENTS.success, showSuccessToast)
  bus.off(BUS_EVENTS.warning, showWarningToast)
  bus.off(BUS_EVENTS.error, showErrorToast)
  bus.off(BUS_EVENTS.info, showInfoToast)
})

const showSuccessToast = (payload: unknown) => showToast('success', payload as NotificationPayload)

const showWarningToast = (payload: unknown) => showToast('warning', payload as NotificationPayload)

const showErrorToast = (payload: unknown) => showToast('error', payload as NotificationPayload)

const showInfoToast = (payload: unknown) => showToast('info', payload as NotificationPayload)

init()
</script>

<style lang="scss" scoped>
.app__container {
  overflow: hidden;
  display: grid;
  grid-template-rows: toRem(85) 1fr max-content;
  flex: 1;

  @include respond-to(small) {
    grid-template-rows: max-content 1fr max-content;
  }
}

.app__main {
  padding: 0 var(--app-padding-right) 0 var(--app-padding-left);
}

.fade-enter-active {
  animation: fade-in 0.25s;
}

.fade-leave-active {
  animation: fade-in 0.25s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
