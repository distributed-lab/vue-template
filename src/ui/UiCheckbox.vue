<template>
  <label
    class="ui-checkbox"
    :class="{
      'ui-checkbox--disabled': disabled,
      'ui-checkbox--checked': modelValue,
    }"
  >
    <input
      v-bind="$attrs"
      class="ui-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      :name="($attrs.name as string) || label"
      :value="value"
      :disabled="disabled"
      @change="onChange"
    />

    <span class="ui-checkbox__frame-wrp" aria-hidden="true">
      <span class="ui-checkbox__frame" :class="{ 'ui-checkbox__frame--checked': modelValue }">
        <ui-icon v-if="modelValue" class="ui-checkbox__frame-icon" :name="$icons.Check" />
      </span>
    </span>

    <span v-if="label" class="ui-checkbox__label">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts" setup>
import { UiIcon } from '@/ui'

withDefaults(
  defineProps<{
    modelValue: boolean
    value?: string | number
    label?: string
    disabled?: boolean
  }>(),
  {
    value: '',
    label: '',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:model-value', v: boolean): void
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  emit('update:model-value', target.checked)
}
</script>

<style lang="scss" scoped>
.ui-checkbox {
  cursor: pointer;
  display: grid;
  align-items: center;
  grid-template-columns: toRem(18) 1fr;
  grid-gap: toRem(12);
  position: relative;

  &--disabled {
    cursor: not-allowed;
    filter: grayscale(50);
    opacity: 0.5;
  }
}

.ui-checkbox__input {
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

.ui-checkbox__frame-wrp {
  overflow: hidden;
  width: toRem(18);
  height: toRem(18);
  transition: var(--field-transition-duration) ease-in;
  transition-property: border-color, box-shadow, background-color;
  border-radius: toRem(3);
  box-shadow: inset 0 0 0 toRem(2) var(--field-border);
}

.ui-checkbox__frame {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--field-bg-primary);

  .ui-checkbox--checked & {
    background-color: var(--primary-main);
  }
}

.ui-checkbox__frame-icon {
  width: toRem(42);
  height: toRem(42);
}

.ui-checkbox__label {
  display: inline-flex;
  user-select: none;

  @include field-text;
}
</style>
