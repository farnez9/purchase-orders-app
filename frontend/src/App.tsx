import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PurchasePage from "./pages/purchase/PurchasePage";
import { SidebarProvider, SidebarTrigger } from "./components/ui/Sidebar";
import { AppSidebar } from "./components/appSidebar/AppSidebar";
import AppLayout from "./components/layout/AppLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SidebarProvider defaultOpen={false}>
          <SidebarTrigger />
          <AppSidebar />
          <AppLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/purchase" replace />} />
              <Route path="/purchase" element={<PurchasePage />} />
            </Routes>
          </AppLayout>
        </SidebarProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
