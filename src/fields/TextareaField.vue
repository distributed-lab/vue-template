<script lang="ts" setup>
import { computed, getCurrentInstance, useAttrs } from 'vue'

type SCHEMES = 'primary' | 'secondary'

const props = withDefaults(
  defineProps<{
    scheme?: SCHEMES
    modelValue: string | number
    label?: string
    placeholder?: string
    errorMessage?: string
  }>(),
  {
    scheme: 'primary',
    label: '',
    placeholder: ' ',
    errorMessage: '',
  },
)

const emit = defineEmits<{
  (event: 'update:model-value', value: string | number): void
}>()

const attrs = useAttrs()

const uid = getCurrentInstance()?.uid

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const listeners = computed(() => ({
  input: (event: Event) => {
    const eventTarget = event.target as HTMLTextAreaElement

    if (props.modelValue === eventTarget.value) return

    emit('update:model-value', eventTarget.value)
  },
}))

const textareaClasses = computed(() =>
  [
    'textarea-field',
    ...(isDisabled.value ? ['textarea-field--disabled'] : []),
    ...(isReadonly.value ? ['textarea-field--readonly'] : []),
    ...(props.errorMessage ? ['textarea-field--error'] : []),
    `textarea-field--${props.scheme}`,
  ].join(' '),
)

const setHeightCSSVar = (element: HTMLElement) => {
  element.style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<template>
  <div :class="textareaClasses">
    <div class="textarea-field__textarea-wrp">
      <textarea
        class="textarea-field__textarea"
        :id="`textarea-field--${uid}`"
        v-bind="$attrs"
        v-on="listeners"
        :value="modelValue"
        :placeholder="placeholder"
        :tabindex="isDisabled || isReadonly ? -1 : $attrs.tabindex"
        :disabled="isDisabled || isReadonly"
      />
      <label
        v-if="label"
        :for="`textarea-field--${uid}`"
        class="textarea-field__label"
      >
        {{ label }}
      </label>
    </div>
    <transition
      name="textarea-field__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="textarea-field__err-msg">
        {{ errorMessage }}
      </span>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.textarea-field {
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

.textarea-field__label {
  $input-field-secondary-label-bg: linear-gradient(
    to bottom,
    var(--field-bg-primary) 0%,
    var(--field-bg-primary) 50%,
    var(--background-secondary-main) 50%,
    var(--background-secondary-main) 100%
  );

  pointer-events: none;
  position: absolute;
  padding: toRem(4);
  top: 0;
  left: var(--field-padding-left);
  font-size: toRem(12);
  line-height: 1.3;
  font-weight: 700;
  transform: translateY(-50%);
  background: var(--field-bg-primary);

  @include field-label;

  transition-property: all;

  .textarea-field__textarea:not(:placeholder-shown) + & {
    top: 0;
    color: var(--field-text);
    border-color: var(--field-border-hover);

    .textarea-field--secondary & {
      background: $input-field-secondary-label-bg;
    }
  }

  .textarea-field--error:not(:focus):not(:placeholder-shown) & {
    color: var(--field-error);

    .textarea-field--secondary & {
      background: $input-field-secondary-label-bg;
    }
  }
  /* stylelint-disable-next-line */
  .textarea-field__textarea:not(:focus):placeholder-shown + & {
    top: calc(
      var(--field-padding-top) + var(--field-text-font-size) - #{toRem(1)}
    );
    color: var(--field-label);
    font-size: toRem(16);
    font-weight: 400;
    line-height: 1.3;
  }

  /* stylelint-disable-next-line */
  .textarea-field__textarea:not([disabled]):focus ~ & {
    color: var(--field-label-focus);
    font-weight: 700;

    .textarea-field--secondary & {
      background: $input-field-secondary-label-bg;
    }
  }

  .textarea-field__textarea:not(:focus):placeholder-shown:-webkit-autofill + & {
    top: calc(
      var(--field-padding-top) + var(--field-text-font-size) - #{toRem(1)}
    );
    color: var(--field-label);
    font-size: toRem(16);
    font-weight: 400;
    line-height: 1.3;
  }

  /* stylelint-disable-next-line */
  .textarea-field--secondary & {
    background: var(--background-secondary-main);
  }
}

.textarea-field__textarea-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.textarea-field__textarea {
  padding: var(--field-padding);
  transition-property: box-shadow;
  resize: none;
  min-height: toRem(130);
  box-shadow: inset 0 0 0 toRem(500) var(--field-bg-primary);

  @include field-text;

  @include field-border;

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

  .textarea-field--error & {
    border-color: var(--field-error);
  }

  .textarea-field--secondary & {
    background: var(--background-secondary-main);
    box-shadow: inset 0 0 0 toRem(500) var(--background-secondary-main);
  }

  &:not([disabled]):focus {
    box-sizing: border-box;
    box-shadow: inset 0 0 0 toRem(50) var(--background-primary-main),
      0 0 0 toRem(1) var(--field-border-focus);
    border-color: var(--field-border-focus);

    .textarea-field--secondary & {
      box-shadow: inset 0 0 0 toRem(50) var(--background-secondary-main),
        0 0 0 toRem(1) var(--field-border-focus);
    }
  }

  &:not([disabled]):not(:focus):hover {
    border-color: var(--field-border-hover);
  }
}

.textarea-field__err-msg {
  @include field-error;
}

.textarea-field__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.textarea-field__err-msg-transition-leave-active {
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
