<template>
  <div :class="selectFieldClasses">
    <div ref="selectElement" class="ui-select__select-wrp">
      <div class="ui-select__select-head-wrp">
        <button type="button" class="ui-select__select-head" @click="toggleDropdown">
          <template v-if="$slots.head && !!modelValue">
            <slot
              name="head"
              :select="select"
              :is-open="isDropdownOpen"
              :close="closeDropdown"
              :open="openDropdown"
              :toggle="toggleDropdown"
            />
          </template>
          <template v-else>
            <template v-if="modelValue">
              {{ modelValue }}
            </template>
            <template v-else-if="!label && placeholder">
              <span class="ui-select__placeholder">
                {{ props.placeholder }}
              </span>
            </template>
          </template>
          <ui-icon
            :class="[
              'ui-select__select-head-indicator',
              {
                'ui-select__select-head-indicator--open': isDropdownOpen,
              },
            ]"
            :name="$icons.ArrowDown"
          />
        </button>
        <label v-if="label" class="ui-select__label" :for="`ui-select--${uid}`">
          {{ label }}
        </label>
      </div>
      <transition name="ui-select__select-dropdown">
        <div v-if="isDropdownOpen" class="ui-select__select-dropdown">
          <template v-if="$slots.default">
            <slot
              :select="select"
              :is-open="isDropdownOpen"
              :close="closeDropdown"
              :open="openDropdown"
              :toggle="toggleDropdown"
            />
          </template>
          <template v-else-if="valueOptions?.length">
            <button
              :class="[
                'ui-select__select-dropdown-item',
                {
                  'ui-select__select-dropdown-item--active': modelValue === option,
                },
              ]"
              type="button"
              v-for="(option, idx) in valueOptions"
              :key="`[${idx}] ${option}`"
              @click="select(option)"
            >
              {{ option }}
            </button>
          </template>
        </div>
      </transition>
    </div>
    <transition
      name="ui-select__err-msg-transition"
      @enter="setHeightCSSVar"
      @before-leave="setHeightCSSVar"
    >
      <span v-if="errorMessage" class="ui-select__err-msg">
        {{ errorMessage }}
      </span>
      <span v-else-if="note" class="ui-select__note">
        {{ note }}
      </span>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import { computed, onMounted, ref, useAttrs, watch } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

import { UiIcon } from '@/ui'

const model = defineModel<string>({
  default: '',
})

export type Props = {
  scheme?: 'primary'
  valueOptions?: string[]
  label?: string
  placeholder?: string
  errorMessage?: string
  note?: string
}

const props = withDefaults(defineProps<Props>(), {
  scheme: 'primary',
  valueOptions: () => [],
  type: 'text',
  label: '',
  placeholder: ' ',
  errorMessage: '',
  note: '',
})

const attrs = useAttrs()

const selectElement = ref<HTMLDivElement>()

const isDropdownOpen = ref(false)
const uid = uuidv4()

onBeforeRouteUpdate(() => {
  closeDropdown()
})

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled as string | boolean),
)

const isReadonly = computed(() =>
  ['', 'readonly', true].includes(attrs.readonly as string | boolean),
)

const isLabelActive = computed(() => isDropdownOpen.value || !!model.value)

const selectFieldClasses = computed(() => ({
  'ui-select': true,
  'ui-select--error': props.errorMessage,
  'ui-select--open': isDropdownOpen.value,
  'ui-select--disabled': isDisabled.value,
  'ui-select--readonly': isReadonly.value,
  'ui-select--label-active': isLabelActive.value,
  [`ui-select--${props.scheme}`]: true,
}))

const setHeightCSSVar = (element: Element) => {
  ;(element as HTMLElement).style.setProperty(
    '--field-error-msg-height',
    `${element.scrollHeight}px`,
  )
}

const toggleDropdown = () => {
  isDropdownOpen.value ? closeDropdown() : openDropdown()
}

