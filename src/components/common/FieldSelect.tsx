import { FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'

interface Props {
    isDisabled?: boolean;
    isRequired?: boolean;
    label: string;
    name: string;
    placeholder: string;
    children: React.ReactNode;
}

export default function FieldSelect( {isDisabled, isRequired, label, name, placeholder, children}:Props ) {
  return (
    <Field name={name}>
        {({ field, form }:any) => (
        <FormControl variant="floating" isRequired={isRequired} isInvalid={form.errors[name] && form.touched[name]}>
            <Select placeholder={placeholder} border="0" borderRadius="0" borderBottom="1px solid gray" {...field} disabled={isDisabled} autoComplete='off'>
                {children}
            </Select>
            <FormLabel>{label}</FormLabel> 
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
        )}
    </Field>
  )
}
