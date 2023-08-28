/// <reference types="vite/client" />
import { config } from '@config'
import { IconNames, RouteNames } from '@/enums'
import { WritableComputedRef } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $routes: typeof RouteNames
    $icons: typeof IconNames
    $config: typeof config
    $locale: WritableComputedRef
  }
}

interface ImportMetaEnv {
  VITE_ENVIRONMENT: string
  VITE_PORT: string
  VITE_API_URL: string
  VITE_APP_NAME: string
}

declare global {
  interface Document {
    ENV: ImportMetaEnv
  }
}
