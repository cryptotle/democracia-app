"use client";

import { Alert, AlertIcon, Center, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ConfirmarProps {
  success: boolean;
}

export const ConfirmForm = ({ success }: ConfirmarProps) => {

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {

  }, [success, router]);

  return (
    <Center>
      {success ? (
        <Alert w={{md:'50vw', base: '100%'}} status='success'>
          <AlertIcon />
          <Text fontSize={{base: '0.8rem',}}> Tu correo electrónico ha sido confirmado correctamente. Ya puedes </Text>
          <Text fontWeight={600}><Link href="/login">Iniciar sesión.</Link></Text>
        </Alert>

      ) : (
        <Alert w={{md:'50vw', base: '100%'}} status='error'>
          <AlertIcon />
          <Stack w={'100%'} direction={{ md:'row', base:'column' }} justify={'space-between'}>
            <Text>El enlace de confirmación es inválido o ha caducado.</Text>
            <Text fontWeight={600}><Link href="/register">Registrarse nuevamente.</Link></Text>
          </Stack>

        </Alert>
      )}
    </Center>
  );
};


