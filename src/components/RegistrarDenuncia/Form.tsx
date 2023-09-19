"use client";

import React from "react";
import { Formik, FormikHelpers } from "formik";
import { Button, Radio, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Partido } from "@/types/database.types";
import FieldsContainer from "../common/FieldsContainer";
import FieldInput from "../common/FieldInput";
import FieldSelect from "../common/FieldSelect";
import FieldRadio from "../common/FieldRadio";
import { registrarDenunciaValidation } from "@/validations";

interface Props {
  partidos: Partido[];
}

const initialValues = {
  dni: "",
  distrito: "",
  seccion: "",
  circ: "",
  nroMesa: "",
  pregunta1: "",
  pregunta2: "",
  pregunta3: "",
};

const Form = ({ partidos }: Props) => {

  const partidosOptions = partidos && partidos.map((partido) => {
    return {
      label: partido.desc,
      value: partido.id,
    };
  });

  const noDijeronPartidoOption = {
    label: "No dijeron partido",
    value: "N/A",
  };

  const toast = useToast()
  const onSubmit = async (values: typeof initialValues, actions: FormikHelpers<typeof initialValues>) => { 
    try{
      const response = await axios.post("/api/denuncia", {
        payload: {
          nroMesa: parseInt(values.nroMesa),
          circ: parseInt(values.circ),
          seccion: parseInt(values.seccion),
          distrito: parseInt(values.distrito),
          pregunta1: values.pregunta1,
          pregunta2: values.pregunta2,
          pregunta3: values.pregunta1 === "1" ? "" : values.pregunta3,
        },
      });
        toast({
          title: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } catch (error:any) {
        toast({
          title: "Error",
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        console.error('Error en la solicitud:', error);
      }
      actions.setSubmitting(false)
    };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => { onSubmit(values,actions) }}
      validationSchema={registrarDenunciaValidation}
    >
      {(props) => (
        <FieldsContainer>
          <FieldInput name="dni" isRequired label="Numero de DNI" type="number" />
          <FieldInput name="distrito" isRequired label="Distrito" type="number" />
          <FieldInput name="seccion" isRequired label="Seccion" type="number" />
          <FieldInput name="circ" isRequired label="Circuito" type="number" />
          <FieldInput name="nroMesa" isRequired label="Numero de mesa" type="number" />

          <FieldRadio label="¿Faltaron boletas?" name="pregunta1" isRequired>
            <Radio onChange={props.handleChange} name={"pregunta1"} key={"pregunta1-1"} value="1">
              Nadie se quejó en mi mesa
            </Radio>
            <Radio onChange={props.handleChange} name={"pregunta1"} key={"pregunta1-2"} value="2">
              Si, faltaron boletas en mi mesa, me pasó a mi
            </Radio>
            <Radio onChange={props.handleChange} name={"pregunta1"} key={"pregunta1-3"} value="3">
              Si, faltaron boletas en mi mesa, le pasó a un tercero
            </Radio>
          </FieldRadio>

          {(props.values.pregunta1 === "2" || props.values.pregunta1 === "3") && (
            <FieldSelect name="pregunta3" label="De qué partido/s faltaron boletas?" placeholder="Selecciona una opcion" isRequired={props.values.pregunta1 === "2" || props.values.pregunta1 === "3"}>
              {[noDijeronPartidoOption, ...partidosOptions].map(partidoOption=>
                <option key={partidoOption.value} value={partidoOption.value}>{partidoOption.label}</option>
              )}
            </FieldSelect>
          )}

          <FieldRadio label="¿Que tan rapido pudiste votar?" name="pregunta2" isRequired>
            <Radio onChange={props.handleChange} name="pregunta2" key="pregunta2-1" value="1">
              Rapido
            </Radio>
            <Radio onChange={props.handleChange} name="pregunta2" key="pregunta2-2" value="2">
              Normal
            </Radio>
            <Radio onChange={props.handleChange} name="pregunta2" key="pregunta2-3" value="3">
              Lento
            </Radio>
          </FieldRadio>
      
          <VStack w="100%">
            <p>Revisa los datos antes de guardar </p>
            <Button
              isLoading={props.isSubmitting}
              type='submit'
              w="100%"
              >
              Guardar
            </Button>     
          </VStack>
        </FieldsContainer>
      )}
    </Formik>
  );
};

export default Form;
