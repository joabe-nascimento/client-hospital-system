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
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckIcon, CloseIcon, TimeIcon } from "@chakra-ui/icons";
import axios from "axios";
import moment from "moment";

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
      const response = await axios.get(
        "https://backend-hospital-system-61pw.onrender.com/api/requests"
      );
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
      await axios.patch(
        `https://backend-hospital-system-61pw.onrender.com/api/requests/${id}`,
        {
          status: "Aceita",
        }
      );
      fetchRequests();
    } catch (error) {
      console.error("Erro ao aceitar solicitação:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `https://backend-hospital-system-61pw.onrender.com/api/requests/${id}`,
        {
          status: "Recusada",
        }
      );
      fetchRequests();
    } catch (error) {
      console.error("Erro ao recusar solicitação:", error);
    }
  };

  const handleAddRequest = async () => {
    if (newPatient.trim() !== "") {
      try {
        await axios.post(
          "https://backend-hospital-system-61pw.onrender.com/api/requests",
          {
            patient: newPatient,
          }
        );
        setNewPatient("");
        fetchRequests();
      } catch (error) {
        console.error("Erro ao adicionar solicitação:", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "newPatient") {
      setNewPatient(value);
    } else if (name === "filter") {
      setFilter(value);
    }
  };

  const filteredRequests = requests.filter((req) =>
    filter === "Todos" ? true : req.status === filter
  );

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const inputBgColor = useColorModeValue("white", "gray.900");
  const badgeColors = {
    Aceita: useColorModeValue("green", "green"),
    Recusada: useColorModeValue("red", "red"),
    Pendente: useColorModeValue("gray", "gray"),
  };
  const listItemBgColor = useColorModeValue("white", "gray.800");
  const listItemTextColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Box p={4} bg={bgColor} color={textColor}>
      <Heading as="h2" size="lg" mb={4}>
        Agendamento de Transporte de Pacientes
      </Heading>

      <VStack spacing={4} mb={4}>
        <HStack spacing={2} w="full">
          <Input
            placeholder="Nome do Paciente"
            name="newPatient"
            value={newPatient}
            onChange={handleChange}
            bg={inputBgColor}
            color={textColor}
          />
          <Button colorScheme="blue" onClick={handleAddRequest}>
            Adicionar
          </Button>
        </HStack>
        <Select
          name="filter"
          value={filter}
          onChange={handleChange}
          placeholder="Filtrar por status"
          bg={inputBgColor}
          color={textColor}
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
            bg={listItemBgColor}
            color={listItemTextColor}
          >
            <HStack justifyContent="space-between">
              <Box>
                <Text fontWeight="bold" color={listItemTextColor}>
                  Paciente: {req.patient}{" "}
                  <Badge ml={2} colorScheme={badgeColors[req.status]}>
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

      <Heading as="h3" size="md" mt={8} mb={4}>
        Histórico de Solicitações
      </Heading>
      <List spacing={3}>
        {requests.map((req) => (
          <MotionListItem
            key={req._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            bg={listItemBgColor}
            color={listItemTextColor}
          >
            <HStack justifyContent="space-between">
              <Box>
                <Text fontWeight="bold" color={listItemTextColor}>
                  Paciente: {req.patient}{" "}
                  <Badge ml={2} colorScheme={badgeColors[req.status]}>
                    {req.status}
                  </Badge>
                </Text>
                <Text color={listItemTextColor}>
                  <strong>Publicado em:</strong>{" "}
                  {moment(req.createdAt).format("DD/MM/YYYY HH:mm")}
                </Text>
              </Box>
            </HStack>
          </MotionListItem>
        ))}
      </List>
    </Box>
  );
};

export default AgendamentoTransporte;
