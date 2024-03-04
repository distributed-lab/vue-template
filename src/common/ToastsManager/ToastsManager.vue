<template>
  <slot />
</template>

<script setup lang="ts">
import type { EventHandler } from '@distributedlab/tools'
import { onUnmounted } from 'vue'

import { ToastPayload, useToasts } from '@/common/ToastsManager/composables'
import { bus, BUS_EVENTS } from '@/helpers'

const { showToast } = useToasts()

const initNotifications = () => {
  const showSuccessToast = (payload: ToastPayload) => showToast('SUCCESS', payload)
  const showWarningToast = (payload: ToastPayload) => showToast('WARNING', payload)
  const showErrorToast = (payload: ToastPayload) => showToast('ERROR', payload)
  const showInfoToast = (payload: ToastPayload) => showToast('INFO', payload)

  bus.on(BUS_EVENTS.success, showSuccessToast as EventHandler<ToastPayload>)
  bus.on(BUS_EVENTS.warning, showWarningToast as EventHandler<ToastPayload>)
  bus.on(BUS_EVENTS.error, showErrorToast as EventHandler<ToastPayload>)
  bus.on(BUS_EVENTS.info, showInfoToast as EventHandler<ToastPayload>)

  return () => {
    bus.off(BUS_EVENTS.success, showSuccessToast as EventHandler<ToastPayload>)
    bus.off(BUS_EVENTS.warning, showWarningToast as EventHandler<ToastPayload>)
    bus.off(BUS_EVENTS.error, showErrorToast as EventHandler<ToastPayload>)
    bus.off(BUS_EVENTS.info, showInfoToast as EventHandler<ToastPayload>)
  }
}

const removeListeners = initNotifications()

onUnmounted(() => {
  removeListeners()
})
</script>

<style scoped lang="scss"></style>
