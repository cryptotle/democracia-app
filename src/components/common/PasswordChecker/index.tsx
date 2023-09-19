import React, { useState } from "react";
import "./PasswordStrengthChecker.scss"; // Estilos CSS en un archivo separado
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  List,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { InfoIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const PasswordStrengthChecker = ({
  loading,
  value,
  handleChange,
  style,
  calculatePasswordStrength,
}: any) => {
  const [strength, setStrength] = useState("weak");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    const newStrength = calculatePasswordStrength(newPassword);
    setStrength(newStrength);
    handleChange(e);
  };

  return (
    <Box>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          placeholder="Password"
          name="password"
          value={value}
          onChange={handlePasswordChange}
          className={`password-input ${style}`}
          disabled={loading}
          required
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <input />
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
    </Box>
  );
};

export default PasswordStrengthChecker;
