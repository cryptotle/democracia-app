"use client";

import FieldInput from "@/components/common/FieldInput";
import FieldsContainer from "@/components/common/FieldsContainer";
import FieldPassword from "@/components/common/FieldPassword";
import { Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { createRef, useState } from "react";
import { userRegisterFormValidation } from "@/validations";
import ReCAPTCHA from "react-google-recaptcha";
import { Button, Link, Stack, Text, useToast } from "@chakra-ui/react";
import PasswordStrength from "@/components/common/PasswordStrength";

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface Props {
  email?: string | null;
}

export const RegisterForm = ({email}:Props) => {
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>();
  const toast = useToast();
  const router = useRouter();
  const captchaRef = createRef<ReCAPTCHA>();
  const onChangeCaptcha = (value: any) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };
  const onSubmit = async (
    values: { email: string; password: string, confirm_password: string },
    actions: FormikHelpers<{ email: string; password: string, confirm_password: string }>
  ) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name: values.email,
          email: values.email,
          password: values.password,
          captcha: captchaValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = (await res.json()).message;
        throw Error(error);
      }
      toast({
        title: "Validación de cuenta pendiente.",
        description:
        "Por favor, revisa tu correo electrónico para confirmar tu cuenta.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.push("/");
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error en la solicitud:", error);
      captchaRef.current?.reset();
      onChangeCaptcha(null)
      setLoading(false);
      actions.resetForm();
      actions.setSubmitting(false);
    }
  };



  return (
    <>
      <Formik
        initialValues={{ email:  email ?? "", password: "", confirm_password:"" }}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
        }}
        validationSchema={userRegisterFormValidation}
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
            <FieldPassword
              isDisabled={loading}
              name="password"
              label="Password"
            />
            <FieldPassword
              isDisabled={loading}
              name="confirm_password"
              label="Confirmar password"
            />
            <PasswordStrength value={props.values.password} />
            <ReCAPTCHA  ref={captchaRef} sitekey={recaptchaSiteKey!} onChange={onChangeCaptcha} />
            ,
            <Button
              mt={4}
              isLoading={props.isSubmitting}
              type="submit"
              w="100%"
              isDisabled={loading || captchaValue == null}
            >
              Registrarse
            </Button>
          </FieldsContainer>
        )}
      </Formik>
      <Stack pt={6}>
        <Text align={"center"}>
          ¿Ya estás registrado?{" "}
          <Link color={"blue.400"} href="/login">
            Iniciar Sesión
          </Link>
        </Text>
      </Stack>
    </>
  );
};
