import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AgentManagement from "./pages/AgentManagement";
import AgentOnboarding from "./pages/AgentOnboarding";
import LiquidityMonitor from "./pages/LiquidityMonitor";
import ATMMonitor from "./pages/ATMMonitor";
import Compliance from "./pages/Compliance";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./components/context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agents"
              element={
                <ProtectedRoute>
                  <AgentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agents/onboard"
              element={
                <ProtectedRoute>
                  <AgentOnboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/liquidity"
              element={
                <ProtectedRoute>
                  <LiquidityMonitor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atm"
              element={
                <ProtectedRoute>
                  <ATMMonitor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/compliance"
              element={
                <ProtectedRoute>
                  <Compliance />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
