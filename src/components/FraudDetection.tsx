
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ShieldCheck, AlertTriangle, Upload, Layers, BadgeAlert } from "lucide-react";
import { api, Transaction, FraudReportingRequest } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

const FraudDetection = () => {
  const [transactionData, setTransactionData] = useState<Partial<Transaction>>({
    transaction_id: "",
    transaction_amount: undefined,
    transaction_channel: "",
    payer_email: "",
    payer_device: "",
  });
  
  const [batchTransactions, setBatchTransactions] = useState<string>("");
  
  const [reportData, setReportData] = useState<FraudReportingRequest>({
    transaction_id: "",
    reporting_entity_id: "",
    fraud_details: "",
  });
  
  // Single transaction fraud detection
  const detectMutation = useMutation({
    mutationFn: (transaction: Partial<Transaction>) => api.detectFraud(transaction),
    onSuccess: (data) => {
      toast({
        title: "Fraud Detection Complete",
        description: data.is_fraud 
          ? "This transaction has been flagged as potentially fraudulent."
          : "This transaction appears to be legitimate.",
        variant: data.is_fraud ? "destructive" : "default",
      });
    },
  });
  
  // Batch transaction fraud detection
  const batchMutation = useMutation({
    mutationFn: (transactions: Partial<Transaction>[]) => api.detectFraudBatch(transactions),
    onSuccess: (data) => {
      toast({
        title: "Batch Processing Complete",
        description: `Processed ${Object.keys(data).length} transactions.`,
      });
    },
  });
  
  // Fraud reporting
  const reportMutation = useMutation({
    mutationFn: (report: FraudReportingRequest) => api.reportFraud(report),
    onSuccess: (data) => {
      if (data.reporting_acknowledged) {
        toast({
          title: "Fraud Report Submitted",
          description: "Your fraud report has been successfully recorded.",
        });
        // Reset form
        setReportData({
          transaction_id: "",
          reporting_entity_id: "",
          fraud_details: "",
        });
      } else {
        toast({
          title: "Reporting Failed",
          description: `Failed to submit report. Error code: ${data.failure_code}`,
          variant: "destructive",
        });
      }
    },
  });
  
  const handleDetect = () => {
    if (!transactionData.transaction_id) {
      toast({
        title: "Missing Information",
        description: "Transaction ID is required.",
        variant: "destructive",
      });
      return;
    }
    
    detectMutation.mutate(transactionData);
  };
  
  const handleBatchDetect = () => {
    try {
      let transactions: Partial<Transaction>[] = [];
      
      // Try to parse as JSON array
      try {
        transactions = JSON.parse(batchTransactions);
        if (!Array.isArray(transactions)) {
          transactions = [transactions];
        }
      } catch (err) {
        // If not valid JSON, try parsing as newline-separated JSON objects
        transactions = batchTransactions
          .split("\n")
          .filter(line => line.trim())
          .map(line => JSON.parse(line));
      }
      
      if (!transactions.length) {
        throw new Error("No valid transactions found");
      }
      
      batchMutation.mutate(transactions);
    } catch (error) {
      toast({
        title: "Invalid Input",
        description: "Please provide valid JSON transaction data.",
        variant: "destructive",
      });
    }
  };
  
  const handleReport = () => {
    if (!reportData.transaction_id || !reportData.reporting_entity_id) {
      toast({
        title: "Missing Information",
        description: "Transaction ID and Reporting Entity ID are required.",
        variant: "destructive",
      });
      return;
    }
    
    reportMutation.mutate(reportData);
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Fraud Management</CardTitle>
        <CardDescription>
          Detect potential fraud in transactions and report confirmed fraud cases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="detect" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detect">
              <div className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
                <span>Detect</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="batch">
              <div className="flex items-center">
                <Layers className="mr-2 h-4 w-4" />
                <span>Batch</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="report">
              <div className="flex items-center">
                <BadgeAlert className="mr-2 h-4 w-4" />
                <span>Report</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          {/* Detect Tab */}
          <TabsContent value="detect" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transaction_id">Transaction ID *</Label>
                <Input
                  id="transaction_id"
                  placeholder="Enter transaction ID"
                  value={transactionData.transaction_id}
                  onChange={(e) => setTransactionData({ ...transactionData, transaction_id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={transactionData.transaction_amount || ""}
                  onChange={(e) => setTransactionData({ ...transactionData, transaction_amount: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel">Channel</Label>
                <Input
                  id="channel"
                  placeholder="web, mobile, pos, atm"
                  value={transactionData.transaction_channel || ""}
                  onChange={(e) => setTransactionData({ ...transactionData, transaction_channel: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payer_email">Payer Email</Label>
                <Input
                  id="payer_email"
                  type="email"
                  placeholder="Enter payer email"
                  value={transactionData.payer_email || ""}
                  onChange={(e) => setTransactionData({ ...transactionData, payer_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payer_device">Payer Device</Label>
                <Input
                  id="payer_device"
                  placeholder="Enter device ID"
                  value={transactionData.payer_device || ""}
                  onChange={(e) => setTransactionData({ ...transactionData, payer_device: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                onClick={handleDetect} 
                className="w-full"
                disabled={detectMutation.isPending}
              >
                {detectMutation.isPending ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Detect Fraud
                  </span>
                )}
              </Button>
            </div>
            
            {detectMutation.isSuccess && (
              <div className="mt-4 p-4 rounded-md border border-border">
                <div className="flex items-start">
                  {detectMutation.data.is_fraud ? (
                    <AlertTriangle className="mt-1 mr-2 h-5 w-5 text-destructive" />
                  ) : (
                    <ShieldCheck className="mt-1 mr-2 h-5 w-5 text-green-500" />
                  )}
                  <div>
                    <h3 className="font-medium">
                      {detectMutation.data.is_fraud ? "Potential Fraud Detected" : "No Fraud Detected"}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {detectMutation.data.is_fraud 
                        ? `Reason: ${detectMutation.data.fraud_reason}` 
                        : "This transaction appears to be legitimate."}
                    </p>
                    <p className="text-sm mt-1">
                      <span className="text-muted-foreground">Fraud Score:</span>{" "}
                      <span className={detectMutation.data.is_fraud ? "text-destructive" : "text-green-500"}>
                        {(detectMutation.data.fraud_score * 100).toFixed(2)}%
                      </span>
                    </p>
                    <p className="text-sm mt-1">
                      <span className="text-muted-foreground">Source:</span>{" "}
                      <span className="text-foreground/70">
                        {detectMutation.data.fraud_source === "rule" ? "Rule Engine" : "AI Model"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Batch Tab */}
          <TabsContent value="batch" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batch-data">Transaction Data (JSON)</Label>
              <Textarea
                id="batch-data"
                placeholder="Paste JSON transaction data (array or newline-separated objects)"
                rows={8}
                value={batchTransactions}
                onChange={(e) => setBatchTransactions(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <Button 
              onClick={handleBatchDetect} 
              className="w-full"
              disabled={batchMutation.isPending}
            >
              {batchMutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Batch...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" />
                  Process Batch
                </span>
              )}
            </Button>
            
            {batchMutation.isSuccess && (
              <div className="mt-4 p-4 rounded-md border border-border">
                <h3 className="font-medium mb-2">Batch Results</h3>
                <div className="max-h-48 overflow-y-auto rounded-md border border-border">
                  <pre className="text-xs p-3 overflow-x-auto">
                    {JSON.stringify(batchMutation.data, null, 2)}
                  </pre>
                </div>
                <p className="text-sm mt-2 text-foreground/70">
                  Processed {Object.keys(batchMutation.data).length} transactions.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Report Tab */}
          <TabsContent value="report" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-transaction-id">Transaction ID *</Label>
              <Input
                id="report-transaction-id"
                placeholder="Enter transaction ID"
                value={reportData.transaction_id}
                onChange={(e) => setReportData({ ...reportData, transaction_id: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reporting-entity">Reporting Entity ID *</Label>
              <Input
                id="reporting-entity"
                placeholder="Enter your entity ID"
                value={reportData.reporting_entity_id}
                onChange={(e) => setReportData({ ...reportData, reporting_entity_id: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fraud-details">Fraud Details</Label>
              <Textarea
                id="fraud-details"
                placeholder="Provide details about the fraudulent transaction"
                rows={4}
                value={reportData.fraud_details}
                onChange={(e) => setReportData({ ...reportData, fraud_details: e.target.value })}
              />
            </div>
            <Button 
              onClick={handleReport} 
              variant="destructive"
              className="w-full"
              disabled={reportMutation.isPending}
            >
              {reportMutation.isPending ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Fraud
                </span>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FraudDetection;
