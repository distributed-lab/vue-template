<template>
  <div class="ui-kit-selects">
    <div class="ui-kit-selects__content">
      <ui-select
        v-model="val1"
        :value-options="SELECT_OPTIONS"
        :disabled="isDisabled"
        :readonly="isReadonly"
      />
      <ui-select
        :label="`Select Label`"
        :value-options="SELECT_OPTIONS"
        :disabled="isDisabled"
        :readonly="isReadonly"
      />
      <ui-select
        :label="`Select Label`"
        :value-options="SELECT_OPTIONS"
        error-message="error message"
        :disabled="isDisabled"
        :readonly="isReadonly"
      />
      <ui-select
        :label="`Select Label`"
        :value-options="SELECT_OPTIONS"
        note="Note message"
        :disabled="isDisabled"
        :readonly="isReadonly"
      />

      <ui-basic-select
        :label="`Basic Select Label`"
        v-model="val2"
        :value-options="
          SELECT_OPTIONS.map(el => ({
            title: `Option ${el}`,
            value: el,
          }))
        "
        :disabled="isDisabled"
        :readonly="isReadonly"
      />
    </div>

    <div class="ui-kit-selects__settings">
      <ui-switch v-model="isDisabled" :label="'Disabled'" />
      <ui-switch v-model="isReadonly" :label="'Readonly'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiBasicSelect, UiSelect, UiSwitch } from '@/ui'

const SELECT_OPTIONS = ['1', '2', '3', '4', '5']

const val1 = ref(SELECT_OPTIONS[0])
const val2 = ref(SELECT_OPTIONS[0])

const isDisabled = ref(false)
const isReadonly = ref(false)
</script>

<style scoped lang="scss">
.ui-kit-selects {
  flex: 1;
  width: 100%;
  display: flex;
  gap: toRem(24);
}

.ui-kit-selects__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: toRem(36);
  width: 50%;
}

.ui-kit-selects__settings {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  width: 50%;
}
</style>
