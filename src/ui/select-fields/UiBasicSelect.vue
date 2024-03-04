<template>
  <ui-select
    class="ui-basic-select"
    :model-value="model"
    @update:model-value="updateModelValue"
    v-bind="$attrs"
  >
    <template #head>
      <div class="ui-basic-select__head">
        {{ selectedOption?.title || '' }}
      </div>
    </template>
    <template v-if="valueOptions?.length" #default="{ select }">
      <button
        type="button"
        v-for="(item, idx) in valueOptions"
        :key="idx"
        :class="[
          'ui-basic-select__option',
          {
            'ui-basic-select__option--active': item?.value === model,
          },
        ]"
        @click="select(item?.value)"
      >
        {{ item?.title ?? '' }}
      </button>
    </template>
  </ui-select>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { default as UiSelect, type Props as UiSelectProps } from '@/ui/UiSelect.vue'

type ValueOption = { title: string; value: string }

export type Props = Partial<Omit<UiSelectProps, 'valueOptions'>> & {
  valueOptions?: ValueOption[]
}

const model = defineModel<string>({
  default: '',
})

const props = withDefaults(defineProps<Props>(), {
  valueOptions: () => [],
})

const selectedOption = computed(() => {
  return props.valueOptions?.find(el => el.value === model.value)
})

const updateModelValue = (value: string) => {
  model.value = value
}
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
