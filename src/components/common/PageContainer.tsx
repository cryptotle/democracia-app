import React, { ReactNode } from "react";
import {
  FlexProps,
  Container,
  VStack,
} from "@chakra-ui/react";
interface PageContainerProps extends FlexProps {
  children?: ReactNode;
  maxW?: string;
}
export default function PageContainer({
  children,
   maxW = "480px",
  ...props
}: PageContainerProps) {
  return (
    <Container {...props} bg="black" minH="100vh" p={{base:4,md:20}} maxW='100%' w={'100%'} m={0} as='section'>
      <VStack bg="white" maxW={maxW} m="auto" p="24px" spacing="24px" borderRadius="12px">
      {children}
      </VStack>
    </Container>
  );
}