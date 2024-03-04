<template>
  <div class="ui-kit-forms">
    <div class="ui-kit-forms__content">
      <login-form />
    </div>
    <div class="ui-kit-forms__settings">
      <complex-form />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComplexForm, LoginForm } from '@/pages/UiKit/components'
</script>

<style scoped lang="scss">
.ui-kit-forms {
  flex: 1;
  width: 100%;
  display: flex;
  gap: toRem(24);
}

.ui-kit-forms__content {
  display: flex;
  flex-direction: column;
  gap: toRem(36);
  width: 50%;
}

.ui-kit-forms__settings {
  display: flex;
  flex-direction: column;
  gap: toRem(24);
  width: 50%;
}
</style>
