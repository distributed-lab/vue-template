<template>
  <div class="ui-no-data-message">
    <ui-icon class="ui-no-data-message__img" :name="iconName" />
    <span class="ui-no-data-message__message">
      {{ message || $t('ui-no-data-message.default-msg') }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { IconNames } from '@/enums'
import { UiIcon } from '@/ui'

withDefaults(
  defineProps<{
    message?: string
    iconName?: IconNames
  }>(),
  { message: '', iconName: IconNames.arrowCircleUp },
)
</script>

<style lang="scss" scoped>
.ui-no-data-message {
  display: grid;
  place-items: center;
  text-align: center;
  grid-gap: toRem(12);
}

.ui-no-data-message__img {
  width: 100%;
  height: auto;
}

.ui-no-data-message__message {
  font-size: toRem(18);
}
</style>
