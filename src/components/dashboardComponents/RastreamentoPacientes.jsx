import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Badge,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";

const RastreamentoPacientes = () => {
  const [trackings, setTrackings] = useState([]);
  const [newTrackingName, setNewTrackingName] = useState("");
  const [newTrackingStatus, setNewTrackingStatus] = useState(
    "Aguardando transporte"
  );

  useEffect(() => {
    const fetchTrackings = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/trackings");
        setTrackings(response.data);
      } catch (error) {
        console.error("Erro ao buscar trackings:", error);
      }
    };
    fetchTrackings();
  }, []);

  const addTracking = async () => {
    if (newTrackingName.trim() !== "") {
      const newTracking = {
        name: newTrackingName,
        status: newTrackingStatus,
      };
      try {
        const response = await axios.post(
          "http://localhost:3001/api/trackings",
          newTracking
        );
        setTrackings([...trackings, response.data]);
        setNewTrackingName("");
        setNewTrackingStatus("Aguardando transporte");
      } catch (error) {
        console.error("Erro ao adicionar tracking:", error);
      }
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3001/api/trackings/${id}`, {
        status: newStatus,
      });
      setTrackings(
        trackings.map((tracking) =>
          tracking._id === id ? { ...tracking, status: newStatus } : tracking
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status do tracking:", error);
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4} color="GrayText">
        Rastreamento de Pacientes
      </Heading>
      <List spacing={3}>
        {trackings.map((tracking) => (
          <motion.div
            key={tracking._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ListItem mb={2}>
              <Text>
                Paciente: {tracking.name} - Status:{" "}
                <Badge
                  colorScheme={
                    tracking.status === "Em transporte"
                      ? "yellow"
                      : tracking.status === "Chegou ao destino"
                      ? "green"
                      : "blue"
                  }
                >
                  {tracking.status}
                </Badge>
              </Text>
              <Select
                value={tracking.status}
                onChange={(e) => updateStatus(tracking._id, e.target.value)}
                mt={2}
              >
                <option value="Aguardando transporte">
                  Aguardando transporte
                </option>
                <option value="Em transporte">Em transporte</option>
                <option value="Chegou ao destino">Chegou ao destino</option>
              </Select>
            </ListItem>
          </motion.div>
        ))}
      </List>
      <Box mt={6}>
        <Heading as="h3" size="md" mb={4}>
          Adicionar Novo Paciente
        </Heading>
        <Input
          placeholder="Nome do Paciente"
          value={newTrackingName}
          onChange={(e) => setNewTrackingName(e.target.value)}
          mb={2}
        />
        <Select
          value={newTrackingStatus}
          onChange={(e) => setNewTrackingStatus(e.target.value)}
          mb={2}
        >
          <option value="Aguardando transporte">Aguardando transporte</option>
          <option value="Em transporte">Em transporte</option>
          <option value="Chegou ao destino">Chegou ao destino</option>
        </Select>
        <Button colorScheme="teal" onClick={addTracking}>
          Adicionar Paciente
        </Button>
      </Box>
    </Box>
  );
};

export default RastreamentoPacientes;
