<template>
  <div class="ui-kit-textareas">
    <div class="ui-kit-textareas__content">
      <ui-textarea :disabled="isDisabled" :readonly="isReadonly" />
      <ui-textarea :label="`Label`" :disabled="isDisabled" :readonly="isReadonly" />
      <ui-textarea :placeholder="`Placeholder`" :disabled="isDisabled" :readonly="isReadonly" />
      <ui-textarea
        :label="`Label`"
        error-message="Error message"
        :disabled="isDisabled"
        :readonly="isReadonly"
      />
      <ui-textarea
        :label="`Label`"
        note="Lorem ipsum dolor sit amet concestetur!"
        :disabled="isDisabled"
        :readonly="isReadonly"
      />
    </div>
    <div class="ui-kit-textareas__settings">
      <ui-switch v-model="isDisabled" :label="'Disabled'" />
      <ui-switch v-model="isReadonly" :label="'Readonly'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiSwitch, UiTextarea } from '@/ui'

const isDisabled = ref(false)
const isReadonly = ref(false)
</script>

<style scoped lang="scss">
.ui-kit-textareas {
  flex: 1;
  width: 100%;
  display: flex;
  gap: toRem(24);
}

.ui-kit-textareas__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: toRem(36);
  width: 50%;
}

.ui-kit-textareas__settings {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  width: 50%;
}
</style>
