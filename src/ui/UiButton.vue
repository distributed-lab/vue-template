<template>
  <template v-if="route">
    <router-link class="ui-button" :class="buttonClasses" v-bind="$attrs" :to="route">
      <ui-icon v-if="iconLeft" class="ui-button__icon-left" :name="iconLeft" />

      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else-if="text">
        <span class="ui-button__text">
          {{ text }}
        </span>
      </template>

      <ui-icon v-if="iconRight" class="ui-button__icon-right" :name="iconRight" />
    </router-link>
  </template>
  <template v-else-if="href">
    <a class="ui-button" :class="buttonClasses" v-bind="$attrs" :href="href">
      <ui-icon v-if="iconLeft" class="ui-button__icon-left" :name="iconLeft" />

      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else-if="text">
        <span class="ui-button__text">
          {{ text }}
        </span>
      </template>

      <ui-icon v-if="iconRight" class="ui-button__icon-right" :name="iconRight" />
    </a>
  </template>
  <template v-else>
    <button
      class="ui-button"
      :class="buttonClasses"
      v-bind="$attrs"
      :disabled="isDisabled"
      :type="buttonType"
    >
      <ui-icon v-if="iconLeft" class="ui-button__icon-left" :name="iconLeft" />

      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else-if="text">
        <span class="ui-button__text">
          {{ text }}
        </span>
      </template>

      <ui-icon v-if="iconRight" class="ui-button__icon-right" :name="iconRight" />
    </button>
  </template>
</template>

<script lang="ts" setup>
import { computed, useAttrs, useSlots } from 'vue'
import type { LocationAsRelativeRaw } from 'vue-router'

import type { IconNames } from '@/enums'

import { UiIcon } from './index'

type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(
  defineProps<{
    text?: string
    scheme?: 'filled' | 'flat' | 'none'
    modification?: 'border-circle' | 'border-rounded' | 'none'
    color?: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'none'
    size?: 'large' | 'medium' | 'small' | 'x-small' | 'none'
    route?: LocationAsRelativeRaw
    href?: string
    iconLeft?: IconNames
    iconRight?: IconNames
  }>(),
  {
    text: '',
    scheme: 'filled',
    modification: 'border-rounded',
    color: 'primary',
    size: 'medium',
    route: undefined,
    href: '',
    iconLeft: undefined,
    iconRight: undefined,
  },
)

const attrs = useAttrs()
const slots = useSlots()

