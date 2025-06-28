import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import PurchasePage from "./pages/purchase/PurchasePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/purchase" replace />} />
        <Route path="/purchase" element={<PurchasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
