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

const Signin = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
      .min(6, "Senha muito curta - deve ter no mínimo 6 caracteres")
      .required("Senha é obrigatória"),
  });

  const handleLogin = async (values, actions) => {
    try {
      const response = await fetch("http://localhost:3001/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
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
        // Display error message
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
      // Display generic error message
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
            Fazer login
          </Heading>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={SigninSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Stack spacing={4}>
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
                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    fontSize="md"
                    isLoading={isSubmitting}
                  >
                    Entrar
                  </Button>
                  <Button variant="link" onClick={() => navigate("/signup")}>
                    Não tem uma conta? Inscrever-se
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

export default Signin;
