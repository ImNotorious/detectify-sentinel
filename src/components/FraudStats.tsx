
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Sample data - would come from your API in a real app
const channelData = [
  { name: "Web", predictedFrauds: 65, reportedFrauds: 48 },
  { name: "Mobile", predictedFrauds: 45, reportedFrauds: 37 },
  { name: "POS", predictedFrauds: 20, reportedFrauds: 12 },
  { name: "ATM", predictedFrauds: 30, reportedFrauds: 25 },
];

const paymentModeData = [
  { name: "Card", predictedFrauds: 80, reportedFrauds: 70 },
  { name: "UPI", predictedFrauds: 35, reportedFrauds: 28 },
  { name: "NEFT", predictedFrauds: 15, reportedFrauds: 10 },
  { name: "RTGS", predictedFrauds: 10, reportedFrauds: 8 },
  { name: "IMPS", predictedFrauds: 25, reportedFrauds: 18 },
];

const bankData = [
  { name: "HDFC", predictedFrauds: 40, reportedFrauds: 32 },
  { name: "ICICI", predictedFrauds: 30, reportedFrauds: 24 },
  { name: "SBI", predictedFrauds: 45, reportedFrauds: 38 },
  { name: "Axis", predictedFrauds: 25, reportedFrauds: 19 },
  { name: "Kotak", predictedFrauds: 15, reportedFrauds: 12 },
];

const payerData = [
  { name: "User1", predictedFrauds: 5, reportedFrauds: 4 },
  { name: "User2", predictedFrauds: 8, reportedFrauds: 7 },
  { name: "User3", predictedFrauds: 12, reportedFrauds: 10 },
  { name: "User4", predictedFrauds: 3, reportedFrauds: 2 },
  { name: "User5", predictedFrauds: 6, reportedFrauds: 5 },
];

const payeeData = [
  { name: "Merchant1", predictedFrauds: 15, reportedFrauds: 12 },
  { name: "Merchant2", predictedFrauds: 25, reportedFrauds: 20 },
  { name: "Merchant3", predictedFrauds: 10, reportedFrauds: 8 },
  { name: "Merchant4", predictedFrauds: 20, reportedFrauds: 15 },
  { name: "Merchant5", predictedFrauds: 5, reportedFrauds: 3 },
];

const FraudStats = () => {
  const predictionColor = "rgb(59, 130, 246)"; // blue
  const reportedColor = "rgb(239, 68, 68)"; // red
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary p-3 border border-border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle>Fraud Analysis by Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="channel">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger value="channel">Channel</TabsTrigger>
            <TabsTrigger value="paymentMode">Payment Mode</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="payer">Payer</TabsTrigger>
            <TabsTrigger value="payee">Payee</TabsTrigger>
          </TabsList>
          
          {/* Channel Tab */}
          <TabsContent value="channel" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={channelData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="predictedFrauds" name="Predicted Frauds" fill={predictionColor} />
                <Bar dataKey="reportedFrauds" name="Reported Frauds" fill={reportedColor} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          {/* Payment Mode Tab */}
          <TabsContent value="paymentMode" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={paymentModeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="predictedFrauds" name="Predicted Frauds" fill={predictionColor} />
                <Bar dataKey="reportedFrauds" name="Reported Frauds" fill={reportedColor} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          {/* Bank Tab */}
          <TabsContent value="bank" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bankData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="predictedFrauds" name="Predicted Frauds" fill={predictionColor} />
                <Bar dataKey="reportedFrauds" name="Reported Frauds" fill={reportedColor} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          {/* Payer Tab */}
          <TabsContent value="payer" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={payerData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="predictedFrauds" name="Predicted Frauds" fill={predictionColor} />
                <Bar dataKey="reportedFrauds" name="Reported Frauds" fill={reportedColor} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          {/* Payee Tab */}
          <TabsContent value="payee" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={payeeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="predictedFrauds" name="Predicted Frauds" fill={predictionColor} />
                <Bar dataKey="reportedFrauds" name="Reported Frauds" fill={reportedColor} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FraudStats;
