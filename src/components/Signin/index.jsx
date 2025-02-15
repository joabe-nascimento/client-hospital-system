import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Heading,
  Text,
  Stack,
  useToast,
  InputGroup,
  InputLeftElement,
  Icon,
  Divider,
  AbsoluteCenter,
  List,
  ListItem,
  ListIcon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { FiLock, FiMail, FiLogIn, FiCheckCircle } from "react-icons/fi";
import * as Yup from "yup";
import "@fontsource/poppins";

const Signin = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
      .min(6, "Senha muito curta - deve ter no mínimo 6 caracteres")
      .required("Senha é obrigatória")
  });

  const handleLogin = async (values, actions) => {
    try {
      const response = await fetch(
        "https://backend-hospital-system-61pw.onrender.com/api/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userData", JSON.stringify(data.user));
        toast({
          title: "Login bem-sucedido",
          description: "Você entrou com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Erro no login",
          description: data.message || "Ocorreu um erro ao fazer login.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao fazer login.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      flexDirection={{ base: "column", md: "row" }}
      bg="white"
    >
       {/* Seção de Login */}
       <Box
        flex="1"
        w={{ base: "100%", md: "50%" }}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
        p={8}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            boxShadow="xl"
            w={{ base: "100%", md: "450px" }}
            maxW="100%"
          >
            <Flex direction="column" align="center" mb={8}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Heading
                  fontSize="3xl"
                  fontWeight="700"
                  color="teal.600"
                  mb={2}
                  fontFamily="Poppins"
                >
                  Acessar Sistema
                </Heading>
              </motion.div>
              <Text color="gray.600">Bem-vindo de volta! Faça login para continuar</Text>
            </Flex>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={SigninSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Stack spacing={5}>
                    <FormControl isInvalid={errors.email && touched.email}>
                      <InputGroup>
                        <InputLeftElement h="full" pointerEvents="none">
                          <Icon as={FiMail} color="teal.600" boxSize="5" />
                        </InputLeftElement>
                        <Field
                          name="email"
                          as={Input}
                          type="email"
                          placeholder="Email"
                          size="lg"
                          variant="filled"
                          bg="gray.50"
                          _focus={{ borderColor: "teal.500" }}
                          pl="12"
                        />
                      </InputGroup>
                      <Text fontSize="xs" color="red.500" mt={1} h="4">
                        {errors.email && touched.email && errors.email}
                      </Text>
                    </FormControl>

                    <FormControl isInvalid={errors.password && touched.password}>
                      <InputGroup>
                        <InputLeftElement h="full" pointerEvents="none">
                          <Icon as={FiLock} color="teal.600" boxSize="5" />
                        </InputLeftElement>
                        <Field
                          name="password"
                          as={Input}
                          type="password"
                          placeholder="Senha"
                          size="lg"
                          variant="filled"
                          bg="gray.50"
                          _focus={{ borderColor: "teal.500" }}
                          pl="12"
                        />
                      </InputGroup>
                      <Text fontSize="xs" color="red.500" mt={1} h="4">
                        {errors.password && touched.password && errors.password}
                      </Text>
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="teal"
                      size="lg"
                      rightIcon={<FiLogIn />}
                      isLoading={isSubmitting}
                      mt={4}
                      _hover={{ transform: "translateY(-2px)" }}
                      transition="all 0.2s"
                    >
                      Entrar
                    </Button>

                    <Box position="relative" py={6}>
                      <Divider borderColor="gray.200" />
                      <AbsoluteCenter bg="white" px={4} color="gray.500" fontSize="sm">
                        Não tem conta?
                      </AbsoluteCenter>
                    </Box>

                    <Button
                      variant="outline"
                      colorScheme="teal"
                      size="lg"
                      onClick={() => navigate("/signup")}
                      _hover={{ bg: "teal.50" }}
                    >
                      Criar Nova Conta
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </motion.div>
      </Box>
      <Box
  flex="1"
  position="relative"
  minH={{ base: "40vh", md: "100vh" }}
  w={{ base: "100%", md: "50%" }}
  display="flex"
  alignItems="center"
  justifyContent="center"
  overflow="hidden"
  color="white" // Alterado para melhor contraste
>
  {/* Imagem de fundo escurecida */}
  <Box
    position="absolute"
    top="0"
    left="0"
    right="0"
    bottom="0"
    bgImage="url('https://www.saude.ba.gov.br/wp-content/uploads/2022/06/IMG_9879-scaled.jpg')"
    bgSize="cover"
    bgPosition="center"
    backgroundBlendMode="darken"
    filter="brightness(50%)" // Escurece a imagem
    zIndex="0"
  />

  {/* Overlay escuro para melhor contraste */}
  <Box
    position="absolute"
    top="0"
    left="0"
    right="0"
    bottom="0"
    bg="rgba(0, 0, 0, 0.5)" // Ajuste a opacidade conforme necessário
    zIndex="1"
  />

  {/* Conteúdo acima do fundo */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    style={{ position: "relative", zIndex: 2 }}
  >
    <Box p={8} textAlign="center">
      <Heading fontSize="4xl" mb={6} fontFamily="Poppins" color="white">
        Hospital Geral Cleriston Andrade
      </Heading>

      <Box
        bgImage="url('https://www.feiradesantana.ba.leg.br/wp-content/uploads/2024/06/HGCA_-Foto-Ed-Santos.jpg')"
        bgSize="cover"
        bgPosition="center"
        w="300px"
        h="200px"
        mx="auto"
        borderRadius="xl"
        mb={8}
        boxShadow="xl"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))"
          borderRadius="xl"
        />
      </Box>

      <List spacing={3} textAlign="left" maxW="400px" mx="auto">
        <ListItem>
          <ListIcon as={FiCheckCircle} color="teal.200" />
          Atendimento 24 horas
        </ListItem>
        <ListItem>
          <ListIcon as={FiCheckCircle} color="teal.200" />
          Equipe especializada
        </ListItem>
        <ListItem>
          <ListIcon as={FiCheckCircle} color="teal.200" />
          Tecnologia de ponta
        </ListItem>
        <ListItem>
          <ListIcon as={FiCheckCircle} color="teal.200" />
          Credenciado pelo SUS
        </ListItem>
      </List>

      <Text mt={8} fontSize="sm" opacity="0.9">
        Há mais de 30 anos cuidando da sua saúde
      </Text>
    </Box>
  </motion.div>
</Box>


      
    </Flex>
  );
};

export default Signin;