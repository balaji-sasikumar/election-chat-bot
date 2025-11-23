import { useState } from "react";
import ConstituencySelector from "@/components/ConstituencySelector";
import CandidateSelector from "@/components/CandidateSelector";
import ChatInterface from "@/components/ChatInterface";

import InterviewView from "@/components/InterviewView";

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
  rawProfile: any;
}

type Step = "constituency" | "candidate" | "chat" | "interview";

const Index = () => {
  const [step, setStep] = useState<Step>("constituency");
  const [selectedConstituency, setSelectedConstituency] =
    useState<Constituency | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [interviewResults, setInterviewResults] = useState<
    Record<string, string>
  >({});

  const fetchCandidatesByConstituency = async (constituencyName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/fetch_profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ constituency: constituencyName }),
      });

      if (!response.ok) {
        throw new Error(`API failed: ${response.status}`);
      }

      const data = await response.json();

      const mappedCandidates = (data.profile || []).map(
        (item: any, index: number) => {
          const profile = item.synthetic_voter_profile;
          const colors = [
            "bg-blue-500",
            "bg-green-500",
            "bg-orange-500",
            "bg-emerald-500",
            "bg-purple-500",
          ];

          return {
            id: item.voter_id,
            name: profile.demographics.name,
            party:
              profile.political_identity.party_member === "No"
                ? "Independent"
                : profile.political_identity.party_member,
            description:
              profile.geographic_context.local_issues ||
              "Focus on local development",
            color: colors[index % colors.length],
            rawProfile: profile,
          };
        }
      );

      setCandidates(mappedCandidates);
    } catch (err: any) {
      console.error("Failed to fetch candidates:", err);
      // Optional: set error state
    } finally {
      setIsLoading(false);
    }
  };

  const handleConstituencySelect = (constituency: Constituency) => {
    setSelectedConstituency(constituency);
    fetchCandidatesByConstituency(constituency.name);
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

  const handleInterviewComplete = (results: Record<string, string>) => {
    setInterviewResults(results);
    setStep("interview");
  };

  const handleBackToChat = () => {
    setStep("chat");
  };

  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!selectedCandidate) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile: selectedCandidate.rawProfile,
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      setPredictionResult(data.predicted_party);
    } catch (error) {
      console.error("Prediction error:", error);
      // You might want to show a toast here, but for now just logging
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {step === "constituency" && (
        <ConstituencySelector onSelect={handleConstituencySelect} />
      )}
      {step === "candidate" && selectedConstituency && (
        <CandidateSelector
          constituencyName={selectedConstituency.name}
          candidates={candidates}
          isLoading={isLoading}
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
          candidateProfile={selectedCandidate.rawProfile}
          constituencyName={selectedConstituency.name}
          onBack={handleBackToCandidates}
          onInterviewComplete={handleInterviewComplete}
        />
      )}
      {step === "interview" && selectedCandidate && (
        <InterviewView
          candidateName={selectedCandidate.name}
          results={interviewResults}
          predictionResult={predictionResult}
          onBack={handleBackToChat}
          onPredict={handlePredict}
        />
      )}
    </div>
  );
};

export default Index;
