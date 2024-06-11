import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
  useToast,
  InputGroup,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdLocalHospital, MdEmail, MdLock } from "react-icons/md";

const MotionBox = motion(Box);

const Signin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://backend-hospital-system.onrender.com/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        localStorage.setItem("userData", JSON.stringify(data.user));
        toast({
          title: "Login bem-sucedido.",
          description: "Você entrou com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/dashboard");
      } else {
        // Display error message
        toast({
          title: "Erro de login",
          description: data.message || "Ocorreu um erro ao fazer login.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      // Display generic error message
      toast({
        title: "Erro de login",
        description: "Ocorreu um erro ao fazer login.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.100">
      <MotionBox
        maxW="md"
        w="full"
        bg="white"
        boxShadow="2xl"
        rounded="lg"
        p={8}
        my={12}
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Login Hospitalar
        </Heading>
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Endereço de Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdEmail color="gray.300" />
                </InputLeftElement>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdLock color="gray.300" />
                </InputLeftElement>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              fontSize="md"
              leftIcon={<MdLocalHospital />}
              _hover={{ bg: "teal.500", transform: "scale(1.05)" }}
              transition="all 0.2s"
            >
              Entrar
            </Button>
            <Button variant="link" onClick={() => navigate("/signup")}>
              Não tem uma conta? Inscreva-se
            </Button>
          </Stack>
        </form>
      </MotionBox>
    </Flex>
  );
};

export default Signin;
