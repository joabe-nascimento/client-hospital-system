import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Button,
  Input,
  Select,
  VStack,
  HStack,
  Badge,
  Icon,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const MotionListItem = motion(ListItem);

const AgendamentoTransporte = () => {
  const [requests, setRequests] = useState([]);
  const [newPatient, setNewPatient] = useState("");
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("https://backend-hospital-system.onrender.com/api/requests");
      if (Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        console.error("Resposta da API não é uma matriz:", response.data);
        setRequests([]);
      }
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
      setRequests([]);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.patch(`https://backend-hospital-system.onrender.com/api/requests/${id}`, {
        status: "Aceita",
      });
      fetchRequests();
    } catch (error) {
      console.error("Erro ao aceitar solicitação:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`https://backend-hospital-system.onrender.com/api/requests/${id}`, {
        status: "Recusada",
      });
      fetchRequests();
    } catch (error) {
      console.error("Erro ao recusar solicitação:", error);
    }
  };

  const handleAddRequest = async () => {
    if (newPatient.trim() !== "") {
      try {
        await axios.post("https://backend-hospital-system.onrender.com/api/requests", {
          patient: newPatient,
        });
        setNewPatient("");
        fetchRequests();
      } catch (error) {
        console.error("Erro ao adicionar solicitação:", error);
      }
    }
  };

  const filteredRequests = requests.filter((req) =>
    filter === "Todos" ? true : req.status === filter
  );

  return (
    <Box p={6}>
      <Heading as="h2" size="lg" mb={6} color="teal.600">
        Agendamento de Transporte de Pacientes
      </Heading>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <GridItem colSpan={1}>
          <Box p={4} bg="teal.50" borderRadius="md" boxShadow="md">
            <VStack spacing={4} align="stretch">
              <HStack spacing={2} w="full">
                <Input
                  placeholder="Nome do Paciente"
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)}
                />
                <Button colorScheme="teal" onClick={handleAddRequest}>
                  Adicionar
                </Button>
              </HStack>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrar por status"
              >
                <option value="Todos">Todos</option>
                <option value="Pendente">Pendente</option>
                <option value="Aceita">Aceita</option>
                <option value="Recusada">Recusada</option>
              </Select>
            </VStack>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box p={4} bg="teal.50" borderRadius="md" boxShadow="md">
            <Heading as="h3" size="md" mb={4} color="teal.700">
              Estatísticas de Solicitações
            </Heading>
            <SimpleGrid columns={3} spacing={4}>
              <Box>
                <Pie data={{
                  labels: ['Aceita', 'Recusada', 'Pendente'],
                  datasets: [{
                    data: [
                      requests.filter(req => req.status === 'Aceita').length,
                      requests.filter(req => req.status === 'Recusada').length,
                      requests.filter(req => req.status === 'Pendente').length,
                    ],
                    backgroundColor: ['#68D391', '#FC8181', '#CBD5E0']
                  }]
                }} />
              </Box>
              <Box>
                <Bar data={{
                  labels: ['Aceita', 'Recusada', 'Pendente'],
                  datasets: [{
                    label: '# de Solicitações',
                    data: [
                      requests.filter(req => req.status === 'Aceita').length,
                      requests.filter(req => req.status === 'Recusada').length,
                      requests.filter(req => req.status === 'Pendente').length,
                    ],
                    backgroundColor: ['#68D391', '#FC8181', '#CBD5E0']
                  }]
                }} />
              </Box>
              <Box>
                <Line data={{
                  labels: ['Aceita', 'Recusada', 'Pendente'],
                  datasets: [{
                    label: '# de Solicitações',
                    data: [
                      requests.filter(req => req.status === 'Aceita').length,
                      requests.filter(req => req.status === 'Recusada').length,
                      requests.filter(req => req.status === 'Pendente').length,
                    ],
                    backgroundColor: ['#68D391', '#FC8181', '#CBD5E0'],
                    borderColor: ['#68D391', '#FC8181', '#CBD5E0'],
                    fill: false
                  }]
                }} />
              </Box>
            </SimpleGrid>
          </Box>
        </GridItem>
      </Grid>

      <List spacing={3}>
        {filteredRequests.map((req) => (
          <MotionListItem
            key={req._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            bg={req.status === "Pendente" ? "gray.100" : "white"}
          >
            <HStack justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">
                  Paciente: {req.patient}{" "}
                  <Badge
                    ml={2}
                    colorScheme={
                      req.status === "Aceita"
                        ? "green"
                        : req.status === "Recusada"
                        ? "red"
                        : "gray"
                    }
                  >
                    {req.status}
                  </Badge>
                </Text>
                <HStack mt={2}>
                  {req.status === "Aceita" && (
                    <Icon as={CheckIcon} color="green.500" />
                  )}
                  {req.status === "Recusada" && (
                    <Icon as={CloseIcon} color="red.500" />
                  )}
                  {req.status === "Pendente" && (
                    <Icon as={TimeIcon} color="gray.500" />
                  )}
                </HStack>
              </Box>
              {req.status === "Pendente" && (
                <HStack>
                  <Button
                    onClick={() => handleAccept(req._id)}
                    colorScheme="green"
                    leftIcon={<CheckIcon />}
                  >
                    Aceitar
                  </Button>
                  <Button
                    onClick={() => handleReject(req._id)}
                    colorScheme="red"
                    leftIcon={<CloseIcon />}
                  >
                    Recusar
                  </Button>
                </HStack>
              )}
            </HStack>
          </MotionListItem>
        ))}
      </List>
    </Box>
  );
};

export default AgendamentoTransporte;
