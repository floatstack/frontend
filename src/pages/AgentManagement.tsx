import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, ChevronDown, Eye, X, MapPin, Mail, DollarSign, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockAgents } from "@/lib/mockData";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { AgentStatus, AgentType } from "@/types/agentTypes";



const AgentManagement = () => {
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState<AgentStatus>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "region" | "balance">(
    "name"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);

  const filteredAgents = useMemo(() => {
    let result = [...mockAgents];

    // Filter by status
    if (statusFilter !== "All") {
      result = result?.filter((agent) => agent?.status === statusFilter);
    }

    // Search by name or region
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (agent) =>
          agent?.name?.toLowerCase()?.includes(term) ||
          agent?.region?.toLowerCase()?.includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "balance") {
        const parseBalance = (str: string) =>
          parseFloat(str.replace(/[₦,M]/g, "")) *
          (str.includes("M") ? 1_000_000 : 1);
        
        valA = String(parseBalance(a.balance));
        valB = String(parseBalance(b.balance));
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [statusFilter, searchTerm, sortField, sortOrder]);

  // --- Handlers ---
  const handleSortChange = (field: "name" | "region" | "balance") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Agent Management</h1>
            <p className="text-muted-foreground">
              Manage and monitor all registered agents
            </p>
          </div>
          <Button onClick={() => navigate("/agents/onboard")}>
            <Plus className="w-4 h-4 mr-2" />
            New Agent
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {["All", "Active", "Low Float"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  className={
                    statusFilter === status ? "bg-primary text-white" : ""
                  }
                  onClick={() => setStatusFilter(status as AgentStatus)}
                >
                  {status}
                  <Badge variant="secondary" className="ml-2">
                    {
                      mockAgents.filter((a) =>
                        status === "All" ? true : a.status === status
                      ).length
                    }
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="ml-auto flex flex-col sm:flex-row  items-center gap-2">
              <div className="relative ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  className="pl-9 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSortChange("name")}
                className="w-full"
              >
                Sort by {sortField}{" "}
                <ChevronDown
                  className={`ml-2 w-4 h-4 transform ${
                    sortOrder === "desc" ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Agent ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Region
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Float Balance
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Last Activity
                  </th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents?.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 px-4 text-center">
                      No agents found
                    </td>
                  </tr>
                )}

                {filteredAgents?.map((agent) => (
                  <tr key={agent.id} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 text-sm">{agent.id}</td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-sm">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Email
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">{agent.region}</td>
                    <td className="py-4 px-4 text-sm font-medium">
                      {agent.balance}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          agent.status === "Active" ? "default" : "secondary"
                        }
                        className={
                          agent.status === "Active"
                            ? "bg-success hover:bg-success/90"
                            : "bg-warning/20 text-warning hover:bg-warning/30"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {agent.lastActivity}
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        onClick={() => setSelectedAgent(agent)}
                        variant="ghost"
                        size="sm"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">Page 1 of 30</div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {selectedAgent && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedAgent(null)}
            />
            <div className="fixed right-0 top-0 w-full sm:w-[400px] h-full bg-white shadow-lg z-50 flex flex-col animate-slide-in">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Agent Details</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedAgent(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedAgent.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAgent.id}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {selectedAgent.region}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  agent@email.com
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{selectedAgent.balance}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {selectedAgent.lastActivity}
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-1">
                    Current Status:
                  </p>
                  <Badge
                    className={cn(
                      "px-3 py-1 text-sm",
                      selectedAgent.status === "Active"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    )}
                  >
                    {selectedAgent.status}
                  </Badge>
                </div>
              </div>

              <div className="p-4 border-t flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedAgent(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgentManagement;
