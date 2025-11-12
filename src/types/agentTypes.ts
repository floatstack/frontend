// export type AgentStatus = "Active" | "Low Float" | "Inactive";
export type AgentStatus = "All" | "Active" | "Low Float";

export interface AgentType {
  id: string; 
  name: string;
  email: string;
  region: string;
  balance: string;
  status: AgentStatus;
  lastActivity: string; 
  joinedDate?: string;
  phone?: string;
  totalTransactions?: number;
  commissionEarned?: string;
  recentTransactions?: AgentTransaction[];
}

export interface AgentTransaction {
  id: string;
  type: "Deposit" | "Withdrawal" | "Transfer";
  amount: string;
  date: string;
  status: "Successful" | "Pending" | "Failed";
}
