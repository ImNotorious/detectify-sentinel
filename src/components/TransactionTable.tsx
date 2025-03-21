
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, AlertTriangle, CheckCircle, ShieldAlert, DownloadCloud } from "lucide-react";
import { api, Transaction } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TransactionTableProps {
  filters: {
    startDate: string;
    endDate: string;
    payerId: string;
    payeeId: string;
    searchQuery: string;
  };
  onFilterChange: (filters: Partial<TransactionTableProps["filters"]>) => void;
}

const TransactionTable = ({ filters, onFilterChange }: TransactionTableProps) => {
  const [searchInput, setSearchInput] = useState(filters.searchQuery);
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => api.getTransactions(filters),
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ searchQuery: searchInput });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy HH:mm");
  };
  
  const clearFilters = () => {
    onFilterChange({
      startDate: "",
      endDate: "",
      payerId: "",
      payeeId: "",
      searchQuery: "",
    });
    setSearchInput("");
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Transaction Data</CardTitle>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by transaction ID..."
                  className="pl-8 w-full"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button type="submit" size="sm" variant="secondary" className="ml-2">
                Search
              </Button>
            </form>
            
            <Button size="sm" variant="outline" onClick={clearFilters}>
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
            
            <Button size="sm" variant="outline">
              <DownloadCloud className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <TableRow key={index}>
                        {Array(7)
                          .fill(null)
                          .map((_, cellIndex) => (
                            <TableCell key={cellIndex}>
                              <Skeleton className="h-6 w-full" />
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                ) : transactions && transactions.length > 0 ? (
                  transactions.map((transaction: Transaction) => (
                    <TableRow key={transaction.transaction_id}>
                      <TableCell className="font-medium">
                        {transaction.transaction_id}
                      </TableCell>
                      <TableCell>{formatDate(transaction.transaction_date)}</TableCell>
                      <TableCell>{formatCurrency(transaction.transaction_amount)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.transaction_channel}</Badge>
                      </TableCell>
                      <TableCell>{transaction.transaction_payment_mode}</TableCell>
                      <TableCell>
                        {transaction.is_fraud_reported ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Reported Fraud</span>
                          </Badge>
                        ) : transaction.is_fraud_predicted ? (
                          <Badge variant="secondary" className="flex items-center gap-1 bg-amber-500/20 text-amber-500 hover:bg-amber-500/30">
                            <ShieldAlert className="h-3 w-3" />
                            <span>Suspected Fraud</span>
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="flex items-center gap-1 bg-green-500/20 text-green-500 hover:bg-green-500/30">
                            <CheckCircle className="h-3 w-3" />
                            <span>Legitimate</span>
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
