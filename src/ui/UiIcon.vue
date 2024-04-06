<template>
  <svg ref="rootEl" class="ui-icon" aria-hidden="true">
    <use :href="`#${name}-icon`" />
  </svg>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { IconNames } from '@/enums'

const props = withDefaults(
  defineProps<{
    name: IconNames
    size?: number
  }>(),
  {
    size: undefined,
  },
)

const rootEl = ref()

watch(
  () => [props.size, rootEl.value],
  () => {
    if (props.size) {
      setIconSize(props.size)
    }
  },
)

const setIconSize = (value: number) => {
  rootEl.value?.style.setProperty('--size', `${value / 16}rem`)
}
</script>

<style lang="scss" scoped>
.ui-icon {
  --size: #{toRem(24)};

  @include static-size(var(--size));
}
</style>
