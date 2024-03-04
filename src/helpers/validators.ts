import { ValidationRule } from '@vuelidate/core'
import {
  email as _email,
  maxLength as _maxLength,
  minLength as _minLength,
  required as _required,
  sameAs as _sameAs,
} from '@vuelidate/validators'
import { createI18nMessage, MessageProps } from '@vuelidate/validators'
import get from 'lodash/get'
import { Ref } from 'vue'

import { i18n } from '@/localization'

const { t } = i18n.global || i18n

const messagePath = ({ $validator }: MessageProps) => `validations.field-error_${$validator}`

const withI18nMessage = createI18nMessage({ t, messagePath })

export const required = <ValidationRule>withI18nMessage(_required)

export const email = <ValidationRule>withI18nMessage(_email)

export const minLength = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_minLength(length))

export const maxLength = (length: number): ValidationRule =>
  <ValidationRule>withI18nMessage(_maxLength(length))

export const sameAs = (field: Ref): ValidationRule => {
  return <ValidationRule>withI18nMessage(_sameAs(field, get(field, '_key')))
}
