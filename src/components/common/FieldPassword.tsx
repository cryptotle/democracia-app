import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field } from "formik";

interface Props {
  isDisabled:  boolean,
  name: string,
  label: string,
}

const FieldPassword = ( {isDisabled, name, label}:Props ) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field name={name} >
      {({ field, form }:any) => (
        <FormControl isRequired variant="floating" isInvalid={form.errors[name] && form.touched[name]}>    
          <InputGroup>
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              disabled={isDisabled}
              required
              placeholder=' ' border="0" borderRadius="0" borderBottom="1px solid gray"
            />
            <FormLabel>{label}</FormLabel>
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                h="34px"
                mr="5px"
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field >
  );
};

export default FieldPassword;
