<script lang="ts" setup>
import { Icon } from '@/common'

import { BN } from '@/utils'
import { computed, getCurrentInstance, ref, useAttrs, useSlots } from 'vue'

type INPUT_TYPES = 'text' | 'number' | 'password'

type SCHEMES = 'primary' | 'secondary'

const props = withDefaults(
  defineProps<{
    scheme?: SCHEMES
    modelValue: string | number
    label?: string
    placeholder?: string
    type?: INPUT_TYPES
    errorMessage?: string
  }>(),
  {
    scheme: 'primary',
    type: 'text',
    label: '',
    placeholder: ' ',
    errorMessage: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
}>()

const attrs = useAttrs()

const slots = useSlots()

const uid = getCurrentInstance()?.uid

const isPasswordShown = ref(false)

const isNumberType = computed(() => props.type === 'number')
const isPasswordType = computed(() => props.type === 'password')

const min = computed((): string => (attrs?.min as string) || '')
const max = computed((): string => (attrs?.max as string) || '')

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const listeners = computed(() => ({
  input: (event: Event) => {
    const eventTarget = event.target as HTMLInputElement
    if (isNumberType.value) {
      eventTarget.value = normalizeRange(normalizeNumber(eventTarget.value))
    }
    if (props.modelValue === eventTarget.value) return

    emit('update:modelValue', eventTarget.value)
  },
}))

const inputClasses = computed(() =>
  [
    ...(slots.nodeLeft ? ['input-field--node-left'] : []),
    ...(slots.nodeRight || isPasswordType.value || props.errorMessage
      ? ['input-field--node-right']
      : []),
    ...(isDisabled.value ? ['input-field--disabled'] : []),
    ...(isReadonly.value ? ['input-field--readonly'] : []),
    ...(props.errorMessage ? ['input-field--error'] : []),
    `input-field--${props.scheme}`,
  ].join(' '),
)

const inputType = computed(() => {
  if (isPasswordType.value) {
    return isPasswordShown.value ? 'text' : 'password'
  }
  return 'text'
})

const normalizeNumber = (value: string) => {
  return isNaN(Number(value)) ? props.modelValue : value
}

const normalizeRange = (value: string | number): string => {
  let result = value

  if (min.value && new BN(value).compare(min.value) < 0) {
    result = min.value
  } else if (max.value && new BN(value).compare(max.value) > 0) {
    result = max.value
  }

  return result as string
}

const setHeightCSSVar = (element: HTMLElement) => {
  element.style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<template>
  <div class="input-field" :class="inputClasses">
    <div class="input-field__input-wrp">
      <div v-if="$slots.nodeLeft" class="input-field__node-left-wrp">
        <slot name="nodeLeft" />
      </div>
      <input
        class="input-field__input"
        :id="`input-field--${uid}`"
        v-bind="$attrs"
        v-on="listeners"
        :value="modelValue"
        :placeholder="!label ? placeholder : ' '"
        :tabindex="isDisabled || isReadonly ? -1 : $attrs.tabindex"
        :type="inputType"
        :min="min"
        :max="max"
        :disabled="isDisabled || isReadonly"
      />
      <label
        v-if="label"
        :for="`input-field--${uid}`"
        class="input-field__label"
      >
        {{ label }}
      </label>
      <div
        v-if="$slots.nodeRight || isPasswordType || props.errorMessage"
        class="input-field__node-right-wrp"
      >
        <button
          v-if="isPasswordType"
          type="button"
          @click="isPasswordShown = !isPasswordShown"
        >
          <icon
            class="input-field__password-icon"
            :name="isPasswordShown ? $icons.eye : $icons.eyeOff"
          />
        </button>
        <icon
          v-else-if="props.errorMessage"
          class="input-field__error-icon"
          :name="$icons.exclamation"
        />
        <slot v-else name="nodeRight" />
      </div>
    </div>
    <transition
      name="input-field__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="input-field__err-msg">
        {{ errorMessage }}
      </span>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.input-field {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;

  &--disabled,
  &--readonly {
    opacity: 0.5;
  }
}

.input-field__label {
  pointer-events: none;
  position: absolute;
  padding: toRem(4);
  top: 0;
  left: var(--field-padding-left);
  font-size: toRem(12);
  line-height: 1.3;
  font-weight: 700;
  background: var(--field-bg-primary);
  transform: translateY(-50%);

  @include field-label;

  transition-property: all;

  .input-field--secondary & {
    padding: 0;
  }

  .input-field--secondary.input-field--node-left & {
    left: calc(var(--field-padding-left) * 3);
  }

  .input-field__input:not(:placeholder-shown) + & {
    top: 0;
    color: var(--field-text);
    border-color: var(--field-border-hover);

    .input-field--secondary & {
      transform: translateY(25%);
    }
  }

  .input-field--error:not(:focus):not(:placeholder-shown) & {
    color: var(--field-error);
  }

  .input-field--secondary.input-field--error & {
    color: var(--field-error);
  }
  /* stylelint-disable-next-line */
  .input-field__input:not(:focus):placeholder-shown + & {
    top: 50%;
    color: var(--field-label);
    font-size: toRem(16);
    font-weight: 400;
    line-height: 1.3;

    .input-field--node-left & {
      left: calc(var(--field-padding-left) * 3);
    }
  }

  /* stylelint-disable-next-line */
  .input-field__input:not([disabled]):focus ~ & {
    color: var(--field-label-focus);
    font-weight: 700;

    .input-field--secondary & {
      transform: translateY(25%);
    }
  }

  .input-field__input:not(:focus):placeholder-shown:-webkit-autofill + & {
    top: 50%;
    color: var(--field-label);
    font-size: toRem(16);
    font-weight: 400;
    line-height: 1.3;

    .input-field--node-left & {
      left: calc(var(--field-padding-left) * 3);
    }
  }

  /* stylelint-disable-next-line */
  .input-field--secondary & {
    background: var(--field-bg-secondary);
  }
}

.input-field__input-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.input-field__input {
  padding: var(--field-padding);
  background: var(--field-bg-primary);
  box-shadow: inset 0 0 0 toRem(50) var(--field-bg-primary);
  border: none;

  @include field-text;

  .input-field--primary & {
    @include field-border;
  }

  .input-field--secondary & {
    position: relative;
    background: var(--field-bg-secondary);
    box-shadow: inset 0 0 0 toRem(50) var(--field-bg-secondary);
    border-bottom: toRem(1) solid var(--field-border);
    padding: calc(var(--field-padding-top) + #{toRem(12)})
      var(--field-padding-right) var(--field-padding-bottom)
      var(--field-padding-left);
  }

  transition-property: all;

  &::-webkit-input-placeholder {
    @include field-placeholder;
  }

  &::-moz-placeholder {
    @include field-placeholder;
  }

  &:-moz-placeholder {
    @include field-placeholder;
  }

  &:-ms-input-placeholder {
    @include field-placeholder;
  }

  &::placeholder {
    @include field-placeholder;
  }

  // Hide number arrows
  &[type='number'] {
    -moz-appearance: textfield;

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .input-field--node-left & {
    padding-left: calc(var(--field-padding-left) * 3);
  }

  .input-field--node-right & {
    padding-right: calc(var(--field-padding-right) * 3);
  }

  .input-field--error & {
    border-color: var(--field-error);
    box-shadow: inset 0 0 0 toRem(50) var(--field-bg-primary),
      0 0 0 toRem(1) var(--field-error);
  }

  .input-field--secondary.input-field--error & {
    box-shadow: inset 0 0 0 toRem(50) var(--field-bg-secondary);
    border-bottom: toRem(1) solid var(--field-error);
  }

  &:not([disabled]):focus {
    .input-field--primary & {
      box-sizing: border-box;
      box-shadow: inset 0 0 0 toRem(50) var(--field-bg-primary),
        0 0 0 toRem(1) var(--field-border-focus);
      border-color: var(--field-border-focus);
    }

    .input-field--secondary & {
      box-shadow: inset 0 0 0 toRem(50) var(--field-bg-secondary);
    }
  }

  &:not([disabled]):not(:focus):hover {
    .input-field--primary & {
      border-color: var(--field-border-hover);
    }
  }
}

.input-field__node-left-wrp {
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: var(--field-padding-left);
  transform: translateY(-50%);
  color: inherit;
  max-height: 100%;

  // one line small hack
  // stylelint-disable-next-line
  z-index: 1;
}

.input-field__node-right-wrp {
  position: absolute;
  top: 50%;
  right: var(--field-padding-right);
  transform: translateY(-50%);
  color: inherit;

  // one line small hack
  // stylelint-disable-next-line
  z-index: 1;
}

.input-field__password-icon {
  max-width: toRem(24);
  max-height: toRem(24);
}

.input-field__error-icon {
  max-width: toRem(24);
  max-height: toRem(24);
  color: var(--field-error);
}

.input-field__icon {
  width: toRem(18);
  height: toRem(18);
}

.input-field__err-msg {
  @include field-error;
}

.input-field__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.input-field__err-msg-transition-leave-active {
  animation: fade-down var(--field-transition-duration) reverse;
}

@keyframes fade-down {
  from {
    height: 0;
  }

  to {
    height: var(--field-error-msg-height);
  }
}
</style>
