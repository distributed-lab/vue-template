<template>
  <div class="ui-kit-fields">
    <div class="ui-kit-fields__content">
      <ui-input-field :disabled="isDisabled" :readonly="isReadonly" />
      <ui-input-field :disabled="isDisabled" :readonly="isReadonly" :label="'label'" />
      <ui-input-field
        :disabled="isDisabled"
        :readonly="isReadonly"
        :label="'label'"
        :placeholder="'placeholder'"
      />
      <ui-input-field
        :disabled="isDisabled"
        :readonly="isReadonly"
        :label="'label'"
        :placeholder="'placeholder'"
        :error-message="'error message'"
      />
      <ui-input-field
        :disabled="isDisabled"
        :readonly="isReadonly"
        :label="'label'"
        :placeholder="'placeholder'"
        :note="'Lorem ipsum dolor sit amet concestetur!'"
      />

      <ui-input-field
        :disabled="isDisabled"
        :readonly="isReadonly"
        :label="'label'"
        :placeholder="'placeholder'"
      >
        <template #nodeLeft>
          <ui-icon :name="$icons.Search" />
        </template>
      </ui-input-field>
      <ui-input-field
        :disabled="isDisabled"
        :readonly="isReadonly"
        :label="'label'"
        :placeholder="'placeholder'"
      >
        <template #nodeLeft>
          <ui-icon :name="$icons.Search" />
        </template>
        <template #nodeRight>
          <ui-icon :name="$icons.Plus" />
        </template>
      </ui-input-field>
      <ui-input-field
        :disabled="isDisabled"
        :readonly="isReadonly"
        :label="'label'"
        :placeholder="'placeholder'"
      >
        <template #nodeLeft>
          {{ `USDC` }}
        </template>
        <template #nodeRight>
          {{ `USDT` }}
        </template>
      </ui-input-field>
    </div>
    <div class="ui-kit-fields__settings">
      <ui-switch v-model="isDisabled" :label="'Disabled'" />
      <ui-switch v-model="isReadonly" :label="'Readonly'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { UiIcon, UiInputField, UiSwitch } from '@/ui'

const isDisabled = ref(false)
const isReadonly = ref(false)
</script>

<style scoped lang="scss">
.ui-kit-fields {
  flex: 1;
  width: 100%;
  display: flex;
  gap: toRem(24);
}

.ui-kit-fields__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: toRem(36);
  width: 50%;
}

.ui-kit-fields__settings {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  width: 50%;
}
</style>
