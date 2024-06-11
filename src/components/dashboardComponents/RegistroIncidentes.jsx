import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Textarea,
  Button,
  List,
  ListItem,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import moment from "moment";

const RegistroIncidentes = () => {
  const [incidents, setIncidents] = useState([]);
  const [newIncident, setNewIncident] = useState("");
  const [registeredBy, setRegisteredBy] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/incidents");
        setIncidents(response.data);
      } catch (error) {
        console.error("Erro ao buscar incidentes:", error);
      }
    };
    fetchIncidents();
  }, []);

  const handleAddIncident = async () => {
    if (newIncident.trim() !== "" && registeredBy.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/incidents",
          {
            description: newIncident,
            registeredBy,
          }
        );
        setIncidents([...incidents, response.data]);
        setNewIncident("");
        setRegisteredBy("");
      } catch (error) {
        console.error("Erro ao adicionar incidente:", error);
      }
    }
  };

  const handleRemoveIncident = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/incidents/${id}`);
      setIncidents(incidents.filter((incident) => incident._id !== id));
    } catch (error) {
      console.error("Erro ao remover incidente:", error);
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4} color="GrayText">
        Registro de Incidentes
      </Heading>
      <Input
        value={registeredBy}
        onChange={(e) => setRegisteredBy(e.target.value)}
        placeholder="Nome da pessoa que registrou"
        mb={4}
        size="md"
      />
      <Textarea
        value={newIncident}
        onChange={(e) => setNewIncident(e.target.value)}
        placeholder="Descreva o incidente..."
        mb={4}
        size="md"
      />
      <Button onClick={handleAddIncident} colorScheme="blue" mb={4}>
        Registrar Incidente
      </Button>
      <List spacing={3}>
        {incidents.map((incident) => (
          <motion.div
            key={incident._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ListItem>
              <HStack justifyContent="space-between">
                <Box>
                  <strong>Descrição:</strong> {incident.description} <br />
                  <strong>Registrado por:</strong> {incident.registeredBy}{" "}
                  <br />
                  <strong>Publicado em:</strong>{" "}
                  {moment(incident.createdAt).format("DD/MM/YYYY HH:mm")}
                </Box>
                <IconButton
                  aria-label="Remover incidente"
                  icon={<CloseIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleRemoveIncident(incident._id)}
                />
              </HStack>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Box>
  );
};

export default RegistroIncidentes;
