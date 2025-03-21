
import { ArrowRight, Shield, PieChart, Zap, Server, Bell, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featureItems = [
  {
    icon: Shield,
    title: "Real-time Fraud Detection",
    description: "Detect fraudulent transactions in milliseconds with our advanced AI and rule-based system.",
  },
  {
    icon: Server,
    title: "Batch Processing",
    description: "Process multiple transactions in parallel with our high-performance batch API.",
  },
  {
    icon: Bell,
    title: "Fraud Reporting",
    description: "Report and track fraudulent transactions with comprehensive audit trails.",
  },
  {
    icon: PieChart,
    title: "Rich Data Visualization",
    description: "Monitor fraud metrics with interactive charts and detailed analytics.",
  },
  {
    icon: BarChart3,
    title: "Performance Evaluation",
    description: "Track precision and recall with confusion matrices and evaluation metrics.",
  },
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Experience sub-300ms response times with our optimized architecture.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Advanced Fraud Detection Features
          </h2>
          <p className="text-lg text-foreground/80">
            Our platform combines powerful technologies to protect your payment gateway from fraud.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 transition-all duration-300 hover:bg-card hover:shadow-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="group">
            <Link to="/login">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
