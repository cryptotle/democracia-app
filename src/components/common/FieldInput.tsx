import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'

interface Props {
  name: string;
  label: string;
  type?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}

export default function FieldInput( {name, label, type="text", isDisabled, isRequired, }:Props ) {
  return (
    <Field name={name} >
        {({ field, form }:any) => (
        <FormControl variant="floating" isRequired={isRequired} isInvalid={form.errors[name] && form.touched[name]}>
            <Input {...field} disabled={isDisabled} placeholder=' ' border="0" borderRadius="0" borderBottom="1px solid gray" autoComplete='off' type={type}/>
            <FormLabel>{label}</FormLabel> 
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
        )}
    </Field>
  )
}
