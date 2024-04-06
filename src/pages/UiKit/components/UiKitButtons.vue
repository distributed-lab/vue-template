<template>
  <div class="ui-kit-buttons">
    <div class="ui-kit-buttons__content">
      <ui-button
        :text="state.text"
        :scheme="state.scheme"
        :modification="state.modification"
        :color="state.color"
        :size="state.size"
        :icon-left="state.iconLeft"
        :icon-right="state.iconRight"
        :disabled="state.isDisabled"
      />
    </div>
    <div class="ui-kit-buttons__settings">
      <ui-input-field v-model="state.text" label="Text" />
      <ui-select v-model="state.scheme" label="Scheme" :value-options="Object.values(Scheme)" />
      <ui-select
        v-model="state.modification"
        label="Modification"
        :value-options="Object.values(Modification)"
      />
      <ui-select v-model="state.color" label="Color" :value-options="Object.values(Color)" />
      <ui-select v-model="state.size" label="Size" :value-options="Object.values(Size)" />
      <ui-select
        v-model="state.iconLeft"
        label="Icon Left"
        :value-options="[undefined, ...Object.values(IconNames)]"
      />
      <ui-select
        v-model="state.iconRight"
        label="Icon Right"
        :value-options="[undefined, ...Object.values(IconNames)]"
      />

      <ui-checkbox v-model="state.isDisabled" label="Disabled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { IconNames } from '@/enums'
import { UiButton, UiCheckbox, UiInputField, UiSelect } from '@/ui'

enum Scheme {
  Filled = 'filled',
  Flat = 'flat',
  None = 'none',
}

enum Modification {
  BorderCircle = 'border-circle',
  BorderRounded = 'border-rounded',
  None = 'none',
}

enum Color {
  Primary = 'primary',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  None = 'none',
}

enum Size {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  XSmall = 'x-small',
  None = 'none',
}

const state = reactive<{
  text: string
  scheme: Scheme
  modification: Modification
  color: Color
  size: Size
  iconLeft?: IconNames
  iconRight?: IconNames
  isDisabled: boolean
}>({
  text: '',
  scheme: Scheme.Filled,
  modification: Modification.BorderCircle,
  color: Color.Primary,
  size: Size.Medium,
  iconLeft: undefined,
  iconRight: undefined,
  isDisabled: false,
})
</script>

<style scoped lang="scss">
.ui-kit-buttons {
  flex: 1;
  width: 100%;
  display: flex;
  gap: toRem(24);
}

.ui-kit-buttons__content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.ui-kit-buttons__settings {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  width: 50%;
}
</style>
