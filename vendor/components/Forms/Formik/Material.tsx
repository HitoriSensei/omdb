import { FieldConfig, FieldProps } from 'formik/dist/Field'
import * as React from 'react'
import { ChangeEventHandler, FocusEventHandler } from 'react'
import { Field } from 'formik'
import { StandardTextFieldProps } from '@material-ui/core'

export const FormikFieldMaterial = ({
  children,
  baseInput = false,
  ...props
}: StandardTextFieldProps &
  FieldConfig & {
    baseInput?: boolean
    children: React.ReactElement<{
      error: boolean
      helperText?: string
      name: string
      value: any
      onChange: ChangeEventHandler
      onBlur: FocusEventHandler
    }>
  }) => {
  return (
    <Field {...props}>
      {({ field, meta, form }: FieldProps) => {
        const fieldProps: StandardTextFieldProps = {
          name: field.name,
          value: field.value,
          onChange: field.onChange,
          onBlur: (e) => {
            if (e) {
              field.onBlur(e)
            }
            props.onBlur && props.onBlur(e)
          },
        }
        if (!baseInput) {
          fieldProps.helperText = (!form.isValid || meta.touched) && meta.error
          fieldProps.error = Boolean((!form.isValid || meta.touched) && meta.error)
        }
        return React.cloneElement(children, fieldProps)
      }}
    </Field>
  )
}
