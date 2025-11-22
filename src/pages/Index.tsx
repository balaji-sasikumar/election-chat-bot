import { useState } from "react";
import ConstituencySelector from "@/components/ConstituencySelector";
import CandidateSelector from "@/components/CandidateSelector";
import ChatInterface from "@/components/ChatInterface";

interface Constituency {
  id: string;
  name: string;
  state: string;
  candidates: number;
}

interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
  color: string;
}

type Step = "constituency" | "candidate" | "chat";

const Index = () => {
  const [step, setStep] = useState<Step>("constituency");
  const [selectedConstituency, setSelectedConstituency] = useState<Constituency | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleConstituencySelect = (constituency: Constituency) => {
    setSelectedConstituency(constituency);
    setStep("candidate");
  };

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setStep("chat");
  };

  const handleBackToConstituencies = () => {
    setSelectedConstituency(null);
    setStep("constituency");
  };

  const handleBackToCandidates = () => {
    setSelectedCandidate(null);
    setStep("candidate");
  };

  return (
    <div className="min-h-screen bg-background">
      {step === "constituency" && (
        <ConstituencySelector onSelect={handleConstituencySelect} />
      )}
      {step === "candidate" && selectedConstituency && (
        <CandidateSelector
          constituencyName={selectedConstituency.name}
          onSelect={handleCandidateSelect}
          onBack={handleBackToConstituencies}
        />
      )}
      {step === "chat" && selectedCandidate && selectedConstituency && (
        <ChatInterface
          candidateName={selectedCandidate.name}
          candidateParty={selectedCandidate.party}
          candidateDescription={selectedCandidate.description}
          candidateColor={selectedCandidate.color}
          constituencyName={selectedConstituency.name}
          onBack={handleBackToCandidates}
        />
      )}
    </div>
  );
};

export default Index;