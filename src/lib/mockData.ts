// import { AgentType } from "@/types/agentTypes";

// export const mockAgents: AgentType[] = [
//   {
//     id: "#1248",
//     name: "Customer Name",
//     region: "Lagos , Nigeria",
//     balance: "₦5.63M",
//     status: "Low Float",
//     lastActivity: "2 hours ago",
//   },
//   {
//     id: "#8945",
//     name: "Customer Name",
//     region: "Lagos , Nigeria",
//     balance: "₦5.63M",
//     status: "Active",
//     lastActivity: "2 hours ago",
//   },
//   {
//     id: "#8946",
//     name: "Customer Name",
//     region: "Lagos , Nigeria",
//     balance: "₦5.63M",
//     status: "Low Float",
//     lastActivity: "2 hours ago",
//   },
//   {
//     id: "#8957",
//     name: "Customer Name",
//     region: "Lagos , Nigeria",
//     balance: "₦5.63M",
//     status: "Active",
//     lastActivity: "2 hours ago",
//   },
//   {
//     id: "#2945",
//     name: "Customer Name",
//     region: "Lagos , Nigeria",
//     balance: "₦5.63M",
//     status: "Low Float",
//     lastActivity: "2 hours ago",
//   },
//   {
//     id: "#5945",
//     name: "Customer Name",
//     region: "Lagos , Nigeria",
//     balance: "₦5.63M",
//     status: "Active",
//     lastActivity: "2 hours ago",
//   },
//   {
//     id: "#2345",
//     name: "Customer Name",
//     region: "Lagos , Nigeria",
//     balance: "₦5.63M",
//     status: "Active",
//     lastActivity: "2 hours ago",
//   },
// ];


import { AgentType } from "@/types/agentTypes";

export const mockAgents: AgentType[] = [
  {
    id: "#1248",
    name: "John Doe",
    email: "john.doe@example.com",
    region: "Lagos, Nigeria",
    balance: "₦5.63M",
    status: "Low Float",
    lastActivity: "2 hours ago",
    joinedDate: "2024-08-21",
    phone: "+2348012345678",
    totalTransactions: 84,
    commissionEarned: "₦120,000",
    recentTransactions: [
      {
        id: "TXN-001",
        type: "Deposit",
        amount: "₦20,000",
        date: "2025-11-11",
        status: "Successful",
      },
      {
        id: "TXN-002",
        type: "Withdrawal",
        amount: "₦10,000",
        date: "2025-11-10",
        status: "Pending",
      },
    ],
  },
  {
    id: "#8945",
    name: "Mary Okafor",
    email: "mary.okafor@example.com",
    region: "Abuja, Nigeria",
    balance: "₦4.12M",
    status: "Active",
    lastActivity: "1 hour ago",
    joinedDate: "2024-06-10",
    phone: "+2348023345566",
    totalTransactions: 130,
    commissionEarned: "₦200,000",
    recentTransactions: [
      {
        id: "TXN-101",
        type: "Transfer",
        amount: "₦15,000",
        date: "2025-11-09",
        status: "Successful",
      },
      {
        id: "TXN-102",
        type: "Deposit",
        amount: "₦40,000",
        date: "2025-11-08",
        status: "Successful",
      },
    ],
  },
  {
    id: "#8946",
    name: "Tunde Ajayi",
    email: "tunde.ajayi@example.com",
    region: "Lagos, Nigeria",
    balance: "₦2.45M",
    status: "Low Float",
    lastActivity: "3 hours ago",
    joinedDate: "2023-12-02",
    totalTransactions: 60,
    commissionEarned: "₦90,000",
    recentTransactions: [
      {
        id: "TXN-201",
        type: "Withdrawal",
        amount: "₦25,000",
        date: "2025-11-11",
        status: "Failed",
      },
    ],
  },
  {
    id: "#8957",
    name: "Amaka Uche",
    email: "amaka.uche@example.com",
    region: "Port Harcourt, Nigeria",
    balance: "₦8.13M",
    status: "Active",
    lastActivity: "5 hours ago",
    joinedDate: "2024-02-19",
    phone: "+2348035542211",
    totalTransactions: 245,
    commissionEarned: "₦410,000",
    recentTransactions: [
      {
        id: "TXN-301",
        type: "Deposit",
        amount: "₦50,000",
        date: "2025-11-10",
        status: "Successful",
      },
    ],
  },
  {
    id: "#2945",
    name: "Bayo Fashola",
    email: "bayo.fashola@example.com",
    region: "Lagos, Nigeria",
    balance: "₦6.87M",
    status: "Low Float",
    lastActivity: "1 day ago",
    joinedDate: "2023-09-13",
    totalTransactions: 72,
    commissionEarned: "₦100,000",
  },
  {
    id: "#5945",
    name: "Chioma Nwosu",
    email: "chioma.nwosu@example.com",
    region: "Enugu, Nigeria",
    balance: "₦7.91M",
    status: "Active",
    lastActivity: "2 days ago",
    joinedDate: "2024-05-06",
    totalTransactions: 190,
    commissionEarned: "₦300,000",
  },
  {
    id: "#2345",
    name: "Kehinde Balogun",
    email: "kehinde.balogun@example.com",
    region: "Ibadan, Nigeria",
    balance: "₦3.22M",
    status: "Active",
    lastActivity: "4 hours ago",
    joinedDate: "2024-07-01",
    totalTransactions: 115,
    commissionEarned: "₦180,000",
  },
];


