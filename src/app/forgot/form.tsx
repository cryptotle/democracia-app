"use client";

import FieldInput from "@/components/common/FieldInput";
import FieldsContainer from "@/components/common/FieldsContainer";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { RECAPTCHA_SITE_KEY } from "@/lib/captcha";
import { emailValidation } from "@/validations";
import { Button, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>();

  const onChangeCaptcha = (value: any) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  const onSubmit = async (
    values: { email: string },
    actions: FormikHelpers<{ email: string }>
  ) => {
    try {
      setLoading(true);

      await axios.post("/api/forgotPwd", {
        payload: {
          email: values.email,
          captcha: captchaValue
        },
      });

      actions.resetForm();
      setLoading(false);

      toast({
        title: "Reset de password pendiente.",
        description:
          "Por favor, revisa tu correo electrónico para resetear tu password.",
        status: "success",
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => router.push("/login"),
      });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <PageContainer>
      <PageTitle title="¿Ha olvidado su password?"></PageTitle>
      <Text
        fontSize={{ base: "sm", sm: "md" }}
        color={useColorModeValue("gray.800", "gray.400")}
      >
        Recibirá un email con un link de reset
      </Text>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
        }}
        validationSchema={emailValidation}
      >
        {(props) => (
          <FieldsContainer>
            <FieldInput
              name="email"
              isDisabled={loading}
              isRequired
              label="Email"
              type="email"
            />
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={onChangeCaptcha}
            />
            <Button
              mt={4}
              isLoading={props.isSubmitting}
              type="submit"
              w="100%"
              isDisabled={captchaValue == null}
            >
              Enviar
            </Button>
          </FieldsContainer>
        )}
      </Formik>
    </PageContainer>
  );
}
