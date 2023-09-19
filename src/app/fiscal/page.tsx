'use client'
import Header from "@/components/common/Header/header.component";
import styles from './page.module.scss'; // Importa los estilos CSS Modules
import axios from "axios";
import { useState, useEffect } from "react";
import { Colegio, Fiscales, Partido } from "@/types/database.types";
import Fiscal from "@/components/Fiscal";
import { HStack, Stack, VStack } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import HomeActionButton from "@/components/HomeActionButton";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";

export default function FiscalPage() {
  const [fiscal, setFiscal] = useState<Fiscales>();
  
  useEffect(() => {
    const fetchFiscal = async () => {
      try {
        const respFiscal = await axios.get('/api/fiscal');
        console.log(respFiscal.data)
        setFiscal(respFiscal.data||{
          circ: null,
          colegio: null,
          distrito: null,
          dni: "",
          fiscalizado: false,
          foto_dni: "",
          foto_poder_fiscal_url: null,
          foto_selfie_mesa_url: null,
          id: "",
          idPartido: "",
          nroMesa: null,
          seccion: null});
      } catch (error) {
        console.error(error)
      }
    };
    fetchFiscal();
  }, []);


  const [partidos, setPartidos] = useState<Partido[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respPartido = await axios.get('/api/partido');
        setPartidos(respPartido.data);
      } catch (error) {
        console.error(error)
      }
    };
  
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <PageContainer maxW="80vw">
        <PageTitle title="Area de Fiscales"/>
        <VStack spacing={10}>
              <Stack direction={{md: 'row', base: 'column'}} spacing={5}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco
                  </p>
              </Stack>
              <Stack w={'100%'} direction={{base:'column', md:'row'}}>
                <HomeActionButton href="/altafiscal" bg="blue">Anotarme como fiscal</HomeActionButton>
                <HomeActionButton href="/validar"  bg="blue" disabled >Validar que fui fiscal</HomeActionButton> 
              </Stack>
            </VStack>
      </PageContainer>
            
          

      {/* <Fiscal partidos={partidos} fiscal={fiscal}/> */}
    </>
  );
}
