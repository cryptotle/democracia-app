"use client";

import FieldInput from "@/components/common/FieldInput";
import FieldPassword from "@/components/common/FieldPassword";
import FieldsContainer from "@/components/common/FieldsContainer";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import PasswordStrength from "@/components/common/PasswordStrength";
import { passwordValidation } from "@/validations";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  user: {
    id: string;
    name: string;
    email: string | null;
    wallet: string | null;
    password: string | null;
    emailVerified: Date | null;
    emailConfirmed: boolean;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}
export default function ResetPasswordForm({ user, token }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const callbackUrl = "/login";

  const onSubmit = async (values:{email: string, password:string, confirm_password: string},actions:FormikHelpers<{email: string, password:string, confirm_password: string}>) => {
    try {
      setLoading(true);
      await axios.post("/api/resetPwd", {
          payload: {
            password: values.password,
            token,
          },
      })

      router.push(callbackUrl);
      
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false);
      actions.resetForm()
      actions.setSubmitting(false)
    }
  };

  return (
    <PageContainer>
      <PageTitle title="Reset password"></PageTitle>
      <Formik
        initialValues={{email: user.email!, password: "", confirm_password: ""}}
        onSubmit={(values, actions) => { onSubmit(values,actions)}}
        validationSchema={passwordValidation}
      >
        {(props) => (
          <FieldsContainer>
            <FieldInput name="email" isDisabled isRequired label="Email" type="email"/>
            <FieldPassword isDisabled={loading} name="password" label="Password" />
            <FieldPassword isDisabled={loading} name="confirm_password" label="Confirmar Password" />
            <PasswordStrength value={props.values.password} />
            <Button
              mt={4}
              isLoading={props.isSubmitting}
              type='submit'
              w="100%"
            >
              Registrarse
            </Button>    
          </FieldsContainer>
        )}
      </Formik>
    </PageContainer>
  );
}
