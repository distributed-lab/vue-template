<template>
  <div class="ui-tooltip__wrapper">
    <tooltip
      :triggers="[...(isShowByClick ? ['click'] : ['hover'])]"
      :auto-hide="true"
      :popper-class="`ui-tooltip ${$attrs.class}`"
    >
      <div class="ui-tooltip__trigger">
        <slot name="trigger" />
      </div>

      <template #popper>
        <div class="ui-tooltip__body">
          <slot />
        </div>
      </template>
    </tooltip>
  </div>
</template>

<script lang="ts" setup>
import 'floating-vue/dist/style.css'

import { Tooltip } from 'floating-vue'
import { computed } from 'vue'

import { isMobile } from '@/helpers'

const props = withDefaults(
  defineProps<{
    isPreferClick?: boolean
  }>(),
  {
    isPreferClick: false,
  },
)

const isShowByClick = computed(() => props.isPreferClick || isMobile())
</script>

<style lang="scss">
.ui-tooltip {
  .v-popper {
    width: auto;
  }

  .v-popper__inner {
    padding: 0;
  }
}

.ui-tooltip__trigger {
  cursor: help;
}

.ui-tooltip__body {
  text-align: center;
  padding: toRem(10);
  border-radius: toRem(28);
  max-width: toRem(200);
  font-size: toRem(12);
  line-height: 1.35;
  letter-spacing: toRem(0.4);
}
</style>
