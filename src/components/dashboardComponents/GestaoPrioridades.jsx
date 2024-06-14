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

const MotionListItem = motion(ListItem);

const GestaoPrioridades = () => {
  const [patients, setPatients] = useState([]);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientPriority, setNewPatientPriority] = useState("Baixa");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "https://backend-hospital-system.onrender.com/api/patients"
      );
      if (Array.isArray(response.data)) {
        setPatients(response.data);
      } else {
        console.error("Os dados recebidos não são um array:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  const handleChangePriority = async (id, newPriority) => {
    try {
      await axios.patch(
        `https://backend-hospital-system.onrender.com/api/patients/${id}`,
        {
          priority: newPriority,
        }
      );
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
        await axios.post(
          "https://backend-hospital-system.onrender.com/api/patients",
          newPatient
        );
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
      await axios.delete(
        `https://backend-hospital-system.onrender.com/api/patients/${id}`
      );
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
            <MotionListItem
              key={patient._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HStack justifyContent="space-between">
                <Box>
                  <Text>Paciente: {patient.name}</Text>
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
                </Box>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => removePatient(patient._id)}
                >
                  Remover
                </Button>
              </HStack>
            </MotionListItem>
          ))
        ) : (
          <Text>Nenhum paciente encontrado.</Text>
        )}
      </List>
      {/* <Box mt={6}>
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
      </Box> */}
    </Box>
  );
};

export default GestaoPrioridades;
