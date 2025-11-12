import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const networkData = [
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

const atmPerformanceData = [
  { name: "Lagos", value: 480 },
  { name: "Abuja", value: 460 },
  { name: "Ogun", value: 820 },
  { name: "Rivers", value: 600 },
  { name: "Enugu", value: 560 },
  { name: "Delta", value: 380 },
];

const burnRateData = [
  { name: "Low Risk", value: 121799, color: "hsl(142, 71%, 45%)" },
  { name: "Medium Risk", value: 66734, color: "hsl(38, 92%, 50%)" },
  { name: "High Risk", value: 21567, color: "hsl(0, 84%, 60%)" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Real time overview of your agent network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Agent" value="45,823" trend="10%" />
          <StatCard title="Total Float In Circulation" value="45,823" trend="10%" />
          <StatCard title="Agents below Float threshold" value="45,823" trend="10%" />
          <StatCard title="No of Transaction" value="45,823" trend="10%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Network Liquidity Trend</h3>
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
              <LineChart data={networkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Average Burn Rate</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(142, 71%, 45%)"
                    strokeWidth="10"
                    strokeDasharray="100 251"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(38, 92%, 50%)"
                    strokeWidth="10"
                    strokeDasharray="65 251"
                    strokeDashoffset="-100"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(0, 84%, 60%)"
                    strokeWidth="10"
                    strokeDasharray="35 251"
                    strokeDashoffset="-165"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              {burnRateData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">ATM Performance</h3>
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
              <BarChart data={atmPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Alert</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-sm mb-1">Float below threshold</div>
                    <div className="text-sm text-muted-foreground">Agent: AG-0012345</div>
                    <div className="text-sm text-muted-foreground">Ikeja,Lagos</div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>6 Jul, 2023</div>
                    <div>1:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
