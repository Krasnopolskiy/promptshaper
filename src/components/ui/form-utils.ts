import * as React from 'react';
import {FieldPath, FieldValues} from 'react-hook-form';

/**
 * Form field context value type
 */
export interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

/**
 * Form field context
 */
export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

/**
 * Form item context value type
 */
export interface FormItemContextValue {
  id: string;
}

/**
 * Form item context
 */
export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);
