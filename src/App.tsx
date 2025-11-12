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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/agents" element={<AgentManagement />} />
          <Route path="/agents/onboard" element={<AgentOnboarding />} />
          <Route path="/liquidity" element={<LiquidityMonitor />} />
          <Route path="/atm" element={<ATMMonitor />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
