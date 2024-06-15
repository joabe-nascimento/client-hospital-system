import React, { Component } from "react";
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

const MotionListItem = motion(ListItem);

class RastreamentoPacientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackings: [],
      newTrackingName: "",
      newTrackingStatus: "Aguardando transporte",
    };
  }

  componentDidMount() {
    this.fetchTrackings();
  }

  fetchTrackings = async () => {
    try {
      const response = await axios.get(
        "https://backend-hospital-system.onrender.com/api/trackings"
      );
      this.setState({ trackings: response.data });
    } catch (error) {
      console.error("Erro ao buscar trackings:", error);
    }
  };

  addTracking = async () => {
    const { newTrackingName, newTrackingStatus, trackings } = this.state;
    if (newTrackingName.trim() !== "") {
      const newTracking = {
        name: newTrackingName,
        status: newTrackingStatus,
      };
      try {
        const response = await axios.post(
          "https://backend-hospital-system.onrender.com/api/trackings",
          newTracking
        );
        this.setState({
          trackings: [...trackings, response.data],
          newTrackingName: "",
          newTrackingStatus: "Aguardando transporte",
        });
      } catch (error) {
        console.error("Erro ao adicionar tracking:", error);
      }
    }
  };

  updateStatus = async (id, newStatus) => {
    const { trackings } = this.state;
    try {
      await axios.patch(
        `https://backend-hospital-system.onrender.com/api/trackings/${id}`,
        {
          status: newStatus,
        }
      );
      this.setState({
        trackings: trackings.map((tracking) =>
          tracking._id === id ? { ...tracking, status: newStatus } : tracking
        ),
      });
    } catch (error) {
      console.error("Erro ao atualizar status do tracking:", error);
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { trackings, newTrackingName, newTrackingStatus } = this.state;

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
              <MotionListItem mb={2}>
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
                  onChange={(e) =>
                    this.updateStatus(tracking._id, e.target.value)
                  }
                  mt={2}
                >
                  <option value="Aguardando transporte">
                    Aguardando transporte
                  </option>
                  <option value="Em transporte">Em transporte</option>
                  <option value="Chegou ao destino">Chegou ao destino</option>
                </Select>
              </MotionListItem>
            </motion.div>
          ))}
        </List>
        <Box mt={6}>
          <Heading as="h3" size="md" mb={4}>
            Adicionar Novo Paciente
          </Heading>
          <Input
            placeholder="Nome do Paciente"
            name="newTrackingName"
            value={newTrackingName}
            onChange={this.handleChange}
            mb={2}
          />
          <Select
            name="newTrackingStatus"
            value={newTrackingStatus}
            onChange={this.handleChange}
            mb={2}
          >
            <option value="Aguardando transporte">Aguardando transporte</option>
            <option value="Em transporte">Em transporte</option>
            <option value="Chegou ao destino">Chegou ao destino</option>
          </Select>
          <Button colorScheme="teal" onClick={this.addTracking}>
            Adicionar Paciente
          </Button>
        </Box>
      </Box>
    );
  }
}

export default RastreamentoPacientes;
