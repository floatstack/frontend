

import { axiosInstance } from "@/lib/axiosInstanct";
import { getStoredAgents, setAgents } from "@/lib/localAgentStorage";
import { AgentType, BackendAgent, BackendAgentResponse } from "@/types/agentTypes";
import { useQuery } from "@tanstack/react-query";

// Convert backend API structure → AgentType
export const transformAgent = (agent: BackendAgent): AgentType => {
  return {
    id: agent.agent_id,
    name: agent.full_name,
    email: agent.email,
    region: agent.region ?? "",
    balance: `₦${agent.e_float.toLocaleString()}`,
    status: agent.status,
    lastActivity: new Date(agent.last_activity).toLocaleString(),

    // optional local fields
    joinedDate: new Date().toISOString(),
    phone: "",
    totalTransactions: 0,
    commissionEarned: "₦0",
    recentTransactions: [],
  };
};

// Merge backend + local without losing local custom fields
export const mergeAgents = (
  backend: AgentType[],
  local: AgentType[]
): AgentType[] => {
  const merged: AgentType[] = [];
  const localMap = new Map(local.map((a) => [a.id, a]));

  backend.forEach((backendAgent) => {
    const localMatch = localMap.get(backendAgent.id);

    if (localMatch) {
      merged.push({
        ...localMatch,
        ...backendAgent
      });

      localMap.delete(backendAgent.id);
    } else {
      merged.push(backendAgent);
    }
  });

  // Add local-only agents
  merged.push(...Array.from(localMap.values()));

  return merged;
};

// React Query hook
export const useFetchAgent = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/dashboard/agents`);
      return response.data as BackendAgentResponse;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
};
