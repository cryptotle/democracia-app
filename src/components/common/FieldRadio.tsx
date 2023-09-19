import { FormControl, FormErrorMessage, FormLabel, Input, RadioGroup, Select, Stack } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'

interface Props {
    isRequired?: boolean;
    label: string;
    name: string;
    children: React.ReactNode;
}

export default function FieldRadio( {isRequired, label, name, children}:Props ) {
  
  return (
    <Field name={name}>
        {({ field, form }:any) => (
        <FormControl isRequired={isRequired} isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel>{label}</FormLabel> 
          <RadioGroup>
            <Stack direction="column">
              {children}
            </Stack>
          </RadioGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
        )}
    </Field>
  )
}
