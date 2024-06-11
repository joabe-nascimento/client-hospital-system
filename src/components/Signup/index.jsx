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
import { MdPersonAdd, MdEmail, MdLock, MdPerson } from "react-icons/md";

const MotionBox = motion(Box);

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Signup successful.",
          description: "You have signed up successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/signin");
      } else {
        toast({
          title: "Signup error",
          description: data.message || "An error occurred during signup.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Signup error",
        description: "An error occurred during signup.",
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
          Signup
        </Heading>
        <form onSubmit={handleSignup}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdPerson color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </InputGroup>
            </FormControl>
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
            <FormControl>
              <FormLabel>Confirmar Senha</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdLock color="gray.300" />
                </InputLeftElement>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              fontSize="md"
              leftIcon={<MdPersonAdd />}
            >
              Cadastrar
            </Button>
            <Button variant="link" onClick={() => navigate("/signin")}>
              Já tem uma conta? Faça login
            </Button>
          </Stack>
        </form>
      </MotionBox>
    </Flex>
  );
};

export default Signup;
