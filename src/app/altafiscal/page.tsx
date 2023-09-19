'use client'
import Header from "@/components/common/Header/header.component";
import styles from './page.module.scss'; // Importa los estilos CSS Modules
import axios from "axios";
import { useState, useEffect } from "react";
import { Colegio, Fiscales, Partido } from "@/types/database.types";
import Fiscal from "@/components/Fiscal";

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
      <Fiscal partidos={partidos} fiscal={fiscal}/>
    </>
  );
}
