import { Box, Center, Button, BoxProps, useBreakpointValue, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props extends BoxProps {
  href: string;
  children: React.ReactNode;
  bg?: string;
  imageUrl?: string;
  disabled?: boolean;
}

export default function HomeActionButton({ href, children, imageUrl, disabled, bg, ...props }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  return (
    // <Box {...props} minW={'180px'} w={"100%"} position={"relative"} 
    //   onMouseEnter={handleMouseEnter}
    //   onMouseLeave={handleMouseLeave}>
    //   <Center h={{md: "100px", base: "100px"}}>
    //     <Box
    //       bg={`url(${imageUrl ?? "./home1.webp"}) center center no-repeat`}
    //       backgroundSize="cover"
    //       w="100%"
    //       h="100%"
    //       boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    //       borderRadius="md"
    //     ></Box>
    //   </Center>
    //   <Button
    //     borderRadius={0}
    //     position={"absolute"}
    //     bottom={0}
    //     wordBreak={"break-word"}
    //     w="100%" // Cambiamos el ancho al 100% para que el botón se expanda horizontalmente
    //     isDisabled={disabled}
    //     onClick={()=>router.push(href)}
    //     style={{minHeight: isHovered ? isMobile ? "100px" : "100px" : "50px", textDecoration: "none"}}
    //     bg={bg + ".500"}
    //     opacity={!disabled ? 0.9 : '0.6 !important'}
    //     colorScheme={bg}
    //     transition=".3s ease-in-out" // Aplicamos la transición a la altura mínima
    //   >
    //     <VStack spacing={0}>
    //     <Text maxW={'100%'} wordBreak={'break-all'}>{children} </Text>
    //     <Text>{disabled ? " (Próximamente)" : ""}</Text>
    //     </VStack>
    //   </Button>
    // </Box>
    <Button
        bottom={0}
        wordBreak={"break-word"}
        w="100%" // Cambiamos el ancho al 100% para que el botón se expanda horizontalmente
        isDisabled={disabled}
        onClick={()=>router.push(href)}
        bg={bg + ".500"}
        colorScheme={bg}
        transition=".3s ease-in-out" // Aplicamos la transición a la altura mínima
      >
        <VStack spacing={0}>
        <Text maxW={'100%'} wordBreak={'break-all'}>{children} </Text>
        <Text>{disabled ? " (Próximamente)" : ""}</Text>
        </VStack>
      </Button>
  );
}