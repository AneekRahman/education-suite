import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // React router
import HomePage from "./pages/HomePage";
import "./styles/App.css";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import GenericPage from "./pages/GenericPages/GenericPage";
import ContactPageBody from "./pages/GenericPages/ContactPageBody";

function App() {
  return (
    <ChakraProvider>
      <div className="App" style={{ padding: "0" }}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/contact"
              element={
                <GenericPage title="HELLOOOO" body={<ContactPageBody />} />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
