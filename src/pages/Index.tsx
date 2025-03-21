
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <Features />
        
        {/* API Section */}
        <section className="py-24 bg-gradient-to-b from-background to-background/95 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Powerful APIs for Seamless Integration
                </h2>
                <p className="text-lg text-foreground/80 mb-6">
                  Our APIs are designed for easy integration with your existing payment gateway infrastructure.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-primary/10 p-1 rounded">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Real-time Fraud Detection API</h3>
                      <p className="text-sm text-foreground/70">Process transactions in under 300ms with high accuracy.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-primary/10 p-1 rounded">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Batch Processing API</h3>
                      <p className="text-sm text-foreground/70">Handle multiple transactions simultaneously with parallel processing.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-primary/10 p-1 rounded">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Fraud Reporting API</h3>
                      <p className="text-sm text-foreground/70">Report confirmed fraud cases to improve detection algorithms.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button asChild className="group">
                    <Link to="/login">
                      Try the APIs
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="lg:ml-auto">
                <div className="bg-card rounded-lg border border-border overflow-hidden shadow-lg">
                  <div className="flex justify-between items-center p-4 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-muted-foreground">Fraud Detection API</div>
                  </div>
                  <div className="p-4 bg-secondary/50">
                    <pre className="text-xs overflow-x-auto"><code>{`// Real-time Fraud Detection API
fetch('https://api.detectifysentinel.com/v1/detect', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    transaction_id: "TXN123456",
    transaction_amount: 5000,
    transaction_channel: "web",
    payer_email: "user@example.com",
    payer_device: "iPhone12,3"
  })
})
.then(response => response.json())
.then(data => console.log(data));

// Response
{
  "transaction_id": "TXN123456",
  "is_fraud": false,
  "fraud_source": "model",
  "fraud_reason": "",
  "fraud_score": 0.23
}`}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Secure Your Payment Gateway?
              </h2>
              <p className="text-lg text-foreground/80 mb-8">
                Start protecting your transactions with our advanced fraud detection system today.
              </p>
              <Button asChild size="lg" className="group">
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Detectify Sentinel</span>
            </div>
            <div className="text-sm text-foreground/70">
              © {new Date().getFullYear()} Detectify Sentinel. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
