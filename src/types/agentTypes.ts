export type AgentStatus = "All" | "Active" | "LOW_E_FLOAT" | "CASH_RICH" | "BALANCED"
// export type AgentStatus = "All" | "Active" | "Low Float";


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


export interface BackendAgent {
  agent_id: string;
  full_name: string;
  email: string;
  region: string | null;
  e_float: number;
  assigned_limit: number;
  status: "LOW_E_FLOAT" | "CASH_RICH" | "BALANCED";
  confidence: number;
  last_activity: string;
  location: string | null;
}

export interface BackendPagination {
  page: number;
  limit: number;
  total: number;
}

export interface BackendAgentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: BackendAgent[];
    pagination: BackendPagination;
  };
}
