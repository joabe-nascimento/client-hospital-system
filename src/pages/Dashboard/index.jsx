import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  HStack,
  IconButton,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import SidebarContent from "../../components/sidebarComponents/SidebarContent ";
import AgendamentoTransporte from "../../components/dashboardComponents/AgendamentoTransporte";
import RastreamentoPacientes from "../../components/dashboardComponents/RastreamentoPacientes";
import GestaoPrioridades from "../../components/dashboardComponents/GestaoPrioridades";
import RegistroIncidentes from "../../components/dashboardComponents/RegistroIncidentes";

const MotionBox = motion(Box);

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUser(userData);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleScheduleTransport = () =>
    setSelectedComponent("AgendamentoTransporte");
  const handleTrackPatients = () =>
    setSelectedComponent("RastreamentoPacientes");
  const handlePrioritizePatients = () =>
    setSelectedComponent("GestaoPrioridades");
  const handleReportIncident = () => setSelectedComponent("RegistroIncidentes");
  const handleLogout = () => {
    localStorage.removeItem("userData");
    toast({
      title: "Logout successful.",
      description: "You have logged out successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/signin");
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "AgendamentoTransporte":
        return <AgendamentoTransporte />;
      case "RastreamentoPacientes":
        return <RastreamentoPacientes />;
      case "GestaoPrioridades":
        return <GestaoPrioridades />;
      case "RegistroIncidentes":
        return <RegistroIncidentes />;
      default:
        return (
          <Text fontSize="md">
            Selecione uma funcionalidade no menu à esquerda.
          </Text>
        );
    }
  };

  return (
    <HStack
      spacing={0}
      mt={{ base: "50px", md: "0px" }}
      align="flex-start"
      w="100%"
      h="100vh"
    >
      {isMobile ? (
        <>
          <IconButton
            icon={<MdMenu />}
            aria-label="Open menu"
            onClick={onOpen}
            position="fixed"
            top={4}
            left={4}
            zIndex={10}
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            transition="background-color 0.2s"
          />
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <SidebarContent
                handleLogout={handleLogout}
                handleScheduleTransport={handleScheduleTransport}
                handleTrackPatients={handleTrackPatients}
                handlePrioritizePatients={handlePrioritizePatients}
                handleReportIncident={handleReportIncident}
                buttonSize={buttonSize}
                user={user}
              />
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Box position="fixed" w="250px" h="100vh" bg="gray.100" boxShadow="md">
          <SidebarContent
            handleLogout={handleLogout}
            handleScheduleTransport={handleScheduleTransport}
            handleTrackPatients={handleTrackPatients}
            handlePrioritizePatients={handlePrioritizePatients}
            handleReportIncident={handleReportIncident}
            buttonSize={buttonSize}
            user={user}
          />
        </Box>
      )}

      <MotionBox
        ml={{ base: 0, md: "250px" }}
        p={6}
        w="full"
        h="full"
        overflowY="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Flex justify="space-between" align="center" color="WhiteText">
          <Heading as="h1" size="xl" mb={4} fontWeight="800">
            Hospital Geral Cleriston Andrade
          </Heading>
        </Flex>
        <Divider mb={4} />
        <Heading as="h2" size="lg" mb={4} fontWeight="400" color="GrayText">
          Funcionalidades Principais
        </Heading>
        {renderComponent()}
      </MotionBox>
    </HStack>
  );
};

export default Dashboard;
