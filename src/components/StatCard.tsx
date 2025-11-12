import { Card } from "./ui/card";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

const StatCard = ({ title, value, trend, trendUp = true }: StatCardProps) => {
  return (
    <Card className="p-6">
      <div className="text-sm text-muted-foreground mb-2">{title}</div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      {trend && (
        <div className="flex items-center gap-1.5 text-xs">
          <TrendingUp className={cn("w-3 h-3", trendUp ? "text-success" : "text-destructive")} />
          <span className={cn(trendUp ? "text-success" : "text-destructive")}>{trend}</span>
          <span className="text-muted-foreground">Compared to last month</span>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
