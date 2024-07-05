import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "@fontsource/poppins"; // Import Poppins font

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
      .min(6, "Senha muito curta - deve ter no mínimo 6 caracteres")
      .required("Senha é obrigatória"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Senhas devem coincidir")
      .required("Confirmação de senha é obrigatória"),
  });

  const handleSignup = async (values, actions) => {
    if (values.password !== values.confirmPassword) {
      toast({
        title: "Erro na confirmação",
        description: "As senhas não coincidem.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      actions.setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful signup
        toast({
          title: "Cadastro bem-sucedido",
          description: "Você se cadastrou com sucesso.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/signin"); // Redirect to login page
      } else {
        // Display error message
        toast({
          title: "Erro no cadastro",
          description: data.message || "Ocorreu um erro durante o cadastro.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      // Display generic error message
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro durante o cadastro.",
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
      minHeight="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, teal.400, blue.500)"
      p={4}
    >
      <Box
        maxW="6xl"
        w="full"
        rounded="lg"
        p={6}
        my={12}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        bg="white"
        boxShadow="lg"
      >
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          mb={{ base: 6, md: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              as="h2"
              fontSize="8xl"
              fontFamily="Poppins, sans-serif"
              textAlign="center"
            >
              Prosel
            </Heading>
          </motion.div>
        </Box>
        <Box flex="1" maxW="md" w="full" p={6}>
          <Heading as="h3" size="lg" mb={6} textAlign="center">
            Cadastre-se
          </Heading>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl isInvalid={errors.name && touched.name}>
                    <FormLabel>Nome</FormLabel>
                    <Field name="name" as={Input} type="text" />
                    {errors.name && touched.name ? (
                      <Text color="red.500" fontSize="sm">
                        {errors.name}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={errors.email && touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Field name="email" as={Input} type="email" />
                    {errors.email && touched.email ? (
                      <Text color="red.500" fontSize="sm">
                        {errors.email}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl isInvalid={errors.password && touched.password}>
                    <FormLabel>Senha</FormLabel>
                    <Field name="password" as={Input} type="password" />
                    {errors.password && touched.password ? (
                      <Text color="red.500" fontSize="sm">
                        {errors.password}
                      </Text>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isInvalid={
                      errors.confirmPassword && touched.confirmPassword
                    }
                  >
                    <FormLabel>Confirmar Senha</FormLabel>
                    <Field name="confirmPassword" as={Input} type="password" />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <Text color="red.500" fontSize="sm">
                        {errors.confirmPassword}
                      </Text>
                    ) : null}
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    fontSize="md"
                    isLoading={isSubmitting}
                  >
                    Cadastrar
                  </Button>
                  <Button variant="link" onClick={() => navigate("/signin")}>
                    Já tem uma conta? Conecte-se
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
