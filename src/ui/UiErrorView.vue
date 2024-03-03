<template>
  <div class="ui-error-view">
    <ui-icon class="ui-error-view__icon" :name="iconName" :size="200" />

    <h3 class="ui-error-view__title">
      {{ title || $t('ui-error-view.title') }}
    </h3>

    <p class="ui-error-view__message">
      {{ message || $t('ui-error-view.message') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { IconNames } from '@/enums'
import { UiIcon } from '@/ui'

withDefaults(
  defineProps<{
    title?: string
    message?: string
    iconName?: IconNames
  }>(),
  {
    title: '',
    message: '',
    iconName: IconNames.ExclamationCircle,
  },
)
</script>

<style lang="scss" scoped>
.ui-error-view {
  display: grid;
  place-items: center;
  text-align: center;
  grid-gap: toRem(12);
  color: var(--text-primary-main);
}

.ui-error-view__title {
  font-size: toRem(24);
}

.ui-error-view__message {
  font-size: toRem(18);
}
</style>
