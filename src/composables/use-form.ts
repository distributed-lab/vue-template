import useVuelidate, { ChildStateLeafs, ValidationArgs } from '@vuelidate/core'
import get from 'lodash/get'
import { computed, ref, UnwrapNestedRefs } from 'vue'

export function useForm(state: UnwrapNestedRefs<ChildStateLeafs>, rules: ValidationArgs) {
  const isFormDisabled = ref(false)
  const isFormPending = ref(false)
  const isConfirmationShown = ref(false)

  const validationRules = computed(() => rules)

  const validationController = useVuelidate(validationRules, state)

  const isFieldsValid = computed(() => !validationController.value.$invalid)

  const isFormValid = (): boolean => {
    validationController.value.$touch()
    return !validationController.value.$invalid
  }

  const getFieldErrorMessage = (fieldPath: string): string => {
    let errorMessage = ''
    if (!validationController.value || !validationController.value.$invalid) {
      errorMessage = ''
    }

    const field = get(validationController.value, fieldPath)

    if (!field || !Object.keys(field).length) {
      throw new Error(`getFieldErrorMessage: Cannot find vuelidate field by '${fieldPath}'`)
    }

    if (!field.$dirty) errorMessage = ''

    errorMessage = field.$errors.length ? (field.$errors[0].$message as string) : ''

    return errorMessage
  }

  const touchField = (fieldPath: string): void => {
    const field = get(validationController.value, fieldPath)
    if (field) {
      field.$touch()
    }
  }

  const disableForm = () => {
    isFormDisabled.value = true
  }

  const enableForm = () => {
    isFormDisabled.value = false
  }

  const showConfirmation = () => {
    disableForm()
    isConfirmationShown.value = true
  }

  const hideConfirmation = () => {
    enableForm()
    isConfirmationShown.value = false
  }

  const hideConfirmationAfterSubmit = async (submitFn: () => Promise<void>) => {
    isFormPending.value = true
    await submitFn()
    hideConfirmation()
    isFormPending.value = false
  }

  return {
    isFormDisabled,
    isFormPending,
    isConfirmationShown,
    isFieldsValid,

    disableForm,
    enableForm,
    showConfirmation,
    hideConfirmation,
    hideConfirmationAfterSubmit,
    getFieldErrorMessage,
    touchField,
    isFormValid,
  }
}
