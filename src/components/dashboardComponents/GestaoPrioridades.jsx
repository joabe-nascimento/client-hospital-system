import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Select,
  Button,
  Input,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";

const GestaoPrioridades = () => {
  const [patients, setPatients] = useState([]);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientPriority, setNewPatientPriority] = useState("Baixa");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("https://backend-hospital-system.onrender.com/api/patients");
      const patientsData = response.data;
      if (Array.isArray(patientsData)) {
        setPatients(patientsData);
      } else {
        console.error("Os dados recebidos não são um array:", patientsData);
      }
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  const handleChangePriority = async (id, newPriority) => {
    try {
      await axios.patch(`https://backend-hospital-system.onrender.com/api/patients/${id}`, {
        priority: newPriority,
      });
      fetchPatients();
    } catch (error) {
      console.error("Erro ao mudar prioridade:", error);
    }
  };

  const addPatient = async () => {
    if (newPatientName.trim() !== "") {
      const newPatient = {
        name: newPatientName,
        priority: newPatientPriority,
      };
      try {
        await axios.post("https://backend-hospital-system.onrender.com/api/patients", newPatient);
        setNewPatientName("");
        setNewPatientPriority("Baixa");
        fetchPatients();
      } catch (error) {
        console.error("Erro ao adicionar paciente:", error);
      }
    }
  };

  const removePatient = async (id) => {
    try {
      await axios.delete(`https://backend-hospital-system.onrender.com/api/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("Erro ao remover paciente:", error);
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4} color="GrayText">
        Gestão de Prioridades
      </Heading>
      <List spacing={3}>
        {Array.isArray(patients) && patients.length > 0 ? (
          patients.map((patient) => (
            <motion.div
              key={patient._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ListItem mb={2}>
                <HStack justifyContent="space-between">
                  <Text>Paciente: {patient.name}</Text>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => removePatient(patient._id)}
                  >
                    Remover
                  </Button>
                </HStack>
                <Select
                  value={patient.priority}
                  onChange={(e) =>
                    handleChangePriority(patient._id, e.target.value)
                  }
                  mt={2}
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </Select>
              </ListItem>
            </motion.div>
          ))
        ) : (
          <Text>Nenhum paciente encontrado.</Text>
        )}
      </List>
      <Box mt={6}>
        <Heading as="h3" size="md" mb={4}>
          Adicionar Novo Paciente
        </Heading>
        <Input
          placeholder="Nome do Paciente"
          value={newPatientName}
          onChange={(e) => setNewPatientName(e.target.value)}
          mb={2}
        />
        <Select
          value={newPatientPriority}
          onChange={(e) => setNewPatientPriority(e.target.value)}
          mb={2}
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </Select>
        <Button colorScheme="teal" onClick={addPatient}>
          Adicionar Paciente
        </Button>
      </Box>
    </Box>
  );
};

export default GestaoPrioridades;
