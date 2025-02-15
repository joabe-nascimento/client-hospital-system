import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Signin from "./components/Signin/index";
import Signup from "./components/Signup/index";
import Dashboard from "./pages/Dashboard/index";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
