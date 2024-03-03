<template>
  <div ref="rootEl" class="ui-input-field" :class="inputClasses">
    <div class="ui-input-field__input-wrp">
      <div v-if="$slots.nodeLeft" ref="nodeLeftWrp" class="ui-input-field__node-left-wrp">
        <slot name="nodeLeft" />
      </div>
      <input
        ref="inputEl"
        class="ui-input-field__input"
        :id="`ui-input-field--${uid}`"
        v-bind="$attrs"
        v-on="listeners"
        :value="model"
        :placeholder="!label ? placeholder : ' '"
        :tabindex="isDisabled || isReadonly ? -1 : ($attrs.tabindex as number)"
        :type="inputType"
        :min="min"
        :max="max"
        :disabled="isDisabled || isReadonly"
      />
      <label v-if="label" :for="`ui-input-field--${uid}`" class="ui-input-field__label">
        {{ label }}
      </label>
      <div
        v-if="$slots.nodeRight || isPasswordType || props.errorMessage"
        ref="nodeRightWrp"
        class="ui-input-field__node-right-wrp"
      >
        <slot v-if="$slots.nodeRight" name="nodeRight" />
        <button
          v-else-if="isPasswordType"
          type="button"
          @click="isPasswordShown = !isPasswordShown"
        >
          <ui-icon
            class="ui-input-field__password-icon"
            :name="isPasswordShown ? $icons.Eye : $icons.EyeOff"
          />
        </button>
        <ui-icon
          v-else-if="props.errorMessage"
          class="ui-input-field__error-icon"
          :name="$icons.ExclamationCircle"
        />
      </div>
    </div>
    <ui-collapse :is-shown="Boolean(note)">
      <span class="ui-input-field__note-msg">
        {{ note }}
      </span>
    </ui-collapse>

    <!-- TODO: animation is not smooth because of errorMessage binding -->
    <!--    if errorMessage === '', component will collapse to 0 x 0-->
    <ui-collapse :is-shown="Boolean(errorMessage)">
      <span class="ui-input-field__err-msg">
        {{ errorMessage }}
      </span>
    </ui-collapse>
  </div>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { computed, onMounted, ref, useAttrs, useSlots } from 'vue'

import { UiIcon } from '@/ui'
import UiCollapse from '@/ui/UiCollapse.vue'

const model = defineModel<string>({
  default: '',
})

const props = withDefaults(
  defineProps<{
    scheme?: 'primary'
    label?: string
    placeholder?: string
    type?: 'text' | 'number' | 'password'
    errorMessage?: string
    note?: string
  }>(),
  {
    scheme: 'primary',
    type: 'text',
    label: '',
    placeholder: ' ',
    errorMessage: '',
    note: '',
  },
)

const attrs = useAttrs()

const slots = useSlots()

const uid = uuidv4()

const rootEl = ref<HTMLDivElement>()
const inputEl = ref<HTMLInputElement>()
const nodeLeftWrp = ref<HTMLDivElement>()
const nodeRightWrp = ref<HTMLDivElement>()

const isPasswordShown = ref(false)

const isNumberType = computed(() => props.type === 'number')
const isPasswordType = computed(() => props.type === 'password')

const min = computed((): string =>
  !isNaN(Number(attrs?.min)) && attrs?.min !== '' ? (attrs.min as string) : '',
)
const max = computed((): string =>
  !isNaN(Number(attrs?.max)) && attrs?.max !== '' ? (attrs.max as string) : '',
)

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

    if (model.value === eventTarget.value) return

    model.value = eventTarget.value
  },
}))

const inputClasses = computed(() =>
  [
    ...(slots.nodeLeft ? ['ui-input-field--node-left'] : []),
    ...(slots.nodeRight || isPasswordType.value || props.errorMessage
      ? ['ui-input-field--node-right']
      : []),
    ...(isDisabled.value ? ['ui-input-field--disabled'] : []),
    ...(isReadonly.value ? ['ui-input-field--readonly'] : []),
    ...(props.errorMessage ? ['ui-input-field--error'] : []),
    `ui-input-field--${props.scheme}`,
  ].join(' '),
)

const inputType = computed(() => {
  if (isPasswordType.value) {
    return isPasswordShown.value ? 'text' : 'password'
  }

  return 'text'
})

