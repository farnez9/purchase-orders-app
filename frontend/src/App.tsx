import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PurchasePage from "./pages/purchase/PurchasePage";
import { SidebarProvider, SidebarTrigger } from "./components/ui/Sidebar";
import { AppSidebar } from "./components/appSidebar/AppSidebar";
import AppLayout from "./components/layout/AppLayout";
import OrdersPage from "./pages/orders/OrderPage";
import { Toaster } from "./components/ui/Toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <SidebarProvider defaultOpen={false}>
          <SidebarTrigger />
          <AppSidebar />
          <Toaster />
          <AppLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/purchase" replace />} />
              <Route path="/purchase" element={<PurchasePage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </AppLayout>
        </SidebarProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
