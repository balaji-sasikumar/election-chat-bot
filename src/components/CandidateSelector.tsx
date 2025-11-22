import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  color: string;
}

const candidates: Candidate[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    party: "Progressive Alliance",
    description: "Focus on technology infrastructure and education reform",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Priya Sharma",
    party: "Democratic Front",
    description: "Healthcare accessibility and women's empowerment advocate",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Vikram Singh",
    party: "National Unity Party",
    description: "Economic development and job creation specialist",
    color: "bg-orange-500",
  },
  {
    id: "4",
    name: "Anjali Patel",
    party: "People's Movement",
    description: "Environmental protection and sustainable development",
    color: "bg-emerald-500",
  },
  {
    id: "5",
    name: "Mohammed Ali",
    party: "Social Justice Coalition",
    description: "Social equality and minority rights champion",
    color: "bg-purple-500",
  },
];

interface CandidateSelectorProps {
  constituencyName: string;
  onSelect: (candidate: Candidate) => void;
  onBack: () => void;
}

const CandidateSelector = ({ constituencyName, onSelect, onBack }: CandidateSelectorProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 hover:bg-secondary"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Constituencies
      </Button>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          {constituencyName}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose a candidate to start a conversation. Ask about their policies, vision, and stance on key issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="p-6 hover:shadow-elevated transition-all duration-300 cursor-pointer group border-border"
            onClick={() => onSelect(candidate)}
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className={`${candidate.color} text-white text-xl`}>
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1 text-card-foreground group-hover:text-primary transition-colors">
                  {candidate.name}
                </h3>
                <p className="text-sm font-medium text-primary mb-2">{candidate.party}</p>
                <p className="text-sm text-muted-foreground mb-4">{candidate.description}</p>
                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                  Start Chat →
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateSelector;