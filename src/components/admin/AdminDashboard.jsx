import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  VStack,
  Text,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GestaoPrioridades from "../dashboardComponents/GestaoPrioridades";
import AgendamentoTransporte from "../dashboardComponents/AgendamentoTransporte";
import RastreamentoPacientes from "../dashboardComponents/RastreamentoPacientes";
import RegistroIncidentes from "../dashboardComponents/RegistroIncidentes";

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      navigate("/signin");
    } else {
      setUserRole(userData.role);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    toast({
      title: "Logout bem-sucedido.",
      description: "Você saiu com sucesso.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/signin");
  };

  if (userRole === null) {
    return null; // Or a loading spinner
  }

  return (
    <Container maxW="container.xl" p={4}>
      <Flex justifyContent="space-between" mb={8}>
        <Box>
          <Heading as="h1" size="xl" mb={4} color="teal.600">
            Painel de Administração
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Gerencie as prioridades dos pacientes e outras funções hospitalares.
          </Text>
        </Box>
        <Button onClick={handleLogout} colorScheme="red" size="md">
          Logout
        </Button>
      </Flex>
      <Tabs isFitted variant="enclosed">
        <TabList mb={4}>
          <Tab>Gestão de Prioridades</Tab>
          <Tab>Agendamento de Transporte</Tab>
          <Tab>Rastreamento de Pacientes</Tab>
          <Tab>Registro de Incidentes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GestaoPrioridades userRole={userRole} />
          </TabPanel>
          <TabPanel>
            <AgendamentoTransporte userRole={userRole} />
          </TabPanel>
          <TabPanel>
            <RastreamentoPacientes userRole={userRole} />
          </TabPanel>
          <TabPanel>
            <RegistroIncidentes userRole={userRole} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default AdminDashboard;
