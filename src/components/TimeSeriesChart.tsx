
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

// Sample data - this would come from your API in a real app
const generateTimeSeriesData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate some plausible fraud data
    const predictedFrauds = Math.floor(Math.random() * 15) + 5;
    const reportedFrauds = Math.floor(predictedFrauds * (0.7 + Math.random() * 0.3));
    
    data.push({
      date: date.toISOString().split('T')[0],
      predictedFrauds,
      reportedFrauds,
    });
  }
  
  return data;
};

const timeRanges = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
  { label: "1Y", days: 365 },
];

const TimeSeriesChart = () => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);
  const [data, setData] = useState(() => generateTimeSeriesData(selectedRange.days));
  
  const handleRangeChange = (range: typeof selectedRange) => {
    setSelectedRange(range);
    setData(generateTimeSeriesData(range.days));
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    
    // For different time ranges, format the date differently
    if (selectedRange.days <= 7) {
      return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
    } else if (selectedRange.days <= 30) {
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
    } else {
      return new Intl.DateTimeFormat("en-US", { month: "short", year: "2-digit" }).format(date);
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Fraud Trends Over Time</CardTitle>
          <div className="flex space-x-1">
            {timeRanges.map((range) => (
              <Button
                key={range.label}
                variant={selectedRange.label === range.label ? "default" : "outline"}
                size="sm"
                onClick={() => handleRangeChange(range)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="rgba(255,255,255,0.5)"
              />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(17, 24, 39, 0.9)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "0.5rem",
                  color: "white"
                }} 
                formatter={(value) => [`${value} transactions`, undefined]}
                labelFormatter={(label) => formatDate(label)}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="predictedFrauds"
                name="Predicted Frauds"
                stroke="rgb(59, 130, 246)"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="reportedFrauds"
                name="Reported Frauds"
                stroke="rgb(239, 68, 68)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesChart;
