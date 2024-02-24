<template>
  <div class="ui-kit-page">
    <h2>{{ `Buttons` }}</h2>
    <ui-kit-buttons />

    <h2>{{ `Inputs` }}</h2>
    <ui-kit-fields />

    <h2>{{ `Selects` }}</h2>
    <ui-kit-selects />

    <div class="ui-kit-page__buttons">
      <ui-button
        size="small"
        :text="'bus.success'"
        color="success"
        @click="
          () =>
            bus.emit(BUS_EVENTS.success, {
              message: 'Some success message',
            })
        "
      />
      <ui-button
        size="small"
        :text="'bus.error'"
        color="error"
        @click="
          () =>
            bus.emit(BUS_EVENTS.error, {
              message: 'Some error message',
            })
        "
      />
      <ui-button
        size="small"
        :text="'bus.warning'"
        color="warning"
        @click="
          () =>
            bus.emit(BUS_EVENTS.warning, {
              message: 'Some warning message',
            })
        "
      />
      <ui-button
        size="small"
        :text="'bus.info'"
        color="info"
        @click="
          () =>
            bus.emit(BUS_EVENTS.info, {
              message: 'Some info message',
            })
        "
      />
      <ui-button
        size="small"
        :text="'bus.info'"
        color="info"
        @click="
          () =>
            bus.emit(BUS_EVENTS.success, {
              message: 'Some success message',
            })
        "
      />
      <ui-button
        size="small"
        :text="'custom'"
        color="info"
        @click="
          () =>
            bus.emit(BUS_EVENTS.success, {
              component: UiErrorView,
              props: {
                message: 'Some custom message',
              },
            })
        "
      />

      <ui-button
        size="small"
        :text="'ErrorHandler.process'"
        color="error"
        @click="handleProcessError"
      />
    </div>

    <div class="ui-kit-page__select-fields">
      <ui-textarea v-model="form.textarea" />
      <ui-textarea v-model="form.textarea" :label="`Label`" />
      <ui-textarea v-model="form.textarea" :label="`Label`" error-message="Error message" />

      <ui-checkbox v-model="form.checkbox" />
      <ui-checkbox v-model="form.checkbox" :label="`Label`" />
      <ui-checkbox v-model="form.checkbox" :label="`Label`" disabled />

      <ui-switch v-model="form.switch" :value="String(form.switch)" />
      <ui-switch v-model="form.switch" :value="String(form.switch)" :label="`Label`" />
      <ui-switch v-model="form.switch" :value="String(form.switch)" disabled />
    </div>

    <section class="ui-kit-page__form">
      <login-form />
    </section>

    <section class="ui-kit-page__form">
      <complex-form />
    </section>

    <section class="ui-kit-page__common">
      <ui-error-view :message="$t('ui-kit-page.loading-error-msg')" />
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
      >
        <div class="ui-kit-page__modal-body">
          {{ $t('ui-kit-page.collapse-text') }}
        </div>
      </ui-basic-modal>
      <div class="ui-kit-page__icons">
        <ui-tooltip>
          <template #trigger>
            <ui-icon class="ui-kit-page__icons-item" :name="$icons.AcademicCap" />
          </template>
          <template #default>
            <ui-icon class="ui-kit-page__icons-item" :name="$icons.AcademicCap" />
          </template>
        </ui-tooltip>
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
import { reactive, ref } from 'vue'

import { bus, BUS_EVENTS, ErrorHandler } from '@/helpers'
import { UiKitSelects } from '@/pages/UiKit/components'
import {
  UiAccordion,
  UiBasicModal,
  UiButton,
  UiCheckbox,
  UiCollapse,
  UiErrorView,
  UiIcon,
  UiNoDataView,
  UiSkeleton,
  UiSpinner,
  UiSwitch,
  UiTextarea,
  UiTooltip,
} from '@/ui'

import { ComplexForm, LoginForm, UiKitButtons, UiKitFields } from './components'

const isModalShown = ref(false)
const isCollapseShown = ref(false)

const form = reactive({
  input: '',
  select: '',
  textarea: '',
  checkbox: false,
  switch: false,
})

const handleProcessError = () => {
  ErrorHandler.process(new Error('some error message'))
}
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
  &::v-global(.basic-modal__pane) {
    --basic-modal-max-width: #{toRem(452)};
  }
}
</style>
