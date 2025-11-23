export interface Question {
  id: string;
  text: string;
  options: string[];
}

export const interviewQuestions: Question[] = [
  {
    id: "q1",
    text: "நீங்கள் எந்த type movies விரும்புவீர்கள்? நீங்கள் எந்த type movies விரும்புவீர்கள்?",
    options: [
      "People struggles / emotional stories",
      "Police / action / authority",
      "Rural culture / family values",
      "Sci-fi / modern message movies",
    ],
  },
  {
    id: "q2",
    text: "ஒரு வேலை செய்யும்போது நீங்க எந்த style follow பண்ணுவீர்கள்?",
    options: [
      "எல்லாரையும் சேர்த்து slow & fair",
      "வேகமா முடிக்கறது முக்கியம்",
      "group-ஆ discuss பண்ணுவேன்",
      "research பண்ணி fact-based முடிவு",
    ],
  },
  {
    id: "q3",
    text: "நீங்க எந்த வகை music அதிகமா கேற்பீர்கள்?",
    options: [
      "melody / meaningful songs",
      "energetic / powerful songs",
      "folk / cultural",
      "Service sector only",
      "calm / western / modern beats",
    ],
  },
  {
    id: "q4",
    text: "உங்கள் friend circle-ல leader யாரா இருப்பீர்கள்?",
    options: [
      "soft, helpful",
      "commanding",
      "group-friendly",
      "advisor / brain-type",
    ],
  },
  {
    id: "q5",
    text: "நீங்க எந்த festival vibe அதிகமாக பிடிக்கும்?",
    options: [
      "சமூகமா celebrate பண்ணறது",
      "discipline, tradition follow பண்ணறது",
      "village/folk-style celebration",
      "modern, simple celebration",
    ],
  },
  {
    id: "q6",
    text: "ஒரு new person-ஓட first impression framework?",
    options: [
      "அவரோட humanity",
      "அவரோட behaviour & discipline",
      "அவரோட background",
      "அவரோட knowledge / mindset",
    ],
  },
  {
    id: "q7",
    text: "நீங்க எந்த motivational quotes save பண்ணுவீர்கள்?",
    options: [
      "humanity, equality",
      "leadership power",
      "community & roots",
      "logic, improvement",
    ],
  },
  {
    id: "q8",
    text: "நீங்க எந்த type YouTube videos frequently பார்ப்பீர்கள்?",
    options: [
      "Social stories",
      "Motivational / police / army",
      "Village / cultural",
      "Tech / science / explanations",
    ],
  },
  {
    id: "q9",
    text: "ஒரு hard situation-ல நீங்க என்ன பண்ணுவீர்கள்?",
    options: [
      "calm-ஆ நிதானமா",
      "immediately act",
      "family / friends opinion",
      "reason analyse",
    ],
  },
  {
    id: "q10",
    text: "ஒரு person impress பண்ணணும் என்றால் என்ன செய்யுவீர்கள்?",
    options: ["help", "confidence", "friendliness", "being smart & unique"],
  },
];