export const liquidAgents = [
  { id: "#1248", name: "Customer Name", region: "Lagos , Nigeria", balance: "₦5.63M", status: "Low Float" },
  { id: "#8945", name: "Customer Name", region: "Lagos , Nigeria", balance: "₦5.63M", status: "Cleared" },
  { id: "#8946", name: "Customer Name", region: "Lagos , Nigeria", balance: "₦5.63M", status: "Low Float" },
  { id: "#8957", name: "Customer Name", region: "Lagos , Nigeria", balance: "₦5.63M", status: "Critical" },
  { id: "#2945", name: "Customer Name", region: "Lagos , Nigeria", balance: "₦5.63M", status: "Routed" },
  { id: "#5945", name: "Customer Name", region: "Lagos , Nigeria", balance: "₦5.63M", status: "Cleared" },
  { id: "#2345", name: "Customer Name", region: "Lagos , Nigeria", balance: "₦5.63M", status: "Cleared" },
];

export const regionalData = [
  { name: "Lagos", value: 480 },
  { name: "Abuja", value: 460 },
  { name: "Ogun", value: 820 },
  { name: "Rivers", value: 600 },
  { name: "Enugu", value: 560 },
  { name: "Delta", value: 380 },
];

export const distributionData = [
  { name: "Lagos", value: 180, color: "hsl(38, 92%, 50%)" },
  { name: "Abuja", value: 350, color: "hsl(142, 71%, 45%)" },
  { name: "Rivers", value: 340, color: "hsl(0, 84%, 60%)" },
  { name: "Others", value: 600, color: "hsl(240, 5%, 65%)" },
];

export const atmCenters = [
  { id: "#1248", name: "Lagos Island Float Center", region: "Lagos , Nigeria", float: "₦5.63M", status: "High Demand" },
  { id: "#8945", name: "Abuja Central Hub", region: "Lagos , Nigeria", float: "₦5.63M", status: "Medium Demand" },
  { id: "#8946", name: "Kano Distribution Point", region: "Lagos , Nigeria", float: "₦5.63M", status: "High Demand" },
  { id: "#8957", name: "Lagos Island Float Center", region: "Lagos , Nigeria", float: "₦5.63M", status: "Medium Demand" },
  { id: "#2945", name: "Port Harcourt Branch", region: "Lagos , Nigeria", float: "₦5.63M", status: "Medium Demand" },
];


 export const networkData = [
  { month: "1", value: 50 },
  { month: "2", value: 80 },
 { month: "3", value: 100 },
  { month: "4", value: 120 },
  { month: "5", value: 150 },
  { month: "6", value: 180 },
  { month: "7", value: 220 },
  { month: "8", value: 280 },
  { month: "9", value: 350 },
  { month: "10", value: 500 },
  { month: "11", value: 700 },
  { month: "12", value: 900 },
];

export const atmPerformanceData = [
  { name: "Lagos", value: 480 },
  { name: "Abuja", value: 460 },
  { name: "Ogun", value: 820 },
  { name: "Rivers", value: 600 },
  { name: "Enugu", value: 560 },
  { name: "Delta", value: 380 },
];

export const burnRateData = [
  { name: "Low Risk", value: 121799, color: "hsl(142, 71%, 45%)" },
  { name: "Medium Risk", value: 66734, color: "hsl(38, 92%, 50%)" },
  { name: "High Risk", value: 21567, color: "hsl(0, 84%, 60%)" },
];