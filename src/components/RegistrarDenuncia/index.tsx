"use client";

import Form from "./Form";
import PageTitle from "../common/PageTitle";
import PageContainer from "../common/PageContainer";
import { Partido } from "@/types/database.types";
import { Skeleton } from "@chakra-ui/react";

interface Props {
  partidos: Partido[] | undefined;
}
export default function RegistrarDenuncia({ partidos }: Props) {
  return (
    <PageContainer>
      <PageTitle title="Como te fue votando?" subtitle="" />      
        <Skeleton w="100%" borderRadius="6px" minH="425px" isLoaded={partidos!==undefined}>
          {partidos && <Form partidos={partidos}/>}
        </Skeleton>

    </PageContainer>
  );
}
