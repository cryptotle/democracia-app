"use client";

import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { Formik, FormikHelpers} from "formik";
import { Fiscales, Partido } from "@/types/database.types";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { PutBlobResult } from "@vercel/blob";
import FieldsContainer from "../common/FieldsContainer";
import FieldInput from "../common/FieldInput";
import FieldSelect from "../common/FieldSelect";
import FieldImage from "../common/FieldImage";
import { fiscalValidationFormValidation } from "@/validations";

type Props = {
  partidos: Partido[]
  fiscal: Fiscales
}

export const FiscalValidationForm = ( { partidos, fiscal } : Props ) => {
  const [isDisabled, setIsDisabled] = useState(Boolean(fiscal.nroMesa) && Boolean(fiscal.distrito) && Boolean(fiscal.seccion) && Boolean(fiscal.circ) && Boolean(fiscal.foto_poder_fiscal_url) && Boolean(fiscal.foto_selfie_mesa_url))
  const [filePoder, setFilePoder] = useState<File | null>(null)
  const [fileSelfie, setFileSelfie] = useState<File | null>(null)
  const toast = useToast()

  const onSubmit = async (values:Fiscales,actions:FormikHelpers<Fiscales>) => {
    if(isDisabled){
      setIsDisabled(false)
      actions.setSubmitting(false)
      return
    }
    if(!fiscal.foto_poder_fiscal_url && !filePoder || !fiscal.foto_selfie_mesa_url && !fileSelfie){
      actions.setSubmitting(false)
      return
    }
    try {
      let selfieImageUrl
      let poderImageUrl
      
      if(filePoder && fileSelfie){
        const respPoder = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'content-type': filePoder?.type || 'application/octet-stream' },
          body: filePoder,
        })
        if (respPoder.status !== 200) {
          const error = await respPoder.text()
          throw Error(error)
        } 
        const { url:poderUrl } = (await respPoder.json()) as PutBlobResult
        poderImageUrl=poderUrl

        const respSelfie = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'content-type': fileSelfie?.type || 'application/octet-stream' },
          body: fileSelfie,
        })
        if (respSelfie.status !== 200) {
          const error = await respSelfie.text()
          throw Error(error)
        } 
        const { url:SelfieUrl } = (await respSelfie.json()) as PutBlobResult
        selfieImageUrl=SelfieUrl
      }
      
      const response = await axios.put('/api/fiscal', {
        payload: {
          nroMesa:parseInt(values.nroMesa?.toString()||""),
          distrito:parseInt(values.distrito?.toString()||""),
          seccion:parseInt(values.seccion?.toString()||""),
          circ:parseInt(values.circ?.toString()||""),
          foto_selfie_mesa_url: selfieImageUrl,
          foto_poder_fiscal_url: poderImageUrl,
          id:fiscal.id
        }
      });
      toast({
        title: response.data.message,
            status: 'success',
            duration: 5000,
            isClosable: true,
      })
      setIsDisabled(true)
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
      initialValues={fiscal}
      onSubmit={(values, actions) => {
        onSubmit(values,actions)
      }}
      validationSchema={fiscalValidationFormValidation}
    >
      {(props) => (
        <FieldsContainer>
          <FieldInput name="dni" isDisabled={true} isRequired label="Numero de DNI" type="number" />
          <FieldSelect name="idPartido" isDisabled={true} isRequired label="Partido político" placeholder="Selecciona un partido">
            {partidos.map(partido=>
              <option  key={partido.id} value={partido.id}>{partido.desc}</option>
            )}
          </FieldSelect>
          <FieldInput name="nroMesa" isDisabled={isDisabled} isRequired label="Numero de mesa" type="number"/>
          <FieldInput name="distrito" isDisabled={isDisabled} isRequired label="Distrito" type="number"/>
          <FieldInput name="seccion" isDisabled={isDisabled} isRequired label="Seccion" type="number"/>
          <FieldInput name="circ" isDisabled={isDisabled} isRequired label="Circuito" type="number"/>
          <FieldImage
            label="Foto poder del fiscal"
            name="foto_poder_fiscal_url"
            isRequired
            isDisabled={isDisabled}
            isInvalid={filePoder===null && !fiscal.foto_poder_fiscal_url}
            errorMsg="Este campo es obligatorio"
            setFile={setFilePoder}
          />
          <FieldImage
            label="Selfie en la mesa"
            name="foto_selfie_mesa_url"
            isRequired
            isDisabled={isDisabled}
            isInvalid={fileSelfie===null && !fiscal.foto_selfie_mesa_url}
            errorMsg="Este campo es obligatorio"
            setFile={setFileSelfie}
          />
          <Button
            isLoading={props.isSubmitting}
            type='submit'
            w="100%"
            rightIcon={isDisabled?<EditIcon/>:undefined}
            >
            {isDisabled?"Editar":"Validar"}
          </Button>     
        </FieldsContainer>
      )}
    </Formik>
  );
};
