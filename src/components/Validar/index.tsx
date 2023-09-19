"use client";

import { FiscalValidationForm } from "./FiscalValidationForm";
import { Skeleton } from "@chakra-ui/react";
import PageTitle from "../common/PageTitle";
import PageContainer from "../common/PageContainer";
import { Fiscales, Partido } from "@/types/database.types";

type Props = {
  partidos?: Partido[]
  fiscal?: Fiscales
}

export default function Validar( { partidos, fiscal } : Props ) {
  return (
    <PageContainer>
      <PageTitle title="Validar fiscalizacion" subtitle="Completa los datos del formulario para validar tu participación en la fiscalizacion de los comisios."/>        
        <Skeleton w="100%" borderRadius="6px" minH="910px" isLoaded={partidos!==undefined && fiscal!==undefined}>
          {partidos && fiscal && <FiscalValidationForm partidos={partidos} fiscal={fiscal}/>}
        </Skeleton>
    </PageContainer>
  );
}