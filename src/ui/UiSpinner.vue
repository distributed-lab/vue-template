<template>
  <div class="ui-spinner" />
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.ui-spinner {
  display: inline-block;
  width: toRem(80);
  height: toRem(80);
}

.ui-spinner:after {
  content: ' ';
  display: block;
  width: toRem(64);
  height: toRem(64);
  margin: toRem(8);
  border-radius: 50%;
  border: toRem(6) solid var(--border-primary-main);
  border-color: var(--border-primary-main) transparent var(--border-primary-main) transparent;
  animation: rotate 1.2s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
