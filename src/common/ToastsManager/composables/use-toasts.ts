import type { Component } from 'vue'
import { useI18n } from 'vue-i18n'
import { TYPE, useToast } from 'vue-toastification'

import { DefaultToast } from '@/common/ToastsManager/components'
import { IconNames } from '@/enums'

export type ToastPayload =
  | {
      title?: string
      message: string
      iconName?: IconNames // FIXME
    }
  | { component: Component; props: unknown }

const AUTO_HIDE_DURATION = 330 * 1000

export const useToasts = () => {
  const toast = useToast()

  const { t } = useI18n({ useScope: 'global' })

  const defaults: Record<
    TYPE,
    {
      title: string
      message: string
      iconName: IconNames
    }
  > = {
    [TYPE.SUCCESS]: {
      title: t('notification.default-title-success'),
      message: t('notification.default-message-success'),
      iconName: IconNames.CheckCircle,
    },
    [TYPE.ERROR]: {
      title: t('notification.default-title-error'),
      message: t('notification.default-message-error'),
      iconName: IconNames.ExclamationCircle,
    },
    [TYPE.WARNING]: {
      title: t('notification.default-title-warning'),
      message: t('notification.default-message-warning'),
      iconName: IconNames.ShieldExclamation,
    },
    [TYPE.INFO]: {
      title: t('notification.default-title-info'),
      message: t('notification.default-message-info'),
      iconName: IconNames.ExclamationCircle,
    },
    [TYPE.DEFAULT]: {
      title: t('notification.default-title-default'),
      message: t('notification.default-message-default'),
      iconName: IconNames.ExclamationCircle,
    },
  }

  const showToast = (messageType: keyof typeof TYPE = 'DEFAULT', payload: ToastPayload) => {
    const type = TYPE[messageType]

    const options = {
      icon: false,
      type,
      toastClassName: 'toast',
      timeout: AUTO_HIDE_DURATION,
      closeOnClick: false,
    }

    if ('component' in payload) {
      return toast(payload, options)
    }

    const title = payload?.title || defaults[type].title
    const message = payload?.message || defaults[type].message
    const iconName = payload?.iconName || defaults[type].iconName

    const props = {
      title,
      message,
      iconName,
    }

    return toast(
      {
        component: DefaultToast,
        props,
      },
      options,
    )
  }

  const removeToast = (id: string | number) => toast.dismiss(id)

  return { showToast, removeToast }
}

export * from 'vue-toastification'
