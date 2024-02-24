<template>
  <svg ref="rootEl" class="ui-icon" aria-hidden="true">
    <use :href="`#${name}-icon`" />
  </svg>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

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

onMounted(() => {
  if (props.size) {
    rootEl.value?.style.setProperty('--size', `${props.size / 16}rem`)
  }
})
</script>

<style lang="scss" scoped>
.ui-icon {
  --size: #{toRem(24)};

  @include static-size(var(--size));
}
</style>
