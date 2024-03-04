import { EventEmitter } from '@distributedlab/tools'

import { ToastPayload } from '@/common/ToastsManager'

export enum BUS_EVENTS {
  error = 'error',
  warning = 'warning',
  success = 'success',
  info = 'info',
}

export type DefaultBusEventMap = {
  [BUS_EVENTS.success]: ToastPayload
  [BUS_EVENTS.error]: ToastPayload
  [BUS_EVENTS.warning]: ToastPayload
  [BUS_EVENTS.info]: ToastPayload
}

export const bus = new EventEmitter<DefaultBusEventMap>()
