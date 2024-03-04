<template>
  <label
    class="ui-switch"
    :class="{
      'ui-switch--disabled': isDisabled,
      'ui-switch--readonly': isReadonly,
      'ui-switch--checked': model,
    }"
  >
    <input
      class="ui-switch__input"
      type="checkbox"
      v-bind="$attrs"
      :value="value"
      :checked="model"
      :name="($attrs.name as string) || label"
      :tabindex="isDisabled || isReadonly ? -1 : ($attrs.tabindex as number)"
      :disabled="isDisabled"
      @change="onChange"
    />

    <span class="ui-switch__frame-wrp" aria-hidden="true">
      <span class="ui-switch__frame" :class="{ 'ui-switch__frame--checked': model }" />
    </span>

    <span v-if="label" class="ui-switch__label">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

import { DISABLED_FIELD_TUPLE, READONLY_FIELD_TUPLE } from '@/consts'

const model = defineModel<boolean>({
  default: false,
})

withDefaults(
  defineProps<{
    value?: string | number
    label?: string
  }>(),
  {
    value: '',
    label: '',
  },
)

const attrs = useAttrs()

const isDisabled = computed(() => DISABLED_FIELD_TUPLE.includes(attrs.disabled as string | boolean))

const isReadonly = computed(() => READONLY_FIELD_TUPLE.includes(attrs.readonly as string | boolean))

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  model.value = target.checked
}
</script>

<style lang="scss" scoped>
.ui-switch {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: toRem(12);
  position: relative;

  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(50);
    opacity: 0.5;
  }

  &--readonly {
    cursor: not-allowed;
    pointer-events: none;
  }
}

.ui-switch__input {
  position: absolute;
  width: toRem(1);
  height: toRem(1);
  margin: calc(#{toRem(1)} * -1);
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.ui-switch__frame-wrp {
  position: relative;
  overflow: hidden;
  width: toRem(48);
  height: toRem(24);
  transition: var(--field-transition-duration) ease-in;
  transition-property: border-color, box-shadow, background-color;
  border-radius: toRem(50);
  box-shadow: inset 0 0 0 toRem(1) var(--field-border);

  .ui-switch--checked & {
    background-color: var(--primary-main);
  }
}

.ui-switch__frame {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: toRem(calc((24 - 16) / 2));
  transform: translateY(-50%);
  width: clamp(#{toRem(16)}, #{toRem(16)}, #{toRem(16)});
  height: clamp(#{toRem(16)}, #{toRem(16)}, #{toRem(16)});
  min-width: clamp(#{toRem(16)}, #{toRem(16)}, #{toRem(16)});
  min-height: clamp(#{toRem(16)}, #{toRem(16)}, #{toRem(16)});
  border-radius: 50%;
  background: var(--primary-light);
  transition: left var(--field-transition-duration) ease-in-out;

  .ui-switch--checked & {
    left: calc(100% - #{toRem(16 + calc((24 - 16) / 2))});
  }
}

.ui-switch__label {
  display: inline-flex;
  user-select: none;

  @include field-text;
}
</style>
