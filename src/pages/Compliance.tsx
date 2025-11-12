import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import ComingSoon from '@/components/assests/coming.svg'

const Compliance = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Compliance and Report</h1>
          <p className="text-muted-foreground">
            Regulatory compliance and audit management
          </p>
        </div>

        <Card className="p-12 text-center">
          <div className="max-w-lg mx-auto">
            <img src={ComingSoon} alt="coming soon" />
            <h2 className="text-xl font-semibold mb-2">
              Reporting module is currently under development
            </h2>
            <p className="text-muted-foreground">
              You will be able to download reports for compliance, liquidity
              analytics, and agent performance summaries.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Compliance;
