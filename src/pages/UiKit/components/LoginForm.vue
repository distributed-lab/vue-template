<template>
  <form class="login-form" @submit.prevent="submit">
    <ui-input-field
      v-model="form.login"
      :label="$t('login-form.login-lbl')"
      :error-message="getFieldErrorMessage('login')"
      @blur="touchField('login')"
      :disabled="isFormDisabled"
    />
    <ui-input-field
      type="password"
      v-model="form.password"
      :label="$t('login-form.password-lbl')"
      :error-message="getFieldErrorMessage('password')"
      @blur="touchField('password')"
      :disabled="isFormDisabled"
    />
    <div class="login-form__actions">
      <ui-button
        class="login-form__submit-btn"
        type="submit"
        :text="$t('login-form.submit-btn')"
        :disabled="isFormDisabled"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { useForm } from '@/composables'
import { bus, BUS_EVENTS, email, ErrorHandler, required } from '@/helpers'
import { UiButton, UiInputField } from '@/ui'

const { t } = useI18n({ useScope: 'global' })
const form = reactive({
  login: '',
  password: '',
})

const { isFormDisabled, disableForm, enableForm, isFormValid, getFieldErrorMessage, touchField } =
  useForm(form, {
    login: { email, required },
    password: { required },
  })

const submit = async () => {
  if (!isFormValid()) return

  disableForm()
  try {
    bus.emit(BUS_EVENTS.success, t('login-form.login-success-msg'))
  } catch (error) {
    ErrorHandler.process(error)
  }
  enableForm()
}
</script>

<style lang="scss" scoped>
.login-form {
  display: grid;
  grid-gap: toRem(24);
}
</style>
