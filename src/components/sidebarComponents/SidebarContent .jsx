import React from "react";
import {
  Box,
  VStack,
  Button,
  Center,
  Heading,
  useColorMode,
  useColorModeValue,
  Switch,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  MdDirectionsBus,
  MdTrackChanges,
  MdPriorityHigh,
  MdReport,
  MdLogout,
  MdWbSunny,
  MdNightlightRound,
} from "react-icons/md";
import { motion } from "framer-motion";

const SidebarContent = ({
  handleLogout,
  handleScheduleTransport,
  handleTrackPatients,
  handlePrioritizePatients,
  handleReportIncident,
  buttonSize,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const btnBg = useColorModeValue("gray.100", "gray.700");
  const btnHoverBg = useColorModeValue("teal.600", "teal.300");
  const btnActiveBg = useColorModeValue("teal.700", "teal.400");
  const btnColor = useColorModeValue("teal.500", "teal.200");
  const btnShadow = useColorModeValue(
    "0 4px 6px rgba(0, 0, 0, 0.1)",
    "0 4px 6px rgba(0, 0, 0, 0.3)"
  );
  const sidebarBg = useColorModeValue("white", "gray.800");

  const MotionIcon = motion(Icon);

  return (
    <Box p={4} bg={sidebarBg} height="100vh" position="relative">
      <VStack spacing={4} align="stretch">
        <Center>
          <Heading
            as="h2"
            fontSize="4xl"
            fontFamily="Poppins, sans-serif"
            mb={4}
          >
            Prosel
          </Heading>
        </Center>
        <Button
          size={buttonSize}
          onClick={handleScheduleTransport}
          bg={btnBg}
          color={btnColor}
          leftIcon={<MdDirectionsBus />}
          justifyContent="flex-start"
          pl={4}
          borderRadius="lg"
          boxShadow={btnShadow}
          _hover={{
            bg: btnHoverBg,
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
            svg: { color: "white" },
          }}
          _active={{ bg: btnActiveBg, transform: "translateY(0)" }}
          transition="all 0.2s"
        >
          Agendamento
        </Button>
        <Button
          size={buttonSize}
          onClick={handleTrackPatients}
          bg={btnBg}
          color={btnColor}
          leftIcon={<MdTrackChanges />}
          justifyContent="flex-start"
          pl={4}
          borderRadius="lg"
          boxShadow={btnShadow}
          _hover={{
            bg: btnHoverBg,
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
            svg: { color: "white" },
          }}
          _active={{ bg: btnActiveBg, transform: "translateY(0)" }}
          transition="all 0.2s"
        >
          Rastreamento
        </Button>
        <Button
          size={buttonSize}
          onClick={handlePrioritizePatients}
          bg={btnBg}
          color={btnColor}
          leftIcon={<MdPriorityHigh />}
          justifyContent="flex-start"
          pl={4}
          borderRadius="lg"
          boxShadow={btnShadow}
          _hover={{
            bg: btnHoverBg,
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
            svg: { color: "white" },
          }}
          _active={{ bg: btnActiveBg, transform: "translateY(0)" }}
          transition="all 0.2s"
        >
          Gestão de Prioridades
        </Button>
        <Button
          size={buttonSize}
          onClick={handleReportIncident}
          bg={btnBg}
          color={btnColor}
          leftIcon={<MdReport />}
          justifyContent="flex-start"
          pl={4}
          borderRadius="lg"
          boxShadow={btnShadow}
          _hover={{
            bg: btnHoverBg,
            color: "white",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
            svg: { color: "white" },
          }}
          _active={{ bg: btnActiveBg, transform: "translateY(0)" }}
          transition="all 0.2s"
        >
          Registro de Incidentes
        </Button>
        <Button
          size={buttonSize}
          onClick={handleLogout}
          bg="red.500"
          color="white"
          leftIcon={<MdLogout />}
          justifyContent="flex-start"
          pl={4}
          borderRadius="lg"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          _hover={{
            bg: "red.600",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
            svg: { color: "white" },
          }}
          _active={{ bg: "red.700", transform: "translateY(0)" }}
          transition="all 0.2s"
        >
          Logout
        </Button>
        <Box
          mt="auto"
          pt={4}
          pb={2}
          position="absolute"
          bottom="4"
          width="100%"
        >
          <HStack spacing={2} justifyContent="center">
            <MotionIcon
              as={colorMode === "light" ? MdWbSunny : MdNightlightRound}
              boxSize={6}
              color={colorMode === "light" ? "yellow.500" : "purple.500"}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
              sx={{
                "span.chakra-switch__track": {
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                },
              }}
            />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SidebarContent;
