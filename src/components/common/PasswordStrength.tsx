import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

interface Props {
  value:  string,
}

const PasswordStrength = ( { value } : Props ) => {
  const [strength, setStrength] = useState("weak");

  const calculatePasswordStrength = (password: string): string => {
    if ( password.length >= 8 && /[0-9]/.test(password) && /[A-Z]/.test(password)) {
      return "strong";
    } else if (password.length >= 6 && /[0-9]/.test(password)) {
      return "medium";
    } else {
      return "weak";
    }
  };

  useEffect(() => {
    const newStrength = calculatePasswordStrength(value);
    setStrength(newStrength);
  }, [value])

  return (
    <Accordion allowToggle>
        <AccordionItem>
        <AccordionButton>
            <HStack w={"100%"} justify={"space-between"}>
            <p className={`password-strength ${strength}`}>
                Fortaleza de la contraseña:{" "}
                {strength === "weak"
                ? "Débil"
                : strength === "medium"
                ? "Medio"
                : "Fuerte"}
            </p>
            <InfoIcon />
            </HStack>
        </AccordionButton>
        <AccordionPanel pb={4}>
            <Stack mt={2}>
            <UnorderedList ml={4} fontSize={"0.8rem"}>
                <ListItem>Al menos 8 caracteres de longitud</ListItem>
                <ListItem>Al menos un número</ListItem>
                <ListItem>Al menos una letra mayúscula</ListItem>
            </UnorderedList>
            </Stack>
        </AccordionPanel>
        </AccordionItem>
    </Accordion> 
  )
};

export default PasswordStrength;
