<template>
  <div class="toast__body">
    <div class="toast__icon-wrp">
      <ui-icon class="toast__icon" :name="iconName" />
    </div>
    <div class="toast__details">
      <h4 class="toast__title">
        {{ title }}
      </h4>
      <p class="toast__message">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IconNames } from '@/enums'
import { UiIcon } from '@/ui'

withDefaults(
  defineProps<{
    title?: string
    message: string
    iconName?: IconNames
  }>(),
  {
    title: '',
    iconName: IconNames.CheckCircle,
  },
)
</script>

<style lang="scss">
.Vue-Toastification__toast.toast {
  background: var(--white);
  padding: toRem(12);
}

.toast__body {
  display: flex;
  gap: toRem(12);
}

.toast__icon-wrp {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: toRem(8);
  min-width: toRem(56);
  min-height: toRem(56);
  max-width: toRem(56);
  max-height: toRem(56);
  width: toRem(56);
  height: toRem(56);

  .Vue-Toastification__toast--success & {
    background: var(--success-light);
    color: var(--success-main);
  }

  .Vue-Toastification__toast--error & {
    background: var(--error-light);
    color: var(--error-main);
  }

  .Vue-Toastification__toast--warning & {
    background: var(--warning-light);
    color: var(--warning-main);
  }

  .Vue-Toastification__toast--info & {
    background: var(--primary-light);
    color: var(--primary-main);
  }
}

.toast .toast__icon {
  max-width: toRem(24);
  max-height: toRem(24);
}

.toast__details {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: toRem(8) 0;
}

.toast__title {
  font-size: toRem(14);
  line-height: 1.5;
  font-weight: 500;
  letter-spacing: toRem(0.1);
  color: var(--text-primary-main);
}

.toast__message {
  font-size: toRem(14);
  line-height: 1.5;
  letter-spacing: toRem(0.25);
  color: var(--text-secondary-main);
  width: toRem(230);

  @include respond-to(xsmall) {
    width: toRem(180);
  }
}

.Vue-Toastification__close-button {
  align-self: flex-start;
  color: var(--text-secondary-main);
  padding: 0;
  font-size: toRem(28);
  line-height: 1;
}

.Vue-Toastification__progress-bar {
  .Vue-Toastification__toast--success & {
    background: var(--success-main);
  }

  .Vue-Toastification__toast--error & {
    background: var(--error-main);
  }

  .Vue-Toastification__toast--warning & {
    background: var(--warning-main);
  }

  .Vue-Toastification__toast--info & {
    background: var(--primary-main);
  }
}
</style>
