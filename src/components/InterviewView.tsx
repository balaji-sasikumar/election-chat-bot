import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { interviewQuestions } from "@/data/interviewQuestions";

interface InterviewViewProps {
  candidateName: string;
  partyName: string;
  results: Record<string, string>;
  predictionResult: string | null;
  onBack: () => void;
  onPredict: () => void;
}

const partyLogos: Record<string, string> = {
  BJP: "/logos/bjp.png",
  TVK: "/logos/tvk.png",
  DMK: "/logos/dmk.png",
  ADMK: "/logos/admk.png",
  PMK: "/logos/pmk.png",
  CONGRESS: "/logos/congress.png",
};

const InterviewView = ({
  candidateName,
  partyName,
  results,
  predictionResult,
  onBack,
  onPredict,
}: InterviewViewProps) => {
  const selectedLogo = partyName ? partyLogos[partyName.toUpperCase()] : partyLogos[predictionResult];
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 hover:bg-secondary"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Chat
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Results</h1>
        <p className="text-muted-foreground">
          Predicted responses for {candidateName} based on their profile.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {interviewQuestions.map((q) => {
          // Handle case-insensitive key matching (e.g. API returns "Q1", data has "q1")
          const resultKey = Object.keys(results).find(
            (k) => k.toLowerCase() === q.id.toLowerCase()
          );
          const predictedValue = resultKey ? results[resultKey] : null;

          return (
            <Card key={q.id} className="p-6 border-border">
              <h3 className="text-lg font-semibold mb-4">{q.text}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((option, index) => {
                  // Map index 0->A, 1->B, 2->C, 3->D
                  const optionLetter = String.fromCharCode(65 + index); // 65 is 'A'
                  const isSelected = predictedValue === optionLetter;

                  return (
                    <div
                      key={option}
                      className={`p-3 rounded-lg border transition-colors ${
                        isSelected
                          ? "bg-primary/10 border-primary text-primary font-medium"
                          : "bg-secondary/50 border-transparent text-muted-foreground"
                      }`}
                    >
                      <span className="font-bold mr-2">{optionLetter}.</span>
                      {option}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-6">
        {!predictionResult ? (
          <Button size="lg" onClick={onPredict} className="animate-pulse">
            <Sparkles className="h-4 w-4 mr-2" />
            Predict Party Leaning
          </Button>
        ) : (
          <Card className="p-6 border-primary/50 bg-primary/5 w-full max-w-md text-center animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">
              Predicted Party Leaning
            </h3>
            <div className="text-3xl font-bold text-primary">
              {partyName ?? predictionResult}
            </div>
             {/* Dynamic Party Logo */}
            {selectedLogo && (
                  <img
                    src={selectedLogo}
                    className="mx-auto w-20 h-20 object-contain"
                  />
                )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default InterviewView;
