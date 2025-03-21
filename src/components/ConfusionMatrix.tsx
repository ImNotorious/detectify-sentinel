
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EvaluationStats {
  period: string;
  truePositives: number;
  falsePositives: number;
  trueNegatives: number;
  falseNegatives: number;
}

// Mock data - would come from API in real app
const evaluationData: EvaluationStats[] = [
  {
    period: "Last 7 days",
    truePositives: 120,
    falsePositives: 30,
    trueNegatives: 850,
    falseNegatives: 25,
  },
  {
    period: "Last 30 days",
    truePositives: 520,
    falsePositives: 110,
    trueNegatives: 3200,
    falseNegatives: 85,
  },
  {
    period: "Last 90 days",
    truePositives: 1450,
    falsePositives: 320,
    trueNegatives: 9800,
    falseNegatives: 210,
  },
];

const ConfusionMatrix = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(evaluationData[0]);
  
  const calculatePrecision = (tp: number, fp: number) => {
    return tp === 0 ? 0 : tp / (tp + fp);
  };
  
  const calculateRecall = (tp: number, fn: number) => {
    return tp === 0 ? 0 : tp / (tp + fn);
  };
  
  const calculateF1 = (precision: number, recall: number) => {
    return precision === 0 || recall === 0
      ? 0
      : (2 * precision * recall) / (precision + recall);
  };
  
  const calculateAccuracy = (tp: number, tn: number, total: number) => {
    return total === 0 ? 0 : (tp + tn) / total;
  };
  
  const precision = calculatePrecision(
    selectedPeriod.truePositives,
    selectedPeriod.falsePositives
  );
  
  const recall = calculateRecall(
    selectedPeriod.truePositives,
    selectedPeriod.falseNegatives
  );
  
  const f1Score = calculateF1(precision, recall);
  
  const total =
    selectedPeriod.truePositives +
    selectedPeriod.falsePositives +
    selectedPeriod.trueNegatives +
    selectedPeriod.falseNegatives;
  
  const accuracy = calculateAccuracy(
    selectedPeriod.truePositives,
    selectedPeriod.trueNegatives,
    total
  );
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Performance Evaluation</CardTitle>
          <div className="flex space-x-1">
            {evaluationData.map((period) => (
              <Button
                key={period.period}
                variant={selectedPeriod.period === period.period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period.period}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Confusion Matrix */}
          <div>
            <h3 className="text-lg font-medium mb-3">Confusion Matrix</h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full aspect-square max-w-xs mx-auto">
              <div className="bg-green-500/20 border border-green-500/30 rounded-md flex flex-col items-center justify-center p-4">
                <span className="text-2xl font-bold text-green-400">
                  {selectedPeriod.truePositives}
                </span>
                <span className="text-xs text-foreground/70 mt-1 text-center">
                  True Positives
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  (Correctly detected)
                </span>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-md flex flex-col items-center justify-center p-4">
                <span className="text-2xl font-bold text-yellow-400">
                  {selectedPeriod.falsePositives}
                </span>
                <span className="text-xs text-foreground/70 mt-1 text-center">
                  False Positives
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  (False alarms)
                </span>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-md flex flex-col items-center justify-center p-4">
                <span className="text-2xl font-bold text-yellow-400">
                  {selectedPeriod.falseNegatives}
                </span>
                <span className="text-xs text-foreground/70 mt-1 text-center">
                  False Negatives
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  (Missed frauds)
                </span>
              </div>
              <div className="bg-green-500/20 border border-green-500/30 rounded-md flex flex-col items-center justify-center p-4">
                <span className="text-2xl font-bold text-green-400">
                  {selectedPeriod.trueNegatives}
                </span>
                <span className="text-xs text-foreground/70 mt-1 text-center">
                  True Negatives
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  (Correctly ignored)
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
              <div>Predicted</div>
              <div>Actual →</div>
            </div>
          </div>
          
          {/* Metrics */}
          <div>
            <h3 className="text-lg font-medium mb-3">Performance Metrics</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground/80">Precision</span>
                    <span className="text-sm font-medium">
                      {(precision * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${precision * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Of all predicted frauds, how many were actually fraudulent
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground/80">Recall</span>
                    <span className="text-sm font-medium">
                      {(recall * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${recall * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Of all actual frauds, how many were correctly detected
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground/80">F1 Score</span>
                    <span className="text-sm font-medium">
                      {(f1Score * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${f1Score * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Harmonic mean of precision and recall
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground/80">Accuracy</span>
                    <span className="text-sm font-medium">
                      {(accuracy * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${accuracy * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Percentage of all predictions that were correct
                  </p>
                </div>
              </div>
              
              <div className="p-3 rounded-md bg-secondary/50 border border-border">
                <h4 className="text-sm font-medium mb-1">Performance Summary</h4>
                <p className="text-xs text-foreground/80">
                  {recall > 0.85
                    ? "Excellent fraud detection rate with minimal missed frauds."
                    : recall > 0.7
                    ? "Good fraud detection rate, but some frauds are being missed."
                    : "Improvement needed in detecting actual fraud cases."}
                </p>
                <p className="text-xs text-foreground/80 mt-1">
                  {precision > 0.85
                    ? "Very few false alarms, high precision system."
                    : precision > 0.7
                    ? "Reasonable precision, but some legitimate transactions are flagged."
                    : "Too many false alarms, tuning needed to reduce false positives."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfusionMatrix;
