<template>
  <svg class="ui-icon" aria-hidden="true">
    <use :href="`#${name}-icon`" />
  </svg>
</template>

<script lang="ts" setup>
import { IconNames } from '@/enums'

defineProps<{
  name: IconNames
}>()
</script>

<style lang="scss" scoped>
.ui-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
</style>
