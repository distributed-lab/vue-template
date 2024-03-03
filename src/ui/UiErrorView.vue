<template>
  <div class="error-message">
    <ui-icon class="error-message__icon" :name="iconName" size="200" />

    <h3 class="error-message__title">
      {{ title || $t('error-message.default-title') }}
    </h3>

    <p class="error-message__message">
      {{ message || $t('error-message.default-message') }}
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
.error-message {
  display: grid;
  place-items: center;
  text-align: center;
  grid-gap: toRem(12);
  color: var(--text-primary-main);
}

.error-message__title {
  font-size: toRem(24);
}

.error-message__message {
  font-size: toRem(18);
}
</style>
