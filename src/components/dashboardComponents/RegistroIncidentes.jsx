import React, { Component } from "react";
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

const MotionListItem = motion(ListItem);

class RegistroIncidentes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents: [],
      newIncident: "",
      registeredBy: "",
    };
  }

  componentDidMount() {
    this.fetchIncidents();
  }

  fetchIncidents = async () => {
    try {
      const response = await axios.get(
        "https://backend-hospital-system.onrender.com/api/incidents"
      );
      this.setState({ incidents: response.data });
    } catch (error) {
      console.error("Erro ao buscar incidentes:", error);
    }
  };

  handleAddIncident = async () => {
    const { newIncident, registeredBy, incidents } = this.state;
    if (newIncident.trim() !== "" && registeredBy.trim() !== "") {
      try {
        const response = await axios.post(
          "https://backend-hospital-system.onrender.com/api/incidents",
          {
            description: newIncident,
            registeredBy,
          }
        );
        this.setState({
          incidents: [...incidents, response.data],
          newIncident: "",
          registeredBy: "",
        });
      } catch (error) {
        console.error("Erro ao adicionar incidente:", error);
      }
    }
  };

  handleRemoveIncident = async (id) => {
    const { incidents } = this.state;
    try {
      await axios.delete(
        `https://backend-hospital-system.onrender.com/api/incidents/${id}`
      );
      this.setState({
        incidents: incidents.filter((incident) => incident._id !== id),
      });
    } catch (error) {
      console.error("Erro ao remover incidente:", error);
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { incidents, newIncident, registeredBy } = this.state;

    return (
      <Box>
        <Heading as="h2" size="lg" mb={4} color="GrayText">
          Registro de Incidentes
        </Heading>
        <Input
          name="registeredBy"
          value={registeredBy}
          onChange={this.handleChange}
          placeholder="Nome da pessoa que registrou"
          mb={4}
          size="md"
        />
        <Textarea
          name="newIncident"
          value={newIncident}
          onChange={this.handleChange}
          placeholder="Descreva o incidente..."
          mb={4}
          size="md"
        />
        <Button onClick={this.handleAddIncident} colorScheme="blue" mb={4}>
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
              <MotionListItem>
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
                    onClick={() => this.handleRemoveIncident(incident._id)}
                  />
                </HStack>
              </MotionListItem>
            </motion.div>
          ))}
        </List>
      </Box>
    );
  }
}

export default RegistroIncidentes;
