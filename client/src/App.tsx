import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // React router
import HomePage from "./pages/HomePage";
import "./styles/App.css";

// Initiate firebase
import "./components/firebase";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import GenericPage from "./pages/GenericPages/GenericPage";
import ContactPageBody from "./pages/GenericPages/ContactPageBody";
import NoticePageBody from "./pages/GenericPages/NoticePageBody";
import EventsPageBody from "./pages/GenericPages/EventsPageBody";
import FacultyPageBody from "./pages/GenericPages/FacultyPageBody";

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
                <GenericPage title="CONTACT" body={<ContactPageBody />} />
              }
            />
            <Route
              path="/notice"
              element={<GenericPage title="NOTICE" body={<NoticePageBody />} />}
            />
            <Route
              path="/events"
              element={<GenericPage title="EVENTS" body={<EventsPageBody />} />}
            />
            <Route
              path="/messages/principal"
              element={
                <GenericPage
                  title="PRINCIPAL'S MESSAGE"
                  body={<ContactPageBody />}
                />
              }
            />
            <Route
              path="/messages/chairman"
              element={
                <GenericPage
                  title="CHAIRMAN'S MESSAGE"
                  body={<ContactPageBody />}
                />
              }
            />
            <Route
              path="/faculty"
              element={
                <GenericPage title="FACULTY" body={<FacultyPageBody />} />
              }
            />
            {/* If any not found links are requested go to home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
