"use client";

import { EditIcon } from "@chakra-ui/icons";
import { Button, HStack, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { User } from "@/types/database.types";
import Link from "next/link";
import FieldInput from "../common/FieldInput";
import FieldsContainer from "../common/FieldsContainer";
import { userDataFormValidation } from "@/validations";

type Props = {
  user: User;
};

export const UserDataForm = ({ user }: Props) => {
  const [isDisabled, setIsDisabled] = useState(Boolean(user.wallet));
  const toast = useToast();

  const onSubmit = async (
    values: typeof user,
    actions: FormikHelpers<typeof user>
  ) => {
    try {
      if (isDisabled) {
        setIsDisabled(false);
        actions.setSubmitting(false);
        return;
      }
      const response = await axios.put("/api/user", {
        payload: { wallet: values.wallet },
      });
      toast({
        title: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsDisabled(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error en la solicitud:", error);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={user}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
      validationSchema={userDataFormValidation}
    >
      {(props) => (
        <FieldsContainer>
          {/* <FieldInput name="name" isDisabled={true} isRequired label="Nombre"/> */}
          <FieldInput name="email" isDisabled={true} isRequired label="Email" />
          <FieldInput
            name="wallet"
            isDisabled={isDisabled}
            isRequired
            label="Wallet de Ethereum"
          />
          <VStack
            mt="50px"
            alignItems="center"
            justifyContent="center"
            w="100%"
          >
            {/* <Button variant="outline" as={Link} href="/fiscal" w="100%" >Registrar fiscal</Button> */}
            <Button
              isLoading={props.isSubmitting}
              type="submit"
              w="100%"
              rightIcon={isDisabled ? <EditIcon /> : undefined}
            >
              {isDisabled ? "Editar" : "Guardar"}
            </Button>
            <Button
              variant={"outline"}
              bgColor={"color.400"}
              as={Link}
              w="100%"
              href={"/"}
            >
              Cancelar
            </Button>
          </VStack>
        </FieldsContainer>
      )}
    </Formik>
  );
};