const isDisabled = computed((): boolean =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const buttonClasses = computed(() =>
  [
    'ui-button',
    `ui-button--scheme-${props.scheme}`,
    `ui-button--${props.modification}`,
    `ui-button--${props.color}`,
    `ui-button--${props.size}`,
    ...(isDisabled.value ? ['ui-button--disabled'] : []),
    ...((props.iconLeft || props.iconRight) && !props.text && !slots.default
      ? ['ui-button--icon-only']
      : []),
  ].join(' '),
)

const buttonType = computed<ButtonType>(() => (attrs.type as ButtonType) || 'button')
</script>

<style lang="scss" scoped>
.ui-button {
  --button-transition-duration: 0.2s;
  --button-icon-size: 1.2em;

  outline: 0;
  font-family: var(--app-font-family);
  margin: 0;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: min-content;
  justify-content: center;
  transition: var(--button-transition-duration) ease-in;
  transition-property: background-color, color;
  text-decoration: none;
  border: var(--ui-button-border);
  background-color: var(--ui-button-bg);
  color: var(--ui-button-text);

  &:disabled,
  &--disabled {
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(0.75);
    opacity: 0.5;
  }

  &:not([disabled]):hover {
    text-decoration: none;
    transition-timing-function: ease-out;
    color: var(--ui-button-text-hover);
    background-color: var(--ui-button-bg-hover);
    border: var(--ui-button-border-hover);
  }

  &:not([disabled]):focus {
    text-decoration: none;
    transition-timing-function: ease-out;
    color: var(--ui-button-text-focused);
    background-color: var(--ui-button-bg-focused);
    border: var(--ui-button-border-focused);
  }

  &:not([disabled]):active {
    text-decoration: none;
    transition-timing-function: ease-out;
    color: var(--ui-button-text-active);
    background-color: var(--ui-button-bg-active);
    border: var(--ui-button-border-active);
  }

  &--scheme-filled {
    --ui-button-filled-bg: var(--primary-main);
    --ui-button-filled-bg-hover: var(--primary-main);
    --ui-button-filled-bg-focused: var(--primary-main);
    --ui-button-filled-bg-active: var(--primary-dark);

    --ui-button-filled-text: var(--text-primary-invert-main);
    --ui-button-filled-text-hover: var(--text-primary-invert-main);
    --ui-button-filled-text-focused: var(--text-primary-invert-main);
    --ui-button-filled-text-active: var(--text-primary-invert-main);

    --ui-button-filled-border: 0;
    --ui-button-filled-border-hover: 0;
    --ui-button-filled-border-active: 0;
    --ui-button-filled-border-focused: 0;

    --ui-button-bg: var(--ui-button-filled-bg);
    --ui-button-bg-hover: var(--ui-button-filled-bg-hover);
    --ui-button-bg-focused: var(--ui-button-filled-bg-focused);
    --ui-button-bg-active: var(--ui-button-filled-bg-active);

    --ui-button-text: var(--ui-button-filled-text);
    --ui-button-text-hover: var(--ui-button-filled-text-hover);
    --ui-button-text-focused: var(--ui-button-filled-text-focused);
    --ui-button-text-active: var(--ui-button-filled-text-active);

    --ui-button-border: var(--ui-button-filled-border);
    --ui-button-border-hover: var(--ui-button-filled-border-hover);
    --ui-button-border-active: var(--ui-button-filled-border-active);
    --ui-button-border-focused: var(--ui-button-filled-border-focused);
  }

  &--scheme-flat {
    --ui-button-flat-bg: none;
    --ui-button-flat-bg-hover: none;
    --ui-button-flat-bg-focused: none;
    --ui-button-flat-bg-active: var(--background-secondary-main);

    --ui-button-flat-text: var(--primary-main);
    --ui-button-flat-text-hover: var(--primary-main);
    --ui-button-flat-text-focused: var(--primary-main);
    --ui-button-flat-text-active: var(--primary-main);

    --ui-button-flat-border: #{toRem(1)} solid var(--secondary-light);
    --ui-button-flat-border-hover: var(--ui-button-flat-border);
    --ui-button-flat-border-focused: var(--ui-button-flat-border);
    --ui-button-flat-border-active: var(--ui-button-flat-border);

    --ui-button-bg: var(--ui-button-flat-bg);
    --ui-button-bg-hover: var(--ui-button-flat-bg-hover);
    --ui-button-bg-focused: var(--ui-button-flat-bg-focused);
    --ui-button-bg-active: var(--ui-button-flat-bg-active);

    --ui-button-text: var(--ui-button-flat-text);
    --ui-button-text-hover: var(--ui-button-flat-text-hover);
    --ui-button-text-focused: var(--ui-button-flat-text-focused);
    --ui-button-text-active: var(--ui-button-flat-text-active);

    --ui-button-border: var(--ui-button-flat-border);
    --ui-button-border-hover: var(--ui-button-flat-border-hover);
    --ui-button-border-focused: var(--ui-button-flat-border-focused);
    --ui-button-border-active: var(--ui-button-flat-border-active);
  }

  &--scheme-none {
    --ui-button-none-bg: transparent;
    --ui-button-none-bg-hover: transparent;
    --ui-button-none-bg-focused: transparent;
    --ui-button-none-bg-active: transparent;

    --ui-button-none-text: var(--text-primary-main);
    --ui-button-none-text-hover: var(--text-primary-main);
    --ui-button-none-text-focused: var(--text-primary-main);
    --ui-button-none-text-active: var(--text-primary-main);

    --ui-button-bg: var(--ui-button-none-bg);
    --ui-button-bg-hover: var(--ui-button-none-bg-hover);
    --ui-button-bg-focused: var(--ui-button-none-bg-focused);
    --ui-button-bg-active: var(--ui-button-none-bg-active);

    --ui-button-text: var(--ui-button-none-text);
    --ui-button-text-hover: var(--ui-button-none-text-hover);
    --ui-button-text-focused: var(--ui-button-none-text-focused);
    --ui-button-text-active: var(--ui-button-none-text-active);
  }

  &--secondary {
    --ui-button-filled-bg: var(--background-tertiary-main);
    --ui-button-filled-bg-hover: var(--background-tertiary-main);
    --ui-button-filled-bg-focused: var(--background-tertiary-main);
    --ui-button-filled-bg-active: var(--background-tertiary-main);

    --ui-button-filled-text: var(--text-primary-invert-main);
    --ui-button-filled-text-hover: var(--text-primary-invert-main);
    --ui-button-filled-text-focused: var(--text-primary-invert-main);
    --ui-button-filled-text-active: var(--text-primary-invert-main);

    --ui-button-flat-text: var(--background-tertiary-main);
    --ui-button-flat-text-hover: var(--background-tertiary-main);
    --ui-button-flat-text-focused: var(--background-tertiary-main);
    --ui-button-flat-text-active: var(--background-tertiary-main);

    --ui-button-flat-border: #{toRem(1)} solid var(--background-tertiary-main);
    --ui-button-flat-border-hover: var(--ui-button-flat-border);
    --ui-button-flat-border-focused: var(--ui-button-flat-border);
    --ui-button-flat-border-active: #{toRem(1)} solid var(--background-tertiary-main);

    --ui-button-none-text: var(--background-tertiary-main);
    --ui-button-none-text-hover: var(--background-tertiary-main);
    --ui-button-none-text-focused: var(--background-tertiary-main);
    --ui-button-none-text-active: var(--background-tertiary-main);
  }

  &--success {
    --ui-button-filled-bg: var(--success-main);
    --ui-button-filled-bg-hover: var(--success-main);
    --ui-button-filled-bg-focused: var(--success-main);
    --ui-button-filled-bg-active: var(--success-dark);

    --ui-button-filled-text: var(--text-primary-invert-main);
    --ui-button-filled-text-hover: var(--text-primary-invert-main);
    --ui-button-filled-text-focused: var(--text-primary-invert-main);
    --ui-button-filled-text-active: var(--text-primary-invert-main);

    --ui-button-flat-text: var(--success-main);
    --ui-button-flat-text-hover: var(--success-main);
    --ui-button-flat-text-focused: var(--success-main);
    --ui-button-flat-text-active: var(--success-dark);

    --ui-button-flat-border: #{toRem(1)} solid var(--success-main);
    --ui-button-flat-border-hover: var(--ui-button-flat-border);
    --ui-button-flat-border-focused: var(--ui-button-flat-border);
    --ui-button-flat-border-active: #{toRem(1)} solid var(--success-dark);

    --ui-button-none-text: var(--success-main);
    --ui-button-none-text-hover: var(--success-main);
    --ui-button-none-text-focused: var(--success-main);
    --ui-button-none-text-active: var(--success-dark);
  }

  &--error {
    --ui-button-filled-bg: var(--error-main);
    --ui-button-filled-bg-hover: var(--error-main);
    --ui-button-filled-bg-focused: var(--error-main);
    --ui-button-filled-bg-active: var(--error-dark);

    --ui-button-filled-text: var(--text-primary-invert-main);
    --ui-button-filled-text-hover: var(--text-primary-invert-main);
    --ui-button-filled-text-focused: var(--text-primary-invert-main);
    --ui-button-filled-text-active: var(--text-primary-invert-main);

    --ui-button-flat-text: var(--error-main);
    --ui-button-flat-text-hover: var(--error-main);
    --ui-button-flat-text-focused: var(--error-main);
    --ui-button-flat-text-active: var(--error-dark);

    --ui-button-flat-border: #{toRem(1)} solid var(--error-main);
    --ui-button-flat-border-hover: var(--ui-button-flat-border);
    --ui-button-flat-border-focused: var(--ui-button-flat-border);
    --ui-button-flat-border-active: #{toRem(1)} solid var(--error-dark);

    --ui-button-none-text: var(--error-main);
    --ui-button-none-text-hover: var(--error-main);
    --ui-button-none-text-focused: var(--error-main);
    --ui-button-none-text-active: var(--error-dark);
  }

  &--warning {
    --ui-button-filled-bg: var(--warning-main);
    --ui-button-filled-bg-hover: var(--warning-main);
    --ui-button-filled-bg-focused: var(--warning-main);
    --ui-button-filled-bg-active: var(--warning-dark);

    --ui-button-filled-text: var(--text-primary-invert-main);
    --ui-button-filled-text-hover: var(--text-primary-invert-main);
    --ui-button-filled-text-focused: var(--text-primary-invert-main);
    --ui-button-filled-text-active: var(--text-primary-invert-main);

    --ui-button-flat-text: var(--warning-main);
    --ui-button-flat-text-hover: var(--warning-main);
    --ui-button-flat-text-focused: var(--warning-main);
    --ui-button-flat-text-active: var(--warning-dark);

    --ui-button-flat-border: #{toRem(1)} solid var(--warning-main);
    --ui-button-flat-border-hover: var(--ui-button-flat-border);
    --ui-button-flat-border-focused: var(--ui-button-flat-border);
    --ui-button-flat-border-active: #{toRem(1)} solid var(--warning-dark);

    --ui-button-none-text: var(--warning-main);
    --ui-button-none-text-hover: var(--warning-main);
    --ui-button-none-text-focused: var(--warning-main);
    --ui-button-none-text-active: var(--warning-dark);
  }

  &--info {
    --ui-button-filled-bg: var(--info-main);
    --ui-button-filled-bg-hover: var(--info-main);
    --ui-button-filled-bg-focused: var(--info-main);
    --ui-button-filled-bg-active: var(--info-dark);

    --ui-button-filled-text: var(--text-primary-invert-main);
    --ui-button-filled-text-hover: var(--text-primary-invert-main);
    --ui-button-filled-text-focused: var(--text-primary-invert-main);
    --ui-button-filled-text-active: var(--text-primary-invert-main);

    --ui-button-flat-text: var(--info-main);
    --ui-button-flat-text-hover: var(--info-main);
    --ui-button-flat-text-focused: var(--info-main);
    --ui-button-flat-text-active: var(--info-dark);

    --ui-button-flat-border: #{toRem(1)} solid var(--info-main);
    --ui-button-flat-border-hover: var(--ui-button-flat-border);
    --ui-button-flat-border-focused: var(--ui-button-flat-border);
    --ui-button-flat-border-active: #{toRem(1)} solid var(--info-dark);

    --ui-button-none-text: var(--info-main);
    --ui-button-none-text-hover: var(--info-main);
    --ui-button-none-text-focused: var(--info-main);
    --ui-button-none-text-active: var(--info-dark);
  }

  &--border-circle {
    border-radius: toRem(100);
  }

  &--border-rounded {
    border-radius: toRem(14);
  }

  &--large {
    --button-icon-size: #{toRem(18)};

    padding: toRem(18) toRem(36);
    gap: toRem(8);
    font-size: toRem(20);
    line-height: 1.45;
    font-weight: 600;

    &.ui-button--icon-only {
      --button-icon-size: #{toRem(20)};

      padding: toRem(18);
      width: calc(var(--button-icon-size) + #{toRem(18)});
      height: calc(var(--button-icon-size) + #{toRem(18)});
    }
  }

  &--medium {
    --button-icon-size: #{toRem(16)};

    padding: toRem(16) toRem(32);
    font-size: toRem(16);
    line-height: 1.25;
    font-weight: 600;
    gap: toRem(8);

    &.ui-button--icon-only {
      --button-icon-size: #{toRem(20)};

      padding: toRem(24);
      width: calc(var(--button-icon-size) + #{toRem(12)});
      height: calc(var(--button-icon-size) + #{toRem(12)});
    }
  }

  &--small {
    --button-icon-size: #{toRem(14)};

    padding: toRem(8) toRem(16);
    font-size: toRem(12);
    line-height: 1.45;
    font-weight: 600;
    gap: toRem(8);

    &.ui-button--icon-only {
      --button-icon-size: #{toRem(20)};

      padding: toRem(8);
      width: calc(var(--button-icon-size) + #{toRem(8)});
      height: calc(var(--button-icon-size) + #{toRem(8)});
    }
  }
}

.ui-button .ui-button__icon-left,
.ui-button .ui-button__icon-right {
  height: var(--button-icon-size);
  width: var(--button-icon-size);
}

.ui-button__text {
  color: inherit;
  font: inherit;
  pointer-events: none;
  word-break: break-all;
  min-width: 0;

  @include text-ellipsis;
}
</style>
