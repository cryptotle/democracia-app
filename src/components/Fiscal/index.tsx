"use client";

import { FiscalRegisterForm } from "./FiscalRegisterForm";
import { Box, HStack, Image, Skeleton, Stack, Text, VStack } from "@chakra-ui/react";
import PageTitle from "../common/PageTitle";
import PageContainer from "../common/PageContainer";
import { Fiscales, Partido } from "@/types/database.types";

type Props = {
  partidos?: Partido[]
  fiscal?: Fiscales
}

export default function Fiscal( { partidos, fiscal } : Props ) {
  return (
    <PageContainer>
        <PageTitle title="Registro de fiscal" subtitle="Regístrate aquí para el programa de incentivos de fiscales de mesa a través de la DAO Democracia 3.0. Reconocemos tu labor en el proceso electoral y queremos recompensar tu participación."/>        
            <Skeleton w="100%" borderRadius="6px" minH="425px" isLoaded={partidos!==undefined && fiscal!==undefined}>
              {partidos && fiscal && <FiscalRegisterForm partidos={partidos} fiscal={fiscal}/>}
            </Skeleton>
    </PageContainer>
  );
}