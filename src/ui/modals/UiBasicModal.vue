<template>
  <ui-modal v-model:is-shown="isModalShown" :is-close-by-click-outside="isCloseByClickOutside">
    <template #default="{ close }">
      <div class="ui-basic-modal__pane">
        <div class="ui-basic-modal__header">
          <div class="ui-basic-modal__header-titles">
            <h5 v-if="title" class="ui-basic-modal__title">
              {{ title }}
            </h5>
            <span v-if="subtitle" class="ui-basic-modal__subtitle">
              {{ subtitle }}
            </span>
          </div>
          <ui-button
            class="ui-basic-modal__close-btn"
            scheme="none"
            :icon-right="$icons.AcademicCap"
            @click="close"
          />
        </div>
        <slot />
      </div>
    </template>
  </ui-modal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

import { UiButton, UiModal } from '@/ui'

const props = withDefaults(
  defineProps<{
    isShown: boolean
    isCloseByClickOutside?: boolean
    title?: string
    subtitle?: string
  }>(),
  {
    title: '',
    subtitle: '',
    isCloseByClickOutside: true,
  },
)

const emit = defineEmits<{
  (e: 'update:is-shown', v: boolean): void
}>()

const isModalShown = ref(false)

watch(
  () => props.isShown,
  value => {
    isModalShown.value = value
  },
)

watch(isModalShown, value => {
  emit('update:is-shown', value)
})
</script>

<style lang="scss">
.ui-basic-modal__pane {
  --ui-basic-modal-max-width: #{toRem(400)};

  background: var(--background-primary-main);
  padding: toRem(24);
  border-radius: toRem(28);
  max-width: var(--ui-basic-modal-max-width);
}

.ui-basic-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: toRem(32);
}

.ui-basic-modal__pane .ui-basic-modal__header .ui-basic-modal__close-btn {
  padding: 0;
}

.ui-basic-modal__header-titles {
  display: flex;
  flex-direction: column;
  gap: toRem(8);
}

.ui-basic-modal__title {
  font-size: toRem(28);
  line-height: 1.3;
  color: var(--text-primary-main);
}

.ui-basic-modal__subtitle {
  font-size: toRem(14);
  line-height: 1.45;
  color: var(--text-secondary-main);
}
</style>
