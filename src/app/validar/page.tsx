'use client'
import Header from "@/components/common/Header/header.component";
import styles from './page.module.scss'; // Importa los estilos CSS Modules
import axios from "axios";
import { useState, useEffect } from "react";
import { Colegio, Fiscales, Partido } from "@/types/database.types";
import Fiscal from "@/components/Fiscal";
import Validar from "@/components/Validar";

export default function FiscalPage() {
  const [fiscal, setFiscal] = useState<Fiscales>();
  const [partidos, setPartidos] = useState<Partido[]>()

  useEffect(() => {
    const fetchFiscal = async () => {
      try {
        const respFiscal = await axios.get('/api/fiscal');
        setFiscal(respFiscal.data);
      } catch (error) {
        console.error(error)
      }
    };
    fetchFiscal();
  }, []);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const respPartidos = await axios.get('/api/partido');
        setPartidos(respPartidos.data);
      } catch (error) {
        console.error(error)
      }
    };
    fetchPartidos();
  }, []);
  return (
    <>
      <Header />
      <Validar partidos={partidos} fiscal={fiscal}/>
    </>
  );
}
