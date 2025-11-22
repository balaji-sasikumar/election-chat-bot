import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface Constituency {
  id: string;
  name: string;
  state: string;
  candidates: number;
}

const constituencies: Constituency[] = [
  { id: "1", name: "Mumbai North", state: "Maharashtra", candidates: 5 },
  { id: "2", name: "Delhi South", state: "Delhi", candidates: 6 },
  { id: "3", name: "Bangalore Central", state: "Karnataka", candidates: 4 },
  { id: "4", name: "Kolkata East", state: "West Bengal", candidates: 5 },
  { id: "5", name: "Chennai North", state: "Tamil Nadu", candidates: 4 },
  { id: "6", name: "Hyderabad", state: "Telangana", candidates: 5 },
];

interface ConstituencySelectorProps {
  onSelect: (constituency: Constituency) => void;
}

const ConstituencySelector = ({ onSelect }: ConstituencySelectorProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Election Persona Chat
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select your constituency to chat with AI-powered candidate personas. 
          Get insights into their policies and positions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {constituencies.map((constituency) => (
          <Card
            key={constituency.id}
            className="p-6 hover:shadow-elevated transition-all duration-300 cursor-pointer group border-border"
            onClick={() => onSelect(constituency)}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1 text-card-foreground group-hover:text-primary transition-colors">
                  {constituency.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{constituency.state}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {constituency.candidates} candidates
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    Select →
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConstituencySelector;