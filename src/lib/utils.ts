import { AgentType } from "@/types/agentTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// export function transformBackendAgent(agent: any): AgentType {
//   return {
//     id: agent.agent_id,
//     name: agent.full_name,
//     email: agent.email,
//     region: agent.region ?? "Unassigned",
//     balance: `₦${agent.e_float.toLocaleString()}`,
//     status: agent.status,
//     lastActivity: agent.last_activity,
//     joinedDate: new Date().toISOString(), // placeholder (dummy)
//     commissionEarned: "₦0", // placeholder
//     totalTransactions: 0,
//     recentTransactions: [],
//   };
// }


export function generateAgentId(): string {
  const lastId = localStorage.getItem("last_agent_id");

  let nextNumber = 1;

  if (lastId) {
    const num = parseInt(lastId.split("-").pop() || "0", 10);
    nextNumber = num + 1;
  }

  const padded = nextNumber.toString().padStart(4, "0");
  const newId = `GTB-AG-${padded}`;

  localStorage.setItem("last_agent_id", newId);

  return newId;
}


export function getInitials(name: string = ""): string {
  if (!name.trim()) return "";

  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0][0].toUpperCase(); // Single name: "Tunde" → "T"
  }

  return (parts[0][0] + parts[1][0]).toUpperCase(); // "Tunde Alabi" → "TA"
}
