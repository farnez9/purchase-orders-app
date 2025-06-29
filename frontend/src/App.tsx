import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PurchasePage from "./pages/purchase/PurchasePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/purchase" replace />} />
          <Route path="/purchase" element={<PurchasePage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
