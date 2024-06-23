/// <reference types="vite/client" />
import { config } from '@config'
import { WritableComputedRef } from 'vue'

import { IconNames, RouteNames } from '@/enums'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $routes: typeof RouteNames
    $icons: typeof IconNames
    $config: typeof config
    $locale: WritableComputedRef
  }
}

interface ImportMetaEnv {
  VITE_APP_NAME: string
  VITE_BUILD_VERSION: string
}

declare global {
  interface Document {
    ENV: ImportMetaEnv
  }
}
