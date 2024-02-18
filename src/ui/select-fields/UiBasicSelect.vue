<template>
  <ui-select
    class="ui-basic-select"
    :model-value="localModelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :label="label"
    :placeholder="placeholder"
    :error-message="errorMessage"
    :note="note"
  >
    <template #head>
      <div class="ui-basic-select__head">
        {{ selectedOption?.title || '' }}
      </div>
    </template>
    <template v-if="valueOptions?.length" #default="{ selectField }">
      <button
        type="button"
        v-for="(item, idx) in valueOptions"
        :key="idx"
        :class="[
          'ui-basic-select__option',
          {
            'ui-basic-select__option--active': item?.value === localModelValue,
          },
        ]"
        @click="selectField?.select(item?.value)"
      >
        {{ item?.title ?? '' }}
      </button>
    </template>
  </ui-select>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import { UiSelect } from '@/ui'

type ValueOption = { title: string; value: string | number }

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    valueOptions?: ValueOption[]
    label?: string
    placeholder?: string
    errorMessage?: string
    note?: string
  }>(),
  {
    valueOptions: () => [],
    label: '',
    placeholder: ' ',
    errorMessage: '',
    note: '',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const localModelValue = ref(props.modelValue)

const selectedOption = computed(() => {
  return props.valueOptions?.find(el => el.value === localModelValue.value)
})

watch(
  () => props.modelValue,
  value => {
    localModelValue.value = value
  },
)
</script>

<style lang="scss" scoped>
.ui-basic-select__head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}

.ui-basic-select__option {
  text-align: left;
  padding: var(--field-padding);
  background: var(--background-primary-main);
  transition: background var(--field-transition-duration) ease-in-out;

  &:hover {
    background: var(--background-primary-dark);
  }

  &--active {
    background: var(--background-secondary-main);
  }
}
</style>