const openDropdown = () => {
  if (isDisabled.value || isReadonly.value) return

  isDropdownOpen.value = true
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const select = (value: string) => {
  if (isDisabled.value || isReadonly.value) return

  model.value = value

  closeDropdown()
}

onMounted(() => {
  if (selectElement.value) {
    onClickOutside(selectElement, () => {
      closeDropdown()
    })
  }
})

watch(
  () => model,
  () => {
    closeDropdown()
  },
)
</script>

<style lang="scss" scoped>
$z-local-index: 2;

.ui-select {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex: 1;

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--readonly {
    pointer-events: none;
  }
}

.ui-select__label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  position: absolute;
  padding: toRem(4);
  top: 50%;
  left: var(--field-padding-left);
  transform: translateY(-50%);
  color: var(--field-label);
  font-size: toRem(16);
  font-weight: 400;
  line-height: 1.3;
  background: var(--field-bg-primary);

  @include field-label;

  transition-property: all;

  .ui-select--error & {
    color: var(--field-error);
  }

  .ui-select--label-active & {
    top: 0;
    font-size: toRem(12);
    line-height: 1.3;
    font-weight: 700;
  }

  .ui-select--open & {
    color: var(--primary-main);
  }
}

.ui-select__select-wrp {
  display: flex;
  flex-direction: column;
  position: relative;
}

.ui-select__select-head-wrp {
  position: relative;
  width: 100%;
  height: 100%;
}

.ui-select__select-head {
  background: var(--field-bg-primary);
  padding: var(--field-padding);
  padding-right: calc(var(--field-padding-right) + #{toRem(24)});
  text-align: left;
  width: 100%;
  height: 100%;

  $field-text-height: calc(var(--field-text-font-size) * var(--field-text-line-height));

  min-height: calc($field-text-height + var(--field-padding-top) + var(--field-padding-bottom));

  @include field-text;

  transition-property: all;

  & + .ui-select__focus-indicator {
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

      .ui-select--error & {
        background: var(--field-error);
      }
    }
  }

  .ui-select--primary & {
    @include field-border;
  }

  .ui-select--error.ui-select--primary & {
    box-shadow:
      inset 0 0 0 toRem(50) var(--field-bg-primary),
      0 0 0 toRem(1) var(--field-error);
    border-color: var(--field-error);
  }

  .ui-select--open.ui-select--primary & {
    box-shadow:
      inset 0 0 0 toRem(50) var(--field-bg-primary),
      0 0 0 toRem(2) var(--primary-main);
    border-color: var(--primary-main);
  }
}

.ui-select__placeholder {
  font: inherit;
  opacity: 0.25;

  @include field-placeholder;
}

.ui-select__select-head-indicator {
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: var(--field-padding-right);
  transform: translateY(-50%);
  width: toRem(18);
  height: toRem(18);
  color: var(--field-text);
  transition: var(--field-transition-duration) ease-in-out;

  &--open {
    transform: translateY(-50%) rotate(180deg);
  }
}

.ui-select__select-dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  overflow: hidden auto;
  top: 110%;
  right: 0;
  width: 100%;
  max-height: 500%;
  z-index: $z-local-index;
  background: var(--white);
  box-shadow:
    0 toRem(1) toRem(2) rgba(var(--black-rgb), 0.3),
    0 toRem(2) toRem(6) toRem(2) rgba(var(--black-rgb), 0.15);
  border-radius: toRem(14);
}

.ui-select__select-dropdown-enter-active {
  animation: dropdown var(--field-transition-duration);
}

.ui-select__select-dropdown-leave-active {
  animation: dropdown var(--field-transition-duration) 0.1s reverse;
}

@keyframes dropdown {
  from {
    opacity: 0;
    transform: translateY(20%);
    max-height: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 500%;
  }
}

.ui-select__select-dropdown-item {
  text-align: left;
  width: 100%;
  padding: toRem(16);

  &:hover {
    background: var(--background-secondary-main);
  }

  &--active {
    background: var(--background-primary-main);
  }
}

.ui-select__err-msg,
.ui-select__note {
  @include field-error;
}

.ui-select__note {
  color: var(--text-primary-light);
}

.ui-select__err-msg-transition-enter-active {
  animation: fade-down var(--field-transition-duration);
}

.ui-select__err-msg-transition-leave-active {
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
