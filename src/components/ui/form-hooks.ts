import * as React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormFieldContext, FormItemContext} from './form-utils';

/**
 * Hook to access form field state
 *
 * @returns {Object} Form field state and related IDs
 */
export const useFormField = (): {
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
  error?: {
    message?: string;
    type?: string;
  };
  invalid?: boolean;
  isDirty?: boolean;
  isTouched?: boolean;
} => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const {getFieldState, formState} = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const {id} = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
