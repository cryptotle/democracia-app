"use client";

import FieldInput from "@/components/common/FieldInput";
import FieldPassword from "@/components/common/FieldPassword";
import FieldsContainer from "@/components/common/FieldsContainer";
import { emailValidation } from "@/validations";
import { Button, Link, Stack, Text, useToast } from "@chakra-ui/react";
import { Formik, FormikHelpers } from "formik";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
 
  const toast = useToast();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const onSubmit = async (values:{email: string, password: string},actions:FormikHelpers<{email: string, password: string}>) => {
    try {
      setLoading(true);
      
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });
      
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        throw Error("email o password inválido");
      }
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
    <>
      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={(values, actions) => { onSubmit(values,actions)}}
        validationSchema={emailValidation}
      >
        {(props) => (
          <FieldsContainer>
            <FieldInput name="email" isDisabled={loading} isRequired label="Email" type="email"/>
            <FieldPassword isDisabled={loading} name="password" label="Password" />
            <Stack
                  w='100%'
                  direction={{ base: "column", sm: "row" }}
                  align={"flex-start"}
                  justify={"flex-start"}
                >
                  
              <Link color={"blue.400"} href={"/forgot"}>¿Olvidó el password?</Link>
            </Stack>
            <Button
              mt={4}
              isLoading={props.isSubmitting}
              type='submit'
              w="100%"
            >
              Iniciar Sesión 
            </Button>    

            <Stack pt={6}>
              <Text align={"center"}>
                ¿No tienes usuario?{" "}
                <Link color={"blue.400"} href={"/register" + (props.values.email ? `?email=${props.values.email}` : '') }>
                  Registrate
                </Link>
              </Text>
            </Stack>
          </FieldsContainer>
          
        )}
      </Formik>
      {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">Or</p>
      </div>

      <a
        className="px-7 py-1 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        style={{ backgroundColor: "white", color: "black" }}
        onClick={() => signIn("google", { callbackUrl })}
        role="button"
      >
        <img
          className="pr-2"
          src="/images/google.svg"
          alt=""
          style={{ height: "2rem" }}
        />
        Google
      </a>
      <a
        className="px-7 py-1 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
        style={{ backgroundColor: "black" }}
        onClick={() => signIn("github", { callbackUrl })}
        role="button"
      >
        <img
          className="pr-2"
          src="/images/github.svg"
          alt=""
          style={{ height: "2.2rem" }}
        />
        GitHub
      </a>*/}
    </> 
  );
};
