import type { IconNames } from '@/enums'

export type CommonNotificationTypes = 'success' | 'error' | 'warning' | 'info' | 'default'

export type NotificationObjectPayload = {
  title?: string
  message: string
  iconName?: IconNames // FIXME
}

export type NotificationPayload = string | NotificationObjectPayload
