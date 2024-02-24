<template>
  <div class="app-navbar">
    <app-logo class="app-navbar__logo" />

    <ui-button
      class="app-navbar__link"
      :scheme="'flat'"
      :text="$routes.UiKit"
      :route="{ name: $routes.UiKit }"
    />

    <ui-button
      class="app-navbar__link"
      :scheme="'flat'"
      :text="$routes.ComplexForm"
      :route="{ name: $routes.ComplexForm }"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppLogo, UiButton } from '@/ui'
</script>

<style lang="scss" scoped>
.app-navbar {
  display: flex;
  align-items: center;
  gap: toRem(24);
  padding: toRem(24) 0;
  background: var(--background-primary-main);
  border-bottom: var(--border-primary-main);

  @include respond-to(tablet) {
    flex-wrap: wrap;
  }
}

.app-navbar__logo {
  margin-right: auto;

  @include respond-to(xsmall) {
    width: 100%;
    margin-bottom: toRem(24);
  }
}

.app-navbar__link {
  opacity: 0.25;

  &:first-child {
    margin-left: auto;
  }

  &.router-link-active {
    opacity: 1;
  }
}
</style>
