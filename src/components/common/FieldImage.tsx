import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Field } from 'formik';
import React, { Dispatch, SetStateAction } from 'react'
import ImageInput from './UploadImage/ImageInput';

interface Props {
    isDisabled?: boolean;
    isRequired?: boolean;
    label: string;
    name: string;
    isInvalid: boolean;
    errorMsg: string;
    setFile: Dispatch<SetStateAction<File | null>>
}

export default function FieldImage( {isDisabled, isRequired, label, name, isInvalid, errorMsg, setFile}:Props ) {
  return (
    <Field name={name}>
        {({ field, form }:any) => (
        <FormControl isRequired={isRequired} isInvalid={isInvalid && form.touched.foto_dni}>
            <FormLabel fontSize="0.85em" px="6px" mt="-12px">{label}</FormLabel>                 
            <ImageInput field={field} setFile={setFile} isDisabled={isDisabled}/>
            <FormErrorMessage>{isInvalid && form.touched.foto_dni && errorMsg}</FormErrorMessage>
        </FormControl>
        )}
    </Field>
  )
}