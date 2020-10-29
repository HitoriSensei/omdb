import { FieldConfig, FieldProps } from 'formik/dist/Field'
import * as React from 'react'
import { ChangeEventHandler, FocusEventHandler } from 'react'
import { FastField } from 'formik'

export const FormikFieldMaterial = ({
  children,
  ...props
}: FieldConfig & {
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
    <FastField {...props}>
      {({ field, meta, form }: FieldProps) =>
        React.cloneElement(children, {
          name: field.name,
          error: Boolean((!form.isValid || meta.touched) && meta.error),
          helperText: (!form.isValid || meta.touched) && meta.error,
          value: field.value,
          onChange: field.onChange,
          onBlur: field.onBlur,
        })
      }
    </FastField>
  )
}
