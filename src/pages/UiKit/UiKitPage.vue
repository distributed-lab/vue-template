<template>
  <div class="ui-kit-page">
    <h2>{{ `Buttons` }}</h2>
    <ui-kit-buttons />

    <h2>{{ `Inputs` }}</h2>
    <ui-kit-text-inputs />

    <h2>{{ `Selects` }}</h2>
    <ui-kit-selects />

    <h2>{{ `Textareas` }}</h2>
    <ui-kit-textareas />

    <h2>{{ `Checks` }}</h2>
    <ui-kit-checks />

    <h2>{{ `Forms` }}</h2>
    <ui-kit-forms />

    <h2>{{ `Toasts` }}</h2>
    <ui-kit-toast />

    <h2>{{ `Tooltips` }}</h2>
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start">
      <ui-tooltip>
        <template #trigger>
          {{ `Lorem Ipsum` }}
        </template>
        <template #default>
          {{ `Dolor sit amet conccestetur` }}
        </template>
      </ui-tooltip>

      <ui-tooltip>
        <template #trigger>
          <ui-icon class="ui-kit-page__icons-item" :name="$icons.AcademicCap" />
        </template>
        <template #default>
          <ui-icon class="ui-kit-page__icons-item" :name="$icons.AcademicCap" />
        </template>
      </ui-tooltip>
    </div>

    <h2>{{ `Common` }}</h2>
    <section class="ui-kit-page__common">
      <ui-error-view />
      <ui-no-data-view :message="$t('ui-kit-page.no-data-msg')" />

      <ui-spinner />
      <ui-skeleton class="ui-kit-page__loader-skeleton" />

      <ui-accordion class="ui-kit-page__collapse">
        <template #head="{ toggle }">
          <ui-button
            class="ui-kit-page__accordion-btn"
            scheme="flat"
            :text="$t('ui-kit-page.accordion-btn')"
            @click="toggle"
          >
          </ui-button>
        </template>
        <div class="ui-kit-page__accordion-body">
          {{ $t('ui-kit-page.collapse-text') }}
        </div>
      </ui-accordion>
      <div class="ui-kit-page__collapse-wrp">
        <ui-button text="Toggle collapse" @click="() => (isCollapseShown = !isCollapseShown)" />
        <ui-collapse :is-shown="isCollapseShown">
          <div class="ui-kit-page__collapse-body">
            {{ $t('ui-kit-page.collapse-text') }}
          </div>
        </ui-collapse>
      </div>

      <ui-button :text="$t('ui-kit-page.modal-btn')" @click="isModalShown = true" />
      <ui-basic-modal
        class="ui-kit-page__basic-modal"
        v-model:is-shown="isModalShown"
        :title="`Modal Title`"
        :subtitle="`Lorem ipsum dolor sit amet, consectetur adipisicing elit.`"
        :width="500"
      >
        <div class="ui-kit-page__modal-body">
          {{ $t('ui-kit-page.collapse-text') }}
        </div>
      </ui-basic-modal>

      <div class="ui-kit-page__icons">
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.AcademicCap" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.Adjustments" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.Annotation" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.Archive" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.ArrowCircleDown" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.ArrowCircleLeft" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.ArrowCircleRight" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.arrowCircleUp" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.ArrowDown" />
        <ui-icon class="ui-kit-page__icons-item" :name="$icons.ArrowLeft" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { UiKitForms, UiKitSelects, UiKitTextareas, UiKitToast } from '@/pages/UiKit/components'
import {
  UiAccordion,
  UiBasicModal,
  UiButton,
  UiCollapse,
  UiErrorView,
  UiIcon,
  UiNoDataView,
  UiSkeleton,
  UiSpinner,
  UiTooltip,
} from '@/ui'

import { UiKitButtons, UiKitChecks, UiKitTextInputs } from './components'

const isModalShown = ref(false)
const isCollapseShown = ref(false)
</script>

<style lang="scss" scoped>
.ui-kit-page {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  padding: toRem(24) 0;
}

.ui-kit-page__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: toRem(12);
}

.ui-kit-page__inputs,
.ui-kit-page__select-fields {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fill, #{toRem(210)});
  grid-gap: toRem(36);
}

.input__icon {
  width: toRem(24);
  height: toRem(24);
}

.ui-kit-page__inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: toRem(32);
}

.ui-kit-page__common {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: toRem(56);
}

.ui-kit-page__collapse {
  width: 100%;
}

.ui-kit-page__accordion-btn {
  width: 100%;
}

.ui-kit-page__accordion-body {
  font-size: toRem(24);
}

.ui-kit-page__collapse-wrp {
  display: flex;
  flex-direction: column;
  gap: toRem(16);
  width: 100%;
}

.ui-kit-page__collapse-body {
  width: 100%;
  font-size: toRem(24);
}

.ui-kit-page__icons {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, toRem(24));
  grid-gap: toRem(24);
}

.ui-kit-page__icons-item {
  width: toRem(24);
  height: toRem(24);
}

.ui-kit-page__input-icon {
  max-width: toRem(24);
  max-height: toRem(24);
}

.ui-kit-page__loader-skeleton {
  width: toRem(200);
  height: toRem(24);
  margin-bottom: toRem(16);
}

.ui-kit-page__basic-modal {
  &::v-global(.ui-basic-modal__pane) {
    --ui-basic-modal-max-width: #{toRem(700)};
  }
}
</style>
