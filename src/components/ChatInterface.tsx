import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Sparkles, User, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  candidateName: string;
  candidateParty: string;
  candidateDescription: string;
  candidateColor: string;
  constituencyName: string;
  onBack: () => void;
}

const interviewQuestions = [
  "What is your stance on economic development in our constituency?",
  "How do you plan to improve healthcare accessibility?",
  "What are your priorities for education reform?",
  "How will you address unemployment in the region?",
  "What is your environmental policy?",
];

const ChatInterface = ({
  candidateName,
  candidateParty,
  candidateDescription,
  candidateColor,
  constituencyName,
  onBack,
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm ${candidateName} from ${candidateParty}, running for ${constituencyName}. ${candidateDescription}. Feel free to ask me anything about my policies and vision for our constituency.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("persona-chat", {
        body: {
          messages: [...messages, userMessage],
          candidateName,
          candidateParty,
          candidateDescription,
          constituencyName,
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const simulateInterview = async () => {
    setIsLoading(true);
    for (const question of interviewQuestions) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await sendMessage(question);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col animate-fade-in">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack} className="hover:bg-secondary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Candidates
        </Button>
      </div>

      <Card className="flex-1 flex flex-col border-border shadow-elevated overflow-hidden">
        <div className="p-6 border-b border-border bg-gradient-primary">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className={`${candidateColor} text-white text-lg`}>
                {candidateName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-primary-foreground">{candidateName}</h2>
              <p className="text-sm text-primary-foreground/80">{candidateParty} • {constituencyName}</p>
            </div>
            <Button
              onClick={simulateInterview}
              disabled={isLoading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Simulate Interview
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-fade-in ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`${candidateColor} text-white text-xs`}>
                      {candidateName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${candidateColor} text-white text-xs`}>
                    {candidateName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary text-secondary-foreground rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-6 border-t border-border bg-card">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about policies, vision, or any concerns..."
              disabled={isLoading}
              className="flex-1 bg-background border-input"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ChatInterface;