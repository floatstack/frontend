// import { AgentType } from "@/types/agentTypes";

// const AGENT_STORAGE_KEY = "agents_data";

// export function getStoredAgents(): AgentType[] {
//   const stored = localStorage.getItem(AGENT_STORAGE_KEY);
//   return stored ? JSON.parse(stored) : [];
// }

// export function saveAgent(agent: AgentType) {
//   const existing = getStoredAgents();
//   existing.push(agent);
//   localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(existing));
// }

// export function setAgents(agents: AgentType[]) {
//   localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(agents));
// }

// export function clearAgents() {
//   localStorage.removeItem(AGENT_STORAGE_KEY);
// }

import { AgentType } from "@/types/agentTypes";

const AGENT_STORAGE_KEY = "agents_data";

export function getStoredAgents(): AgentType[] {
  try {
    const stored = localStorage.getItem(AGENT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveAgent(agent: AgentType) {
  const existing = getStoredAgents();
  existing.push(agent);
  localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(existing));
}

export function setAgents(agents: AgentType[]) {
  localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(agents));
}

export function clearAgents() {
  localStorage.removeItem(AGENT_STORAGE_KEY);
}
