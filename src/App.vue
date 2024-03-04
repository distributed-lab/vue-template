<template>
  <div class="app__container">
    <template v-if="isAppInitialized">
      <router-view v-slot="{ Component, route }">
        <transition :name="(route.meta.transition as string) || 'fade'" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>

      <toasts-manager />
    </template>
    <template v-else>
      <ui-error-view />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { config } from '@config'
import { ref } from 'vue'

import { ToastsManager } from '@/common/ToastsManager'
import { ErrorHandler } from '@/helpers'
import { UiErrorView } from '@/ui'

const isAppInitialized = ref(false)

const init = async () => {
  try {
    document.title = config.APP_NAME
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error)
  }

  isAppInitialized.value = true
}

init()
</script>

<style lang="scss" scoped>
.app__container {
  flex: 1;
}
</style>
