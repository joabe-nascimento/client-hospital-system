import React, { Component } from "react";
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

class GestaoPrioridades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      newPatientName: "",
      newPatientPriority: "Baixa",
    };
  }

  componentDidMount() {
    this.fetchPatients();
  }
  fetchPatients = async () => {
    try {
      const response = await axios.get(
        " https://backend-hospital-system-61pw.onrender.com/api/patients"
      );
      if (Array.isArray(response.data)) {
        this.setState({ patients: response.data });
      } else {
        console.error("Os dados recebidos não são um array:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  };

  handleChangePriority = async (id, newPriority) => {
    try {
      await axios.patch(
        ` https://backend-hospital-system-61pw.onrender.com/api/patients/${id}`,
        {
          priority: newPriority,
        }
      );
      this.fetchPatients();
    } catch (error) {
      console.error("Erro ao mudar prioridade:", error);
    }
  };

  addPatient = async () => {
    const { newPatientName, newPatientPriority } = this.state;
    if (newPatientName.trim() !== "") {
      const newPatient = {
        name: newPatientName,
        priority: newPatientPriority,
      };
      try {
        await axios.post(
          " https://backend-hospital-system-61pw.onrender.com/api/patients",
          newPatient
        );
        this.setState({ newPatientName: "", newPatientPriority: "Baixa" });
        this.fetchPatients();
      } catch (error) {
        console.error("Erro ao adicionar paciente:", error);
      }
    }
  };

  removePatient = async (id) => {
    try {
      await axios.delete(
        ` https://backend-hospital-system-61pw.onrender.com/api/patients/${id}`
      );
      this.fetchPatients();
    } catch (error) {
      console.error("Erro ao remover paciente:", error);
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { patients, newPatientName, newPatientPriority } = this.state;

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
                        this.handleChangePriority(patient._id, e.target.value)
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
                    onClick={() => this.removePatient(patient._id)}
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
        <Box mt={6}>
          <Heading as="h3" size="md" mb={4}>
            Adicionar Novo Paciente
          </Heading>
          <Input
            placeholder="Nome do Paciente"
            name="newPatientName"
            value={newPatientName}
            onChange={this.handleChange}
            mb={2}
          />
          <Select
            name="newPatientPriority"
            value={newPatientPriority}
            onChange={this.handleChange}
            mb={2}
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </Select>
          <Button colorScheme="teal" onClick={this.addPatient}>
            Adicionar Paciente
          </Button>
        </Box>
      </Box>
    );
  }
}

export default GestaoPrioridades;
