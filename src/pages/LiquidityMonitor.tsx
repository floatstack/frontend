import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { liquidAgents } from "@/lib/mockData";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getInitials } from "@/lib/utils";



const getStatusVariant = (status: string) => {
  switch (status) {
    case "Cleared":
      return "default";
    case "Low Float":
      return "secondary";
    case "Critical":
      return "destructive";
    case "Routed":
      return "outline";
    default:
      return "secondary";
  }
};

const getStatusClassName = (status: string) => {
  switch (status) {
    case "Cleared":
      return "bg-success hover:bg-success/90";
    case "Low Float":
      return "bg-warning/20 text-warning hover:bg-warning/30";
    case "Critical":
      return "bg-destructive hover:bg-destructive/90";
    case "Routed":
      return "bg-info/20 text-info hover:bg-info/30";
    default:
      return "";
  }
};

const LiquidityMonitor = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("none");
  const [isLoading, setIsLoading] = useState(false);

const parseBalance = (balance: string) =>
  parseFloat(balance.replace(/[₦,]/g, ""));

  useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);

// Derived filtered/sorted list
const filteredAgents = useMemo(() => {
  let filtered = [...liquidAgents];

  // Search by name, id, or region
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(lowerQuery) ||
        a.id.toLowerCase().includes(lowerQuery) ||
        a.region.toLowerCase().includes(lowerQuery)
    );
  }

  // Filter by status
  if (filterStatus !== "All") {
    filtered = filtered.filter((a) => a.status === filterStatus);
  }

  // Sort logic
  if (sortBy === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "balance-asc") {
    filtered.sort((a, b) => parseBalance(a.balance) - parseBalance(b.balance));
  } else if (sortBy === "balance-desc") {
    filtered.sort((a, b) => parseBalance(b.balance) - parseBalance(a.balance));
  }

  return filtered;
}, [searchQuery, filterStatus, sortBy]);


  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Liquidity Monitor</h1>
            <p className="text-muted-foreground">
              Real-time float tracking and alert management
            </p>
          </div>
          <Button>Configure Alert</Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Number of Active Agent"
                value="45,823"
                trend="10%"
              />
              <StatCard
                title="Total Network Float"
                value="45,823"
                trend="10%"
              />
              <StatCard title="Critical alert" value="45,823" trend="10%" />
              <StatCard
                title="Predicted Float Failures (Next 2 hrs)"
                value="45,823"
                trend="10%"
              />
            </div>

            <Card className="p-6">
              <div className="flex flex-wrap items-center justify-end gap-2 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search agents..."
                    className="pl-9 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select onValueChange={setFilterStatus} value={filterStatus}>
                  <SelectTrigger className="w-36">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Cleared">Cleared</SelectItem>
                    <SelectItem value="Low Float">Low Float</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Routed">Routed</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={setSortBy} value={sortBy}>
                  <SelectTrigger className="w-40">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                    <SelectItem value="balance-asc">
                      Balance (Low → High)
                    </SelectItem>
                    <SelectItem value="balance-desc">
                      Balance (High → Low)
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                        Current Float
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents?.map((agent) => (
                      <tr key={agent.id} className="border-b hover:bg-muted/50">
                        <td className="py-4 px-4 text-sm">{agent.id}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {getInitials(agent.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">
                                {agent.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {agent.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm">{agent.region}</td>
                        <td className="py-4 px-4 text-sm font-medium">
                          {agent.balance}
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={getStatusVariant(agent.status)}
                            className={getStatusClassName(agent.status)}
                          >
                            {agent.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Page 1 of {filteredAgents?.length}
                </div>
                <div className="flex items-center gap-2">
                  {[1].map((page) => (
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LiquidityMonitor;
