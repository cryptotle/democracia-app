"use client";
import RegistrarDenuncia from "@/components/RegistrarDenuncia";
import Header from "@/components/common/Header/header.component";
import { Partido } from "@/types/database.types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Registrar() {
  const [partidos, setPartidos] = useState<Partido[]>();

  const getPartidos = async () => {
    const response = await axios.get("/api/partido");
    console.log("partidos", response.data);
    setPartidos(response.data);
  };
  useEffect(() => {
    if (!partidos) getPartidos();
  });

  return (
    <>
      <Header />
      <RegistrarDenuncia partidos={partidos} />
    </>
  );
}
