import React, { Component } from "react";
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
import moment from "moment";

const MotionListItem = motion(ListItem);

class AgendamentoTransporte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      newPatient: "",
      filter: "Todos",
    };
  }

  componentDidMount() {
    this.fetchRequests();
  }

  fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://backend-hospital-system.onrender.com/api/requests"
      );
      if (Array.isArray(response.data)) {
        this.setState({ requests: response.data });
      } else {
        console.error("Resposta da API não é uma matriz:", response.data);
        this.setState({ requests: [] });
      }
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
      this.setState({ requests: [] });
    }
  };

  handleAccept = async (id) => {
    try {
      await axios.patch(
        `https://backend-hospital-system.onrender.com/api/requests/${id}`,
        {
          status: "Aceita",
        }
      );
      this.fetchRequests();
    } catch (error) {
      console.error("Erro ao aceitar solicitação:", error);
    }
  };

  handleReject = async (id) => {
    try {
      await axios.patch(
        `https://backend-hospital-system.onrender.com/api/requests/${id}`,
        {
          status: "Recusada",
        }
      );
      this.fetchRequests();
    } catch (error) {
      console.error("Erro ao recusar solicitação:", error);
    }
  };

  handleAddRequest = async () => {
    const { newPatient } = this.state;
    if (newPatient.trim() !== "") {
      try {
        await axios.post(
          "https://backend-hospital-system.onrender.com/api/requests",
          {
            patient: newPatient,
          }
        );
        this.setState({ newPatient: "" });
        this.fetchRequests();
      } catch (error) {
        console.error("Erro ao adicionar solicitação:", error);
      }
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { requests, newPatient, filter } = this.state;
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
              name="newPatient"
              value={newPatient}
              onChange={this.handleChange}
            />
            <Button colorScheme="blue" onClick={this.handleAddRequest}>
              Adicionar
            </Button>
          </HStack>
          <Select
            name="filter"
            value={filter}
            onChange={this.handleChange}
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
                      onClick={() => this.handleAccept(req._id)}
                      colorScheme="green"
                      leftIcon={<CheckIcon />}
                    >
                      Aceitar
                    </Button>
                    <Button
                      onClick={() => this.handleReject(req._id)}
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

        <Heading as="h3" size="md" mt={8} mb={4} color="GrayText">
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
              bg="white"
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
                          : req.status === "Pendente"
                          ? "gray"
                          : "blue"
                      }
                    >
                      {req.status}
                    </Badge>
                  </Text>
                  <Text>
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
  }
}

export default AgendamentoTransporte;
