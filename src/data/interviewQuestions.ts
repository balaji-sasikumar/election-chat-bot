export interface Question {
  id: string;
  text: string;
  options: string[];
}

export const interviewQuestions: Question[] = [
  {
    id: "q1",
    text: "Question 1: What is your primary focus for the constituency?",
    options: [
      "People struggles / emotional stories	",
      "Police / action / authority	",
      "Rural culture / family values	",
      "Sci-fi / modern message movies",
    ],
  },
  {
    id: "q2",
    text: "Question 2: How will you address water scarcity?",
    options: [
      "New dams",
      "Rainwater harvesting",
      "Desalination",
      "Water recycling",
    ],
  },
  {
    id: "q3",
    text: "Question 3: What is your stance on industrial development?",
    options: [
      "Aggressive growth",
      "Sustainable growth",
      "Focus on agriculture",
      "Service sector only",
    ],
  },
  {
    id: "q4",
    text: "Question 4: How do you plan to improve public transport?",
    options: [
      "Metro expansion",
      "More buses",
      "Better roads",
      "Private partnerships",
    ],
  },
  {
    id: "q5",
    text: "Question 5: What about women's safety?",
    options: [
      "More police",
      "CCTV surveillance",
      "Community policing",
      "Stricter laws",
    ],
  },
  {
    id: "q6",
    text: "Question 6: Your view on education reform?",
    options: [
      "Digital classrooms",
      "Teacher training",
      "New schools",
      "Vocational training",
    ],
  },
  {
    id: "q7",
    text: "Question 7: Healthcare priorities?",
    options: [
      "New hospitals",
      "Insurance for all",
      "Preventive care",
      "Telemedicine",
    ],
  },
  {
    id: "q8",
    text: "Question 8: Addressing unemployment?",
    options: [
      "Skill development",
      "Government jobs",
      "Startups",
      "Foreign investment",
    ],
  },
  {
    id: "q9",
    text: "Question 9: Environmental protection?",
    options: [
      "Tree planting",
      "Waste management",
      "Renewable energy",
      "Pollution control",
    ],
  },
  {
    id: "q10",
    text: "Question 10: Digital infrastructure?",
    options: ["Free Wi-Fi", "Digital literacy", "E-governance", "Tech parks"],
  },
];
