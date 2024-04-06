<template>
  <div class="ui-kit-checks">
    <div class="ui-kit-checks__content">
      <ui-checkbox :disabled="isDisabled" :readonly="isReadonly" />
      <ui-checkbox :label="`Label`" :disabled="isDisabled" :readonly="isReadonly" />

      <ui-switch :disabled="isDisabled" :readonly="isReadonly" />
      <ui-switch :label="`Label`" :disabled="isDisabled" :readonly="isReadonly" />
    </div>
    <div class="ui-kit-checks__settings">
      <ui-switch v-model="isDisabled" :label="'Disabled'" />
      <ui-switch v-model="isReadonly" :label="'Readonly'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiCheckbox, UiSwitch } from '@/ui'

const isDisabled = ref(false)
const isReadonly = ref(false)
</script>

<style scoped lang="scss">
.ui-kit-checks {
  flex: 1;
  width: 100%;
  display: flex;
  gap: toRem(24);
}

.ui-kit-checks__content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: toRem(36);
  width: 50%;
}

.ui-kit-checks__settings {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  width: 50%;
}
</style>
