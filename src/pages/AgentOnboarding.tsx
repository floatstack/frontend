import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCheck, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StateLga from "@/lib/state&lga.json";
import { saveAgent } from "@/lib/localAgentStorage";
import { AgentType } from "@/types/agentTypes";
import { toast } from "@/hooks/use-toast";
import { generateAgentId } from "@/lib/utils";

const AgentOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingNin, setIsLoadingNin] = useState(false)
  const [isLoadingBvn, setIsLoadingBvn] = useState(false)
  const navigate = useNavigate();
  const [isVerifyNin, setIsVerifyNin] = useState(false)
  const [isVerifyBvn, setIsVerifyBvn] = useState(false)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agentId, setAgentId] = useState("");


  const steps = [
    { id: 1, title: "Basic Info", description: "" },
    {
      id: 2,
      title: "Identity Verification",
      description: "Verify agent identity",
    },
    {
      id: 3,
      title: "Risk Assessment",
      description: "Setup your customer journey flow",
    },
  ];

  const handleNext = () => {
    
    setIsLoading(true);

    if (currentStep < 3) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      }, 3000);
    } else {
      // Simulate agent creation
      const newAgent: AgentType = {
        id: "#" + Math.floor(1000 + Math.random() * 9000).toString(),
        name: fullName,
        email,
        region: `${selectedLga}, ${selectedState}`,
        balance: "₦200,000",
        status: "BALANCED",
        lastActivity: "Just now",
        joinedDate: new Date().toISOString().split("T")[0],
        phone,
        totalTransactions: 0,
        commissionEarned: "₦0.00",
        recentTransactions: [],
      };

      saveAgent(newAgent);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/agents");
      }, 2000);
    }
  };

 useEffect(() => {
   if (currentStep === 1 && !agentId) {
     const newId = generateAgentId();
     setAgentId(newId);
   }
 }, [currentStep]);

    const handleBack = () => {
      if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      Agent Onboarding
                    </h1>
                    <p className="text-muted-foreground">
                      Complete KYA/KYC verification process
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter Name"
                        className="mt-1.5"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="agentId">Agent ID</Label>
                      <Input
                        id="agentId"
                        placeholder="Enter ID"
                        className="mt-1.5"
                        value={agentId}
                        disabled
                      />
                    </div>

                    <div>
                      <Label htmlFor="terminalId">Terminal ID</Label>
                      <Input
                        id="terminalId"
                        placeholder="Enter ID"
                        className="mt-1.5"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="070xxxxxx"
                          className="mt-1.5"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Anne@example.com"
                          className="mt-1.5"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={selectedState}
                          onValueChange={(state) => {
                            setSelectedState(state);
                            setSelectedLga(""); // reset LGA
                          }}
                        >
                          <SelectTrigger className="w-full mt-1.5">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {StateLga.states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="lga">LGA</Label>
                        <Select
                          value={selectedLga}
                          onValueChange={setSelectedLga}
                          disabled={!selectedState}
                        >
                          <SelectTrigger className="w-full mt-1.5">
                            <SelectValue
                              placeholder={
                                selectedState
                                  ? "Select LGA"
                                  : "Select state first"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedState &&
                              StateLga[selectedState]?.map((lga: string) => (
                                <SelectItem key={lga} value={lga}>
                                  {lga}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder=""
                        className="mt-1.5"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Identity Verification */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      Identity Verification
                    </h1>
                    <p className="text-muted-foreground">
                      Complete KYA/KYC verification process
                    </p>
                  </div>

                  <Alert className="border-destructive/50 bg-destructive/5">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <AlertDescription className="text-foreground ml-2">
                      We'll verify your identity using BVN and NIN through
                      secure API connections to NIBSS and NIMC.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nin">NiN</Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="nin"
                          placeholder="Enter ID"
                          className="pr-20"
                        />
                        <Button
                          variant="link"
                          disabled={isLoadingNin}
                          onClick={() => {
                            setIsLoadingNin(true);
                            setTimeout(() => {
                              setIsLoadingNin(false);
                              setIsVerifyNin(true);
                            }, 3000);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:no-underline"
                        >
                          {isVerifyNin ? (
                            <CheckCheck className="text-green-500" />
                          ) : (
                            "Verify"
                          )}
                          {isLoadingNin && (
                            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bvn">BVN</Label>
                      <div className="relative mt-1.5">
                        <Input
                          id="bvn"
                          placeholder="Enter ID"
                          className="pr-20"
                        />
                        <Button
                          variant="link"
                          disabled={isLoadingBvn}
                          onClick={() => {
                            setIsLoadingBvn(true);
                            setTimeout(() => {
                              setIsLoadingBvn(false);
                              setIsVerifyBvn(true);
                            }, 3000);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:no-underline"
                        >
                          {isVerifyBvn ? (
                            <CheckCheck className="text-green-500" />
                          ) : (
                            "Verify"
                          )}

                          {isLoadingBvn && (
                            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Risk Assessment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Risk Assessment</h1>
                    <p className="text-muted-foreground">
                      Complete KYA/KYC verification process
                    </p>
                  </div>

                  <Alert className="border-destructive/50 bg-destructive/5">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <AlertDescription className="text-foreground ml-2">
                      All verification steps completed. Our risk engine is
                      analyzing the agent profile.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <span className="text-foreground">
                        Credit Bureau Check
                      </span>
                      <Badge
                        variant="default"
                        className="bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Passed
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <span className="text-foreground">
                        CBN Watchlist Screening
                      </span>
                      <Badge
                        variant="default"
                        className="bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Clear
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <span className="text-foreground">
                        Fraud History Check
                      </span>
                      <Badge
                        variant="default"
                        className="bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        No Records
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Label htmlFor="floatThreshold">
                      Initial Float Threshold
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select float threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25000">₦25,000</SelectItem>
                        <SelectItem value="50000">₦50,000</SelectItem>
                        <SelectItem value="100000">₦100,000</SelectItem>
                        <SelectItem value="200000">₦200,000</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Recommended threshold not above ₦50,000
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={isLoading}
                  onClick={handleNext}
                >
                  {currentStep === 2
                    ? "Complete Risk Check"
                    : currentStep === 3
                    ? "Complete"
                    : "Next Step"}
                  {isLoading && (
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Step Indicator */}
            <Card className="p-6">
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold flex-shrink-0 ${
                        step.id === currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.id < currentStep
                          ? "bg-success text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="pt-2">
                      <div
                        className={`font-semibold ${
                          step.id === currentStep
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </div>
                      {step.description && (
                        <div className="text-sm text-muted-foreground">
                          {step.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Need Help Card */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get to know how your campaign can reach a wider audience.
              </p>
              <Button variant="outline" className="w-full">
                Contact Us
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentOnboarding;