onMounted(() => {
  if (!inputEl.value) return

  if (slots?.nodeLeft && nodeLeftWrp.value) {
    const offsetLeft = `calc(${nodeLeftWrp.value?.offsetWidth || 0}px + var(--field-padding-left) * 2)`

    inputEl.value?.style.setProperty('padding-left', offsetLeft)
    rootEl.value?.style.setProperty('--input-field-label-left', offsetLeft)
  }

  if (slots?.nodeRight && nodeRightWrp.value) {
    const offsetRight = `calc(${nodeRightWrp.value?.offsetWidth || 0}px + var(--field-padding-right) * 2)`

    inputEl.value?.style.setProperty('padding-right', offsetRight)
  }
})

const normalizeNumber = (value: string) => {
  return isNaN(Number(value)) ? model.value : value
}

const normalizeRange = (value: string): string => {
  if (Number(value) && Number(value) < Number(min.value)) return min.value

  if (Number(max.value) && Number(value) > Number(max.value)) return max.value

  return value
}
</script>

<style lang="scss" scoped>
$z-index-side-nodes: 1;

.ui-input-field {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;

  &--disabled {
    opacity: 0.5;
  }
}

.ui-input-field__label {
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

  .ui-input-field__input:not(:placeholder-shown) ~ & {
    top: 0;
    color: var(--field-text);
    border-color: var(--field-border-hover);
  }

  .ui-input-field__input:not(:focus):placeholder-shown ~ & {
    top: 50%;

    @include field-label;

    .ui-input-field--node-left & {
      left: var(--input-field-label-left);
    }
  }

  .ui-input-field--error .ui-input-field__input:not(:focus):placeholder-shown ~ & {
    color: var(--field-error);
  }

  /* stylelint-disable-next-line */
  .ui-input-field__input:not([disabled]):focus ~ & {
    color: var(--field-label-focus);
    font-weight: 700;
  }

  .ui-input-field__input:not(:focus):placeholder-shown:-webkit-autofill ~ & {
    top: 50%;
    color: var(--field-label);
    font-size: toRem(16);
    font-weight: 400;
    line-height: 1.3;

    .ui-input-field--node-left & {
      left: var(--input-field-label-left);
    }
  }
}

.ui-input-field__input-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.ui-input-field__input {
  padding: var(--field-padding);
  background: var(--field-bg-primary);
  box-shadow: inset 0 0 0 toRem(50) var(--field-bg-primary);
  border: none;

  @include field-text;

  .ui-input-field--primary & {
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

  .ui-input-field--node-left & {
    padding-left: calc(var(--field-padding-left) * 3);
  }

  .ui-input-field--node-right & {
    padding-right: calc(var(--field-padding-right) * 3);
  }

  .ui-input-field--error.ui-input-field--primary & {
    border-color: var(--field-error);
    box-shadow:
      inset 0 0 0 toRem(50) var(--field-bg-primary),
      0 0 0 toRem(1) var(--field-error);
  }

  &:not([disabled]):focus {
    .ui-input-field--primary & {
      box-sizing: border-box;
      box-shadow:
        inset 0 0 0 toRem(50) var(--field-bg-primary),
        0 0 0 toRem(1) var(--field-border-focus);
      border-color: var(--field-border-focus);
    }
  }

  &:not([disabled]):not(:focus):hover {
    .ui-input-field--primary & {
      border-color: var(--field-border-hover);
    }
  }
}

.ui-input-field__node-left-wrp {
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: var(--field-padding-left);
  transform: translateY(-50%);
  color: inherit;
  max-height: 100%;
  z-index: $z-index-side-nodes;
}

.ui-input-field__node-right-wrp {
  position: absolute;
  top: 50%;
  right: var(--field-padding-right);
  transform: translateY(-50%);
  color: inherit;
  z-index: $z-index-side-nodes;
}

.ui-input-field__password-icon {
  max-width: toRem(24);
  max-height: toRem(24);
}

.ui-input-field__error-icon {
  max-width: toRem(24);
  max-height: toRem(24);
  color: var(--field-error);
}

.ui-input-field__icon {
  width: toRem(18);
  height: toRem(18);
}

.ui-input-field__err-msg,
.ui-input-field__note-msg {
  @include field-error;
}

.ui-input-field__note-msg {
  color: var(--text-primary-light);
}

.ui-input-field__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.ui-input-field__err-msg-transition-leave-active {
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
