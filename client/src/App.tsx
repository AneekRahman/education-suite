import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // React router
import HomePage from "./pages/HomePage";
import "./styles/App.css";

function App() {
  return (
    <div className="App" style={{ padding: "0" }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
