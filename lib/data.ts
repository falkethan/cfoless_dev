export const company = {
  name: "Buckeye HVAC & Plumbing",
  owner: "Mike",
  revenue: "$2.4M",
  system: "QuickBooks",
  period: "This month"
};

export const ownerGoals = [
  "Improve cash flow",
  "Increase profitability",
  "Understand where the money is going",
  "Hire or expand",
  "Prepare to sell someday",
  "Reduce owner dependency"
];

export const selectedGoals = [
  "Improve cash flow",
  "Increase profitability",
  "Prepare to sell someday"
];

export const booksHealth = {
  name: "Books Health",
  href: "/books-health",
  score: 64,
  label: "Usable with caution",
  change: 0,
  driver: "These books are useful for broad direction, but not clean enough for every decision.",
  tone: "caution"
};

export const businessScores = [
  booksHealth,
  {
    name: "Cash Health",
    href: "/score/cash-health",
    score: 58,
    label: "Needs attention",
    change: -12,
    driver: "Sales are up, but cash is getting tighter.",
    tone: "warn"
  },
  {
    name: "Profit Health",
    href: "/owner-home",
    score: 67,
    label: "Needs attention",
    change: -6,
    driver: "Revenue improved, but payroll is growing faster than sales.",
    tone: "caution"
  },
  {
    name: "Cash Conversion",
    href: "/owner-home",
    score: 51,
    label: "Needs attention",
    change: -15,
    driver: "Too much money is sitting in inventory and unpaid invoices.",
    tone: "warn"
  },
  {
    name: "Sell-Ready Score",
    href: "/owner-home",
    score: 54,
    label: "Needs attention",
    change: 3,
    driver: "The books are improving, but a buyer would still ask questions.",
    tone: "steady"
  }
];

export const booksIssues = [
  "COGS categories changed across months",
  "$18,400 in miscellaneous expenses",
  "A/R aging may not be current",
  "payroll may not be classified consistently"
];

export const bookkeeperQuestions = [
  "Are all bank accounts reconciled through month-end?",
  "Are materials and labor consistently classified as COGS?",
  "Can miscellaneous expenses be reclassified?",
  "Is A/R aging accurate?"
];

export const decisionSafeMap = [
  {
    area: "Revenue trend",
    status: "Safe",
    why: "Revenue categories appear consistent enough for broad trend review"
  },
  {
    area: "Cash trend",
    status: "Safe",
    why: "Cash balance appears usable for high-level decisions"
  },
  {
    area: "Expense review",
    status: "Safe",
    why: "Major operating expenses can be reviewed"
  },
  {
    area: "Gross margin",
    status: "Use caution",
    why: "COGS categories changed across months"
  },
  {
    area: "Job profitability",
    status: "Use caution",
    why: "Labor and materials may not be classified consistently"
  },
  {
    area: "Pricing decisions",
    status: "Use caution",
    why: "Margin data is not clean enough yet"
  },
  {
    area: "Sell-ready analysis",
    status: "Use caution",
    why: "Books need cleanup before buyer-facing analysis"
  }
];

export const progressSinceLastMonth = [
  "Sell-Ready Score improved by 3 points because books cleanup improved.",
  "Cash Health dropped by 12 points because inventory and A/R worsened.",
  "Next unlock: clean up COGS categories and collect overdue invoices."
];

export const askAnswers = [
  {
    question: "What should I fix first?",
    answer:
      "Fix cash conversion first. Cash Health is 58 / Needs attention because sales increased while cash fell by $28,400. More money is tied up in inventory and unpaid invoices. Before focusing on growth or hiring, Mike should collect overdue invoices, slow the next inventory order, and review payroll. Use the books for broad direction, but be careful using margin or job-profit numbers until COGS and payroll are cleaned up."
  },
  {
    question: "Are my books good enough to trust?",
    answer:
      "Books Status is usable with caution. Mike can use the books for broad revenue trend, cash trend, and expense review. Gross margin, job profitability, pricing decisions, and sell-ready analysis should be treated with caution because COGS categories changed, payroll may not be classified consistently, and A/R aging may not be current. Next step: ask the bookkeeper to clean up COGS, payroll, and A/R before using those numbers for big decisions."
  },
  {
    question: "Why is cash down if sales are up?",
    answer:
      "Cash Health is 58 / Needs attention. Sales increased, but cash fell because more money is tied up in inventory and unpaid invoices. Inventory days increased from 42 to 61, and A/R over 30 days increased from $18k to $35k. Mike should collect overdue invoices and slow the next inventory order. Also confirm A/R aging is current before relying on the exact receivables number."
  },
  {
    question: "Can I trust my gross margin number?",
    answer:
      "Use caution. Books Status is usable with caution, and gross margin is one of the areas CFOLess would not fully trust yet. COGS categories changed across months and labor/materials may not be classified consistently. Before using gross margin for pricing or hiring decisions, Mike should ask the bookkeeper to confirm that materials and labor are categorized the same way each month."
  },
  {
    question: "What decision should I avoid until my books are cleaner?",
    answer:
      "Avoid pricing, margin, job profitability, and sell-ready decisions until the books are cleaner. Books Status is usable with caution because COGS categories changed, payroll may not be classified consistently, and A/R aging may not be current. Mike can still use revenue trend and cash trend for broad direction, but should ask the bookkeeper to clean up COGS, payroll, and A/R before making those bigger decisions."
  },
  {
    question: "What would a buyer be worried about?",
    answer:
      "Sell-Ready Score is 54 / Needs attention. A buyer would likely ask whether the books are clean, whether margins are reliable, whether customer concentration is too high, and whether the business depends too much on Mike. The first step is cleaning up COGS categories, A/R aging, and payroll classification so the numbers are easier to trust. Until then, sell-ready analysis should be treated with caution."
  },
  {
    question: "Can I afford to hire right now?",
    answer:
      "Probably not yet. Cash Health is 58 / Needs attention, cash fell by $28,400, A/R over 30 days increased from $18k to $35k, and payroll already grew faster than sales. Hiring right now would add pressure. Before hiring, Mike should improve collections, slow the next inventory order, and confirm the current payroll level is producing enough revenue. Also ask the bookkeeper whether payroll costs are classified correctly."
  },
  {
    question: "What should I ask my bookkeeper this month?",
    answer:
      "Books Status is usable with caution, so Mike should ask questions that make the books more decision-safe. Ask whether all bank accounts are reconciled through month-end, whether A/R aging is current, whether inventory purchases are categorized consistently, and whether payroll costs are classified correctly. Those answers determine whether CFOLess can safely coach on margins, pricing, hiring, and sell-ready analysis."
  }
];
