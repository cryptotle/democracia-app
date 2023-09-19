"use client";

import { Stack } from "@chakra-ui/react";
import HomeActionButton from "./HomeActionButton";
import { useSession } from "next-auth/react";

export default function HomeActions() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
            <Stack w='100%'  direction={{base:'column', md: 'row'}}>
                <HomeActionButton imageUrl="./dao.png" href="/contribuir"  bg="green">Contribuir / Contribute ETH</HomeActionButton>
                <HomeActionButton imageUrl="./fiscal.webp" href="/fiscal"  bg="blue">Soy fiscal voluntario</HomeActionButton>
                <HomeActionButton imageUrl="./reporte.jpg" href="/registrar" disabled bg="purple">  ¿Como te fue al votar?</HomeActionButton> 
                {/* <HomeActionButton imageUrl="./valida.webp" href="/validar"  bg="red" disabled >Validar que fui fiscal</HomeActionButton> */}
                {/* <HomeActionButton href="/login"  bg="yellow">Login</HomeActionButton> */}
                {/* <HomeActionButton imageUrl="./home2.webp" href="/register"  bg="blue">Registrate</HomeActionButton> */}
                {/* <HomeActionButton imageUrl="./home1.webp" href="/contribuir"  bg="green">Contribuir</HomeActionButton> */}
            </Stack>
    </>
  );
}
