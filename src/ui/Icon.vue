<template>
  <svg class="icon" aria-hidden="true">
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
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
</style>
