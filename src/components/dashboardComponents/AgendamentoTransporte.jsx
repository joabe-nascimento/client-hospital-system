

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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import axios from "axios";

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
    <Box>
      <Heading as="h2" size="lg" mb={4} color="GrayText">
        Agendamento de Transporte de Pacientes
      </Heading>

      <VStack spacing={4} mb={4}>
        <HStack spacing={2} w="full">
          <Input
            placeholder="Nome do Paciente"
            value={newPatient}
            onChange={(e) => setNewPatient(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleAddRequest}>
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
