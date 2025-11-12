import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Download, Calendar, ChevronDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo, useState } from "react";
import { atmCenters, distributionData, regionalData } from "@/lib/mockData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



const ATMMonitor = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);

const filteredCenters = useMemo(() => {
  let centers = [...atmCenters];

  // 🔍 Filter by search term
  if (searchTerm.trim()) {
    centers = centers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // 🧩 Filter by status
  if (filterStatus) {
    centers = centers.filter((c) => c.status === filterStatus);
  }

  // 🔢 Sort
  if (sortOption === "name") {
    centers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "float") {
    centers.sort(
      (a, b) =>
        parseFloat(b.float.replace(/[₦,M]/g, "")) -
        parseFloat(a.float.replace(/[₦,M]/g, ""))
    );
  } else if (sortOption === "status") {
    centers.sort((a, b) => a.status.localeCompare(b.status));
  }

  return centers;
}, [searchTerm, filterStatus, sortOption]);


  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">ATM Monitor</h1>
          <p className="text-muted-foreground">
            Predictive analytics and regional liquidity insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total number of Active ATMs"
            value="45,823"
            trend="10%"
          />
          <StatCard title="Cumulative amount" value="45,823" trend="10%" />
          <StatCard
            title="Successful Float Pickup"
            value="45,823"
            trend="10%"
          />
          <StatCard
            title="Avg. float pickup travel distance."
            value="45,823"
            trend="10%"
          />
        </div>

        <Tabs defaultValue="regional" className="space-y-6">
          <TabsList>
            <TabsTrigger value="regional">Regional Overview</TabsTrigger>
            <TabsTrigger value="centers">
              ATM Centres{" "}
              <Badge variant="secondary" className="ml-2">
                {filteredCenters?.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="regional" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">
                    Regional Performance ( Agent )
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>1 Jan 2023 - 20 Jan 2023</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionalData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-6">
                  Agent Distribution
                </h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="10"
                      />
                      {distributionData.map((item, index) => {
                        const total = distributionData.reduce(
                          (sum, d) => sum + d.value,
                          0
                        );
                        const percentage = (item.value / total) * 100;
                        const circumference = 2 * Math.PI * 40;
                        const strokeDasharray = `${
                          (percentage / 100) * circumference
                        } ${circumference}`;
                        const previousPercentage = distributionData
                          .slice(0, index)
                          .reduce((sum, d) => sum + (d.value / total) * 100, 0);
                        const strokeDashoffset =
                          -(previousPercentage / 100) * circumference;

                        return (
                          <circle
                            key={item.name}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={item.color}
                            strokeWidth="10"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>
                <div className="space-y-3">
                  {distributionData.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">
                Regional Performance Metrics
              </h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold mb-1">Lagos State</div>
                          <div className="text-sm text-muted-foreground">
                            450 agents
                          </div>
                        </div>
                        <Badge className="bg-success/20 text-success hover:bg-success/30">
                          low risk
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-8 mt-3">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Total Float
                          </div>
                          <div className="font-semibold">₦28.5M</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Avg per Agent
                          </div>
                          <div className="font-semibold">₦63,333</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Liquidity Score
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-foreground"
                                style={{ width: "92%" }}
                              />
                            </div>
                            <span className="text-sm font-semibold">92%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Status
                          </div>
                          <div className="text-success font-semibold">
                            Healthy
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="centers">
            <Card className="p-6">
              <div className="flex flex-wrap items-center justify-end gap-2 mb-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search center or region"
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      {filterStatus || "Filter"}{" "}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilterStatus(null)}>
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus("High Demand")}
                    >
                      High Demand
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus("Medium Demand")}
                    >
                      Medium Demand
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortOption("name")}>
                      Sort by Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("float")}>
                      Sort by Float Amount
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("status")}>
                      Sort by Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Float Centers
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Region
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Available Float
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCenters?.length > 0 ? (
                      filteredCenters?.map((center) => (
                        <tr
                          key={center.id}
                          className="border-b hover:bg-muted/50"
                        >
                          <td className="py-4 px-4 text-sm">{center.id}</td>
                          <td className="py-4 px-4 text-sm font-medium">
                            {center.name}
                          </td>
                          <td className="py-4 px-4 text-sm">{center.region}</td>
                          <td className="py-4 px-4 text-sm font-medium">
                            {center.float}
                          </td>
                          <td className="py-4 px-4">
                            <Badge
                              className={
                                center.status === "High Demand"
                                  ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                                  : "bg-warning/20 text-warning hover:bg-warning/30"
                              }
                            >
                              {center.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Button
                              variant="link"
                              className="text-destructive hover:text-destructive/80"
                            >
                              View Location
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-muted-foreground"
                        >
                          No matching centers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ATMMonitor;
