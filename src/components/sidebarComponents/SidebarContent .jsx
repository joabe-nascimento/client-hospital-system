import React from "react";
import { Box, VStack, Button, Image } from "@chakra-ui/react";
import {
  MdDirectionsBus,
  MdTrackChanges,
  MdPriorityHigh,
  MdReport,
  MdLogout,
} from "react-icons/md";
import logoclinica from "../../assets/login-conta.png";

const SidebarContent = ({
  handleLogout,
  handleScheduleTransport,
  handleTrackPatients,
  handlePrioritizePatients,
  handleReportIncident,
  buttonSize,
}) => {
  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Image size="25%" src={logoclinica} mb={4} />
        <Button
          size={buttonSize}
          onClick={handleScheduleTransport}
          colorScheme="teal"
          leftIcon={<MdDirectionsBus />}
          justifyContent="flex-start"
          pl={4}
        >
          Agendamento
        </Button>
        <Button
          size={buttonSize}
          onClick={handleTrackPatients}
          colorScheme="teal"
          leftIcon={<MdTrackChanges />}
          justifyContent="flex-start"
          pl={4}
        >
          Rastreamento
        </Button>
        <Button
          size={buttonSize}
          onClick={handlePrioritizePatients}
          colorScheme="teal"
          leftIcon={<MdPriorityHigh />}
          justifyContent="flex-start"
          pl={4}
        >
          Gestão de Prioridades
        </Button>
        <Button
          size={buttonSize}
          onClick={handleReportIncident}
          colorScheme="teal"
          leftIcon={<MdReport />}
          justifyContent="flex-start"
          pl={4}
        >
          Registro de Incidentes
        </Button>
        <Button
          size={buttonSize}
          onClick={handleLogout}
          colorScheme="red"
          leftIcon={<MdLogout />}
          justifyContent="flex-start"
          pl={4}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default SidebarContent;
