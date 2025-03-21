
import { toast } from "@/components/ui/use-toast";

// Define types based on the requirements
export interface Transaction {
  transaction_id: string;
  transaction_date: string;
  transaction_amount: number;
  transaction_channel: string;
  transaction_payment_mode: string;
  payment_gateway_bank: string;
  payer_email: string;
  payer_mobile: string;
  payer_card_brand: string;
  payer_device: string;
  payer_browser: string;
  payee_id: string;
  is_fraud_predicted?: boolean;
  is_fraud_reported?: boolean;
  fraud_score?: number;
  fraud_reason?: string;
  fraud_source?: string;
}

export interface FraudDetectionResponse {
  transaction_id: string;
  is_fraud: boolean;
  fraud_source: "rule" | "model";
  fraud_reason: string;
  fraud_score: number;
}

export interface FraudReportingRequest {
  transaction_id: string;
  reporting_entity_id: string;
  fraud_details: string;
}

export interface FraudReportingResponse {
  transaction_id: string;
  reporting_acknowledged: boolean;
  failure_code: number;
}

// Mock API calls
class API {
  // Real-time fraud detection
  async detectFraud(transaction: Partial<Transaction>): Promise<FraudDetectionResponse> {
    try {
      // In a real app, this would be a fetch call to your API
      console.log("Detecting fraud for transaction:", transaction);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
      
      // Mock response
      const isFraud = Math.random() < 0.2; // 20% chance of fraud
      
      return {
        transaction_id: transaction.transaction_id || "unknown",
        is_fraud: isFraud,
        fraud_source: Math.random() > 0.5 ? "rule" : "model",
        fraud_reason: isFraud ? "Suspicious activity detected" : "",
        fraud_score: isFraud ? Math.random() * 0.5 + 0.5 : Math.random() * 0.4
      };
    } catch (error) {
      console.error("Error detecting fraud:", error);
      toast({
        title: "Error detecting fraud",
        description: "There was an error detecting fraud for this transaction.",
        variant: "destructive"
      });
      throw error;
    }
  }

  // Batch fraud detection
  async detectFraudBatch(transactions: Partial<Transaction>[]): Promise<Record<string, Omit<FraudDetectionResponse, "transaction_id">>> {
    try {
      console.log("Batch detecting fraud for transactions:", transactions);
      
      // Simulate API delay with parallel processing
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
      
      // Mock response
      const results: Record<string, Omit<FraudDetectionResponse, "transaction_id">> = {};
      
      transactions.forEach(transaction => {
        const transactionId = transaction.transaction_id || "unknown";
        const isFraud = Math.random() < 0.2;
        
        results[transactionId] = {
          is_fraud: isFraud,
          fraud_source: Math.random() > 0.5 ? "rule" : "model",
          fraud_reason: isFraud ? "Suspicious activity detected" : "",
          fraud_score: isFraud ? Math.random() * 0.5 + 0.5 : Math.random() * 0.4
        };
      });
      
      return results;
    } catch (error) {
      console.error("Error batch detecting fraud:", error);
      toast({
        title: "Error in batch fraud detection",
        description: "There was an error processing the batch of transactions.",
        variant: "destructive"
      });
      throw error;
    }
  }

  // Report fraud
  async reportFraud(report: FraudReportingRequest): Promise<FraudReportingResponse> {
    try {
      console.log("Reporting fraud:", report);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
      
      // Mock success (95% chance)
      const success = Math.random() < 0.95;
      
      return {
        transaction_id: report.transaction_id,
        reporting_acknowledged: success,
        failure_code: success ? 0 : 500
      };
    } catch (error) {
      console.error("Error reporting fraud:", error);
      toast({
        title: "Error reporting fraud",
        description: "There was an error reporting this fraud.",
        variant: "destructive"
      });
      throw error;
    }
  }

  // Get transactions
  async getTransactions(filters?: {
    startDate?: string;
    endDate?: string;
    payerId?: string;
    payeeId?: string;
    searchQuery?: string;
  }): Promise<Transaction[]> {
    try {
      console.log("Getting transactions with filters:", filters);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 300));
      
      // Generate mock transactions
      return this.generateMockTransactions(50);
    } catch (error) {
      console.error("Error getting transactions:", error);
      toast({
        title: "Error fetching transactions",
        description: "There was an error fetching the transaction data.",
        variant: "destructive"
      });
      throw error;
    }
  }

  // Helper to generate mock transactions
  private generateMockTransactions(count: number): Transaction[] {
    const transactions: Transaction[] = [];
    
    const channels = ["web", "mobile", "pos", "atm"];
    const paymentModes = ["card", "upi", "neft", "rtgs", "imps"];
    const banks = ["HDFC", "ICICI", "SBI", "Axis", "Kotak"];
    const cardBrands = ["Visa", "Mastercard", "Amex", "RuPay"];
    const browsers = ["Chrome", "Safari", "Firefox", "Edge"];
    
    for (let i = 0; i < count; i++) {
      const isFraudPredicted = Math.random() < 0.15;
      const isFraudReported = isFraudPredicted && Math.random() < 0.8;
      
      transactions.push({
        transaction_id: `TXN${Math.floor(Math.random() * 1000000)}`,
        transaction_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        transaction_amount: Math.floor(Math.random() * 10000) + 100,
        transaction_channel: channels[Math.floor(Math.random() * channels.length)],
        transaction_payment_mode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
        payment_gateway_bank: banks[Math.floor(Math.random() * banks.length)],
        payer_email: `user${Math.floor(Math.random() * 1000)}@example.com`,
        payer_mobile: `+91${Math.floor(Math.random() * 10000000000)}`,
        payer_card_brand: cardBrands[Math.floor(Math.random() * cardBrands.length)],
        payer_device: `Device${Math.floor(Math.random() * 1000)}`,
        payer_browser: browsers[Math.floor(Math.random() * browsers.length)],
        payee_id: `PAYEE${Math.floor(Math.random() * 1000)}`,
        is_fraud_predicted: isFraudPredicted,
        is_fraud_reported: isFraudReported,
        fraud_score: isFraudPredicted ? Math.random() * 0.5 + 0.5 : Math.random() * 0.4,
        fraud_reason: isFraudPredicted ? "Suspicious activity detected" : "",
        fraud_source: Math.random() > 0.5 ? "rule" : "model"
      });
    }
    
    return transactions;
  }
}

export const api = new API();
