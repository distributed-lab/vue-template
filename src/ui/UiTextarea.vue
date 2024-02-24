<template>
  <div :class="textareaClasses">
    <div class="ui-textarea__textarea-wrp">
      <textarea
        class="ui-textarea__textarea"
        :id="`ui-textarea--${uid}`"
        v-bind="$attrs"
        v-on="listeners"
        :value="modelValue"
        :placeholder="!label ? placeholder : ' '"
        :tabindex="isDisabled || isReadonly ? -1 : ($attrs.tabindex as number)"
        :disabled="isDisabled || isReadonly"
      />
      <label v-if="label" :for="`ui-textarea--${uid}`" class="ui-textarea__label">
        {{ label }}
      </label>
    </div>
    <transition
      name="ui-textarea__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="ui-textarea__err-msg">
        {{ errorMessage }}
      </span>
      <span v-else-if="note" class="ui-textarea__note">
        {{ note }}
      </span>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { computed, useAttrs } from 'vue'

type SCHEMES = 'primary'

const model = defineModel<string>({
  default: '',
})

const props = withDefaults(
  defineProps<{
    scheme?: SCHEMES
    label?: string
    placeholder?: string
    errorMessage?: string
    note?: string
  }>(),
  {
    scheme: 'primary',
    label: '',
    placeholder: ' ',
    errorMessage: '',
    note: '',
  },
)

const attrs = useAttrs()

const uid = uuidv4()

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const listeners = computed(() => ({
  input: (event: Event) => {
    const eventTarget = event.target as HTMLTextAreaElement

    if (model.value === eventTarget.value) return

    model.value = eventTarget.value
  },
}))

const textareaClasses = computed(() =>
  [
    'ui-textarea',
    ...(isDisabled.value ? ['ui-textarea--disabled'] : []),
    ...(isReadonly.value ? ['ui-textarea--readonly'] : []),
    ...(props.errorMessage ? ['ui-textarea--error'] : []),
    `ui-textarea--${props.scheme}`,
  ].join(' '),
)

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}
</script>

<style lang="scss" scoped>
.ui-textarea {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &--readonly {
    pointer-events: none;
  }
}

.ui-textarea__label {
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

  .ui-textarea__textarea:not(:placeholder-shown) ~ & {
    top: 0;
    color: var(--field-text);
    border-color: var(--field-border-hover);
  }

  .ui-textarea--error:not(:focus):not(:placeholder-shown) & {
    color: var(--field-error);
  }
  /* stylelint-disable-next-line */
  .ui-textarea__textarea:not(:focus):placeholder-shown ~ & {
    top: calc(var(--field-padding-top) + var(--field-text-font-size) + #{toRem(8)});
    color: var(--field-label);
    font-size: toRem(16);
    font-weight: 400;
    line-height: 1.3;
  }

  /* stylelint-disable-next-line */
  .ui-textarea__textarea:not([disabled]):focus ~ & {
    color: var(--field-label-focus);
    font-weight: 700;
  }

  .ui-textarea__textarea:not(:focus):placeholder-shown:-webkit-autofill ~ & {
    top: calc(var(--field-padding-top) + var(--field-text-font-size) - #{toRem(1)});
    color: var(--field-label);
    font-size: toRem(16);
    font-weight: 400;
    line-height: 1.3;
  }
}

.ui-textarea__textarea-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.ui-textarea__textarea {
  padding: var(--field-padding);
  resize: none;
  min-height: toRem(130);
  box-shadow: inset 0 0 0 toRem(500) var(--field-bg-primary);
  border: none;

  @include field-text;

  & + .ui-textarea__focus-indicator {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:after {
      content: '';
      position: absolute;
      bottom: toRem(-2);
      left: 50%;
      transform: translateX(-50%);
      height: toRem(2);
      width: 0;
      background: var(--primary-main);
      transition: width calc(var(--field-transition-duration) + 0.3s);

      .ui-textarea--error & {
        background: var(--field-error);
      }
    }
  }

  .ui-textarea--primary & {
    @include field-border;
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

  .ui-textarea--error.ui-textarea--primary & {
    border-color: var(--field-error);
    box-shadow:
      inset 0 0 0 toRem(50) var(--field-bg-primary),
      0 0 0 toRem(1) var(--field-error);
  }

  &:not([disabled]):focus {
    .ui-textarea--primary & {
      box-sizing: border-box;
      box-shadow:
        inset 0 0 0 toRem(500) var(--field-bg-primary),
        0 0 0 toRem(1) var(--field-border-focus);
      border-color: var(--field-border-focus);
    }
  }

  &:not([disabled]):not(:focus):hover {
    .ui-textarea--primary & {
      border-color: var(--field-border-hover);
    }
  }
}

.ui-textarea__err-msg,
.ui-textarea__note {
  @include field-error;
}

.ui-textarea__note {
  color: var(--text-primary-light);
}

.ui-textarea__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.ui-textarea__err-msg-transition-leave-active {
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
