"use client";

import { Button, HStack, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { Fiscales, Partido } from "@/types/database.types";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { PutBlobResult } from "@vercel/blob";
import FieldInput from "../common/FieldInput";
import FieldSelect from "../common/FieldSelect";
import FieldImage from "../common/FieldImage";
import FieldsContainer from "../common/FieldsContainer";
import { fiscalRegisterFormValidation } from "@/validations";
import Link from "next/link";

type Props = {
  partidos: Partido[];
  fiscal: Fiscales;
};

export const FiscalRegisterForm = ({ partidos, fiscal }: Props) => {
  const [isDisabled, setIsDisabled] = useState(
    Boolean(fiscal?.dni) && Boolean(fiscal?.idPartido)
  );
  const [fiscalId, setFiscalId] = useState(fiscal?.id);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const onSubmit = async (
    values: Fiscales,
    actions: FormikHelpers<Fiscales>
  ) => {
    if (isDisabled) {
      setIsDisabled(false);
      actions.setSubmitting(false);
      return;
    }
    if (!fiscal.foto_dni && !file) {
      actions.setSubmitting(false);
      return;
    }
    try {
      let imageUrl;

      if (file) {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "content-type": file?.type || "application/octet-stream" },
          body: file,
        });

        if (res.status !== 200) {
          const error = await res.text();
          throw Error("La foto del DNI no se pudo cargar");
        }

        const { url } = (await res.json()) as PutBlobResult;
        imageUrl = url;
      }
      const response = fiscalId
        ? await axios.put("/api/fiscal", {
            payload: {
              dni: parseInt(values.dni.toString()),
              idPartido: values.idPartido,
              id: fiscalId,
              foto_dni: imageUrl,
            },
          })
        : await axios.post("/api/fiscal", {
            payload: {
              dni: parseInt(values.dni.toString()),
              idPartido: values.idPartido,
              foto_dni: imageUrl,
            },
          });
      toast({
        title: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFiscalId(response.data.id);
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

  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(first);
    console.log(file);
    setTimeout(() => {
      if (first.current && file) {
        first.current.focus();
      }
    }, 1000);
  }, [file?.name]);

  return (
    <Formik
      initialValues={fiscal}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
      }}
      validationSchema={fiscalRegisterFormValidation}
    >
      {(props) => (
        <FieldsContainer>
          <FieldInput
            name="dni"
            isDisabled={isDisabled}
            isRequired
            type="number"
            label="Numero de DNI"
          />
          <FieldSelect
            name="idPartido"
            isDisabled={isDisabled}
            isRequired
            label="Partido político"
            placeholder="Selecciona un partido"
          >
            {partidos.map((partido) => (
              <option key={partido.id} value={partido.id}>
                {partido.desc}
              </option>
            ))}
          </FieldSelect>
          <FieldImage
            label="Foto del DNI"
            name="foto_dni"
            isRequired
            isInvalid={file === null && !fiscal.foto_dni}
            errorMsg="Este campo es obligatorio"
            setFile={setFile}
            isDisabled={isDisabled}
          />
          <VStack   w="100%">
            <Button
              isLoading={props.isSubmitting}
              type="submit"
              w="100%"
              rightIcon={isDisabled ? <EditIcon /> : undefined}
              ref={first}
            >
              {isDisabled ? "Editar" : "Guardar"}
            </Button>
            <Button w="100%" variant={"outline"} as={Link} href={"/"}>
              {isDisabled ? "Cerrar" : "Cancelar"}
            </Button>
          </VStack>
        </FieldsContainer>
      )}
    </Formik>
  );
};
