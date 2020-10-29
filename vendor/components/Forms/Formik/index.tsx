import { FieldProps } from 'formik/dist/Field'
import * as React from 'react'
import { FastField, FormikErrors, FormikHelpers } from 'formik'

export const onFormikSubmit = <Model extends any>(
  submitToAPI: (values: Model) => Promise<unknown>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readErrorsFromAPI = (e: any) =>
    ({
      // _error: String(e),
      // Generic user friendly message
      _error: 'Wystąpił błąd podczas wysyłania formularza. Wyślij ponownie.',
    } as FormikErrors<any>),
) => async (
  values: Model,
  { setSubmitting, setErrors, resetForm, setStatus }: FormikHelpers<Model>,
) => {
  try {
    setErrors({})
    await submitToAPI(values)
    resetForm()
    setStatus(true)
  } catch (e) {
    console.error(e)
    setErrors(readErrorsFromAPI(e))
    setSubmitting(false)
  }
}

export const FormikGlobalSubmissionError = (props: {
  children: (props: { error?: string }) => React.ReactNode
}) => {
  return (
    <FastField name='_error'>
      {({ meta }: FieldProps) => (meta.error ? props.children(meta) : null)}
    </FastField>
  )
}
