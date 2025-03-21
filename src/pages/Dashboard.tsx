
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/services/auth";
import Header from "@/components/Header";
import TransactionTable from "@/components/TransactionTable";
import TimeSeriesChart from "@/components/TimeSeriesChart";
import FraudStats from "@/components/FraudStats";
import FraudDetection from "@/components/FraudDetection";
import ConfusionMatrix from "@/components/ConfusionMatrix";
import { ShieldCheck, AlertTriangle, TrendingUp, Layers } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    payerId: "",
    payeeId: "",
    searchQuery: "",
  });
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
  
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Fraud Monitoring Dashboard</h1>
          <p className="text-foreground/70">
            Monitor, detect, and report fraudulent transactions in real-time.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-foreground/70 mb-1">Total Transactions</p>
                <h3 className="text-2xl font-bold">12,856</h3>
                <p className="text-xs text-foreground/60 mt-1">
                  {format(new Date(), "MMMM yyyy")}
                </p>
              </div>
              <div className="bg-primary/10 p-2 rounded">
                <Layers className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-foreground/70 mb-1">Predicted Frauds</p>
                <h3 className="text-2xl font-bold">183</h3>
                <p className="text-xs text-foreground/60 mt-1">
                  <span className="text-amber-500">+8.3%</span> from last month
                </p>
              </div>
              <div className="bg-amber-500/10 p-2 rounded">
                <ShieldCheck className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-foreground/70 mb-1">Reported Frauds</p>
                <h3 className="text-2xl font-bold">142</h3>
                <p className="text-xs text-foreground/60 mt-1">
                  <span className="text-red-500">+12.5%</span> from last month
                </p>
              </div>
              <div className="bg-red-500/10 p-2 rounded">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-foreground/70 mb-1">Detection Rate</p>
                <h3 className="text-2xl font-bold">93.2%</h3>
                <p className="text-xs text-foreground/60 mt-1">
                  <span className="text-green-500">+2.1%</span> from last month
                </p>
              </div>
              <div className="bg-green-500/10 p-2 rounded">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts and Transaction Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TimeSeriesChart />
          </div>
          <div className="lg:col-span-1">
            <FraudDetection />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FraudStats />
          <ConfusionMatrix />
        </div>
        
        <div className="mb-8">
          <TransactionTable filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
