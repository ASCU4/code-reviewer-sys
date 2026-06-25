export const STATS = {
  totalReports: 127,
  avgScore: 8.6,
  issuesFound: 43,
  weeklyChange: "+12%",
  scoreChange: "+0.8",
  criticalIssues: 4,

  recentActivity: [
    {
      type: "success",
      action: "Security scan completed",
      file: "auth.py",
      time: "2m ago",
    },
    {
      type: "critical",
      action: "SQL Injection vulnerability detected",
      file: "payment.js",
      time: "8m ago",
    },
    {
      type: "info",
      action: "Performance analysis finished",
      file: "dashboard.jsx",
      time: "15m ago",
    },
  ],
};

export const REVIEWS = [
  {
    id: 1,
    filename: "auth.py",
    language: "Python",
    date: "2026-06-23",
    status: "completed",
    score: 9.1,
    rating: "Excellent",
  },
  {
    id: 2,
    filename: "dashboard.jsx",
    language: "React",
    date: "2026-06-22",
    status: "processing",
    score: 0,
    rating: "-",
  },
  {
    id: 3,
    filename: "payment.js",
    language: "JavaScript",
    date: "2026-06-21",
    status: "completed",
    score: 7.8,
    rating: "Good",
  },
];