<template>
  <div class="ui-kit-toasts">
    <ui-button
      size="small"
      :text="'bus.success'"
      color="success"
      @click="
        () =>
          bus.emit(BUS_EVENTS.success, {
            message: 'Some success message',
          })
      "
    />
    <ui-button
      size="small"
      :text="'bus.error'"
      color="error"
      @click="
        () =>
          bus.emit(BUS_EVENTS.error, {
            message: 'Some error message',
          })
      "
    />
    <ui-button
      size="small"
      :text="'bus.warning'"
      color="warning"
      @click="
        () =>
          bus.emit(BUS_EVENTS.warning, {
            message: 'Some warning message',
          })
      "
    />
    <ui-button
      size="small"
      :text="'bus.info'"
      color="info"
      @click="
        () =>
          bus.emit(BUS_EVENTS.info, {
            message: 'Some info message',
          })
      "
    />
    <ui-button
      size="small"
      :text="'error view'"
      @click="
        () =>
          bus.emit(BUS_EVENTS.error, {
            component: UiErrorView,
            props: {
              iconName: $icons.AcademicCap,
              title: $t('ui-kit-page.some-label'),
              message: $t('ui-kit-page.some-error-message'),
            },
          })
      "
    />

    <ui-button
      size="small"
      :text="'default toast'"
      @click="
        () =>
          bus.emit(BUS_EVENTS.error, {
            component: DefaultToast,
            props: {
              iconName: $icons.AcademicCap,
              title: $t('ui-kit-page.some-label'),
              message: $t('ui-kit-page.some-error-message'),
            },
          })
      "
    />

    <ui-button
      size="small"
      :text="'ErrorHandler.process'"
      color="error"
      @click="handleProcessError"
    />
  </div>
</template>

<script setup lang="ts">
import { DefaultToast } from '@/common/ToastsManager/components'
import { bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { UiButton, UiErrorView } from '@/ui'

const handleProcessError = () => {
  ErrorHandler.process(new Error('some error message'))
}
</script>

<style scoped lang="scss">
.ui-kit-toasts {
  display: flex;
  gap: toRem(16);
}
</style>
