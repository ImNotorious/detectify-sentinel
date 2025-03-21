
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  return (
    <div className="relative min-h-screen grid-bg overflow-hidden flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full filter blur-3xl opacity-40"></div>
      </div>
      
      <div 
        className={`container mx-auto px-4 md:px-6 relative z-10 py-24 transition-opacity duration-1000 ease-in-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-secondary/50 backdrop-blur-sm rounded-full mb-6 opacity-0 animate-fadeIn" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
            <div className="px-4 py-1 bg-primary/90 rounded-full flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium">Advanced Fraud Detection</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-gradient opacity-0 animate-fadeIn" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
            Intelligent Fraud Detection & Monitoring
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl opacity-0 animate-fadeIn" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
            Detectify Sentinel combines AI and expert rules to protect your payment gateway from fraudulent transactions in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 animate-fadeIn" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
            <Button asChild size="lg" className="group">
              <Link to="/login">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
        
        {/* Floating graphics */}
        <div className="mt-20 relative max-w-4xl mx-auto">
          <div className="bg-card rounded-lg border border-border/40 shadow-xl overflow-hidden opacity-0 animate-fadeIn" style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}>
            <div className="p-1 bg-gradient-to-r from-primary/80 via-blue-600/80 to-primary/80"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-muted-foreground">Fraud Detection API</div>
              </div>
              
              <div className="space-y-4">
                <div className="rounded bg-secondary/50 p-4">
                  <pre className="text-xs text-left overflow-x-auto"><code>{`// Request
{
  "transaction_id": "TXN123456",
  "transaction_amount": 5000,
  "transaction_channel": "web",
  "payer_email": "user@example.com",
  "payment_gateway_bank": "HDFC"
}

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
          
          {/* Floating elements */}
          <div className="absolute -top-8 -right-8 w-20 h-20 bg-primary/10 backdrop-blur-md rounded-lg border border-primary/20 flex items-center justify-center opacity-0 animate-fadeIn animate-float" style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}>
            <div className="text-2xl font-bold text-primary">99.8%</div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary backdrop-blur-md rounded-lg border border-border flex flex-col items-center justify-center opacity-0 animate-fadeIn animate-float" style={{ animationDelay: "1400ms", animationFillMode: "forwards", animationDuration: "4s" }}>
            <ShieldCheck className="h-8 w-8 text-primary mb-1" />
            <div className="text-xs font-medium">Real-time Detection</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
