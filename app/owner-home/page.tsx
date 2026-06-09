"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCopy,
  Download,
  Flag,
  Gauge,
  MessageCircleQuestion,
  PackageCheck,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";

type BriefTab = "Trust" | "Cash" | "Profit" | "Sell-ready" | "Plan";

const chapterLabels: Record<BriefTab, string> = {
  Trust: "Can we trust these numbers?",
  Cash: "Why is cash tight?",
  Profit: "Are we keeping enough profit?",
  "Sell-ready": "Would a buyer trust this?",
  Plan: "What should we do next month?"
};

const chapterIcons = {
  Trust: ShieldCheck,
  Cash: Gauge,
  Profit: Users,
  "Sell-ready": Flag,
  Plan: CheckCircle2
};

const briefTabs: Record<
  BriefTab,
  { answer: string; metrics: Array<{ label: string; value: string }>; why: string; ask: string }
> = {
  Trust: {
    answer: "We can trust the broad direction, but not every decision yet.",
    metrics: [
      { label: "Books Status", value: "Usable with caution" },
      { label: "Safe areas", value: "3" },
      { label: "Caution areas", value: "4" }
    ],
    why: "We know which numbers are safe to use now.",
    ask: "We should confirm COGS, payroll, and A/R aging."
  },
  Cash: {
    answer: "Cash squeeze drivers: overdue invoices, inventory timing, and payroll growth.",
    metrics: [
      { label: "Cash change", value: "-$28.4k" },
      { label: "A/R over 30 days", value: "$35k" },
      { label: "Inventory days", value: "61" }
    ],
    why: "Growth only helps when it turns into cash.",
    ask: "We should check collections, inventory timing, and payroll."
  },
  Profit: {
    answer: "Revenue improved, but payroll grew faster than sales.",
    metrics: [
      { label: "Revenue growth", value: "+8%" },
      { label: "Payroll growth", value: "+14%" },
      { label: "Profit Health", value: "67" }
    ],
    why: "We should understand labor productivity before adding headcount.",
    ask: "We should confirm payroll classification and output."
  },
  "Sell-ready": {
    answer: "Our books are improving, but a buyer would still question the margins.",
    metrics: [
      { label: "Sell-Ready Score", value: "54" },
      { label: "Monthly movement", value: "+3" },
      { label: "Books Status", value: "Caution" }
    ],
    why: "Clean, repeatable numbers make our business easier to trust.",
    ask: "We should prioritize the cleanup a buyer would notice."
  },
  Plan: {
    answer: "In June, we should get more sales to turn into cash.",
    metrics: [
      { label: "Primary focus", value: "Collections" },
      { label: "Next review", value: "June 5" },
      { label: "Open questions", value: "4" }
    ],
    why: "A short monthly operating plan keeps us focused on the few actions that can improve clarity.",
    ask: "We should recheck collections, inventory timing, and payroll."
  }
};

const reviewActions = [
  {
    label: "Confirm A/R aging",
    text: "We should make sure overdue invoices are real and current.",
    status: "Ask bookkeeper",
    icon: ReceiptText
  },
  {
    label: "Inventory timing",
    text: "We should check whether the next large purchase can wait.",
    status: "Review this week",
    icon: PackageCheck
  },
  {
    label: "Compare payroll growth",
    text: "We should compare payroll growth to revenue.",
    status: "Watch next month",
    icon: Users
  }
];

const safeDecisions = [
  { label: "Revenue trend", reason: "Revenue categories are consistent enough for broad direction." },
  { label: "High-level cash trend", reason: "Cash balances support a directional monthly review." },
  { label: "Expense review", reason: "Major operating expenses can be reviewed." }
];

const cautionDecisions = [
  { label: "Gross margin", reason: "COGS categories changed across months." },
  { label: "Job profitability", reason: "Labor and materials may not be classified consistently." },
  { label: "Pricing decisions", reason: "Margin data is not clean enough yet." },
  { label: "Sell-ready analysis", reason: "Books need cleanup before buyer-facing analysis." }
];

const scoreSignals = [
  {
    name: "Cash Conversion",
    score: 51,
    movement: "down 15",
    driver: "Overdue invoices and inventory timing are tying up cash.",
    confidence: "High confidence"
  },
  {
    name: "Profit Health",
    score: 67,
    movement: "down 6",
    driver: "Payroll is growing faster than sales.",
    confidence: "Medium confidence"
  },
  {
    name: "Sell-Ready Score",
    score: 54,
    movement: "up 3",
    driver: "Books are usable, but margin analysis needs caution.",
    confidence: "Medium confidence"
  }
];

const bookkeeperQuestions = [
  { question: "Is A/R aging current as of month-end?", why: "Confirms whether cash collection risk is real." },
  {
    question: "Are inventory purchases categorized consistently?",
    why: "Protects cash conversion and gross margin analysis."
  },
  {
    question: "Are payroll costs classified correctly?",
    why: "Protects hiring readiness and labor profitability."
  },
  {
    question: "Are COGS categories consistent month to month?",
    why: "Makes margin and pricing conclusions more reliable."
  }
];

const askPrompts = [
  "Why is our cash down if sales are up?",
  "Can we afford to hire right now?",
  "What should we ask our bookkeeper?",
  "What should we review before next month?"
];

export default function OwnerHomePage() {
  const [activeTab, setActiveTab] = useState<BriefTab>("Cash");
  const [copied, setCopied] = useState(false);
  const [greeting, setGreeting] = useState("Good afternoon");
  const activeBrief = briefTabs[activeTab];
  const ActiveChapterIcon = chapterIcons[activeTab];

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening");
  }, []);

  function copyQuestions() {
    const text = bookkeeperQuestions
      .map((item, index) => `${index + 1}. ${item.question}\nWhy: ${item.why}`)
      .join("\n\n");

    const fallbackCopy = () => {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      } catch {
        // The prototype still confirms the prepared agenda when browser clipboard access is restricted.
      }
    };

    try {
      void navigator.clipboard.writeText(text).catch(fallbackCopy);
    } catch {
      fallbackCopy();
    }
  }

  return (
    <div className="mx-auto max-w-7xl pb-14">
      <header className="mb-8 px-1 pt-1 md:mb-10">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium text-slate-500">
              {greeting}, Mike. Here&apos;s our May business brief.
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              May 2025 Business Brief
            </div>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-slate-950 md:text-4xl">
              Buckeye HVAC &amp; Plumbing
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              $2.4M revenue &middot; QuickBooks &middot; Last updated May 31, 2025
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/ask"
              className="inline-flex h-11 w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-500 shadow-sm transition hover:border-teal-300 hover:text-teal-800 sm:w-[290px]"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Ask about this brief...
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-900"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export brief
            </button>
          </div>
        </div>
      </header>

      <section className="mb-8 rounded-md bg-[radial-gradient(circle_at_12%_10%,rgba(13,148,136,0.24),transparent_38%),linear-gradient(135deg,#082f35_0%,#07172f_72%)] p-2 text-white shadow-soft">
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.3fr)_290px_minmax(310px,0.72fr)]">
          <div className="rounded-md px-6 py-10 md:px-10 md:py-14 xl:px-11">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Bottom line
            </div>
            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] md:text-5xl">
              Mike, sales are up — but cash is getting squeezed.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg md:leading-8">
              Cash is down $28.4k even though revenue is up 8%. We should review A/R, inventory timing,
              and payroll before we hire or make another large purchase.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="border-l-2 border-teal-400 pl-3">Books usable with caution</span>
              <span className="border-l-2 border-teal-400 pl-3">Next review: June 5</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-md border border-white/10 bg-white/[0.07] px-7 py-11 text-center shadow-inner xl:py-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">Main Focus Score</div>
            <div className="mt-7"><ScoreRing score={51} size="xlarge" dark /></div>
            <div className="mt-7 text-xl font-semibold">Cash Conversion</div>
            <span className="mt-3 rounded-full border border-amber-300/15 bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-200">
              {getScoreBand(51).label}
            </span>
            <p className="mt-5 max-w-48 text-sm leading-6 text-slate-300">Growth is not fully reaching our bank account yet.</p>
            <div className="mt-5 border-t border-white/10 pt-4 text-xs font-semibold text-slate-400">Target: 80+</div>
          </div>

          <div className="rounded-md bg-navy-950/55 px-7 py-10 md:px-8 md:py-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-200">What we should do next</div>
            <ol className="mt-6 divide-y divide-white/10">
              {[
                ["Review overdue invoices", "Confirm our A/R aging is current."],
                ["Check inventory timing", "See whether the next order can wait."],
                ["Review payroll before hiring", "Compare payroll growth to revenue."]
              ].map(([title, note], index) => (
                <li key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-teal-300/20 bg-teal-500/90 text-xs font-semibold text-white">{index + 1}</span>
                  <div>
                    <div className="font-semibold leading-6 text-white">{title}</div>
                    <div className="mt-1.5 text-xs leading-5 text-slate-400">{note}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-16 grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="rounded-md bg-white p-6 shadow-soft md:p-7">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">This month&apos;s decision</div>
          <h2 className="mt-3 max-w-4xl font-serif text-2xl font-semibold leading-9 text-slate-950">
            We should pause hiring or large purchases until we review overdue A/R, inventory timing, and payroll growth.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Revenue", value: "↑ 8%", meaning: "More work completed", tone: "text-teal-700" },
              { label: "Cash", value: "↓ $28.4k", meaning: "Less cash available", tone: "text-rose-700" },
              { label: "Overdue A/R", value: "↑ $17k", meaning: "More unpaid invoices", tone: "text-amber-700" },
              { label: "Books Status", value: "Caution", meaning: "Direction, not every decision", tone: "text-amber-700" }
            ].map((signal) => (
              <div key={signal.label} className="rounded-md bg-slate-50 px-4 py-3">
                <div className="text-xs font-semibold text-slate-500">{signal.label}</div>
                <div className={`mt-1 text-lg font-semibold ${signal.tone}`}>{signal.value}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{signal.meaning}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-md bg-navy-950 p-6 text-white shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-teal-500 text-white">
              <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold">Ask us about this brief</h2>
              <p className="mt-1 text-xs text-slate-400">We answer using this month&apos;s books.</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            {askPrompts.map((prompt) => (
              <Link key={prompt} href="/ask" className="group flex items-center justify-between gap-3 border-b border-white/10 py-2.5 text-xs leading-5 text-slate-200 transition hover:text-teal-200">
                <span>{prompt}</span>
                <ChevronRight className="h-3.5 w-3.5 flex-none text-slate-500 group-hover:text-teal-300" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="mb-16 rounded-md bg-white px-5 py-6 shadow-sm md:px-7">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Our cash story</div>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-slate-950">Sales improved, but more cash is tied up before it reaches the bank.</h2>
          </div>
          <span className="text-xs font-medium text-slate-400">May 2025</span>
        </div>
        <div className="no-scrollbar mt-5 flex items-center gap-2 overflow-x-auto">
          {[
            ["Sales", "+8%", "text-teal-700"],
            ["A/R", "+$17k", "text-amber-700"],
            ["Inventory", "+19 days", "text-amber-700"],
            ["Cash", "-$28.4k", "text-rose-700"]
          ].map(([label, value, tone], index) => (
            <div key={label} className="flex min-w-max flex-1 items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4 flex-none text-slate-300" aria-hidden="true" />}
              <div className="min-w-32 flex-1 rounded-md bg-slate-50 px-4 py-3 text-center">
                <div className="text-xs font-semibold text-slate-500">{label}</div>
                <div className={`mt-1 text-lg font-semibold ${tone}`}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-5 flex items-center gap-3 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Explore the brief</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="no-scrollbar flex overflow-x-auto rounded-t-md border border-b-0 border-slate-200 bg-white px-2 pt-2">
          {(Object.keys(briefTabs) as BriefTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`min-w-max rounded-t-md border-b-2 px-5 py-4 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-teal-600 bg-teal-50 text-teal-800"
                  : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {chapterLabels[tab]}
            </button>
          ))}
        </div>

        <div className="rounded-b-md border border-slate-200 bg-white px-6 py-8 shadow-soft md:px-9 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <ActiveChapterIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Monthly read</div>
                  <div className="mt-1 text-sm font-semibold text-slate-700">{chapterLabels[activeTab]}</div>
                </div>
              </div>
              <p className="mt-6 max-w-3xl font-serif text-2xl font-semibold leading-9 text-slate-950 md:text-3xl md:leading-10">
                {activeBrief.answer}
              </p>
              <div className="mt-8 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">
                {activeBrief.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-md bg-slate-50 px-4 py-3">
                    <div className="text-xl font-semibold text-slate-900">{metric.value}</div>
                    <div className="mt-1 text-xs font-medium text-slate-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-md bg-teal-50/70 p-5">
                <div className="text-sm font-semibold text-teal-800">Why it matters</div>
                <p className="mt-2 text-sm leading-7 text-teal-950">{activeBrief.why}</p>
              </div>
              <div className="rounded-md bg-amber-50/70 p-5">
                <div className="text-sm font-semibold text-amber-900">What we should do next</div>
                <p className="mt-2 text-sm leading-7 text-amber-950">{activeBrief.ask}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-5 flex flex-col gap-4 px-1 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Evidence</div>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-950">Why we&apos;re flagging cash</h2>
            <p className="mt-2 text-sm text-slate-500">Three signals behind the cash warning.</p>
          </div>
          <ScoreBenchmark />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {scoreSignals.map((signal) => {
            const DirectionIcon = signal.movement.startsWith("up") ? ArrowUp : ArrowDown;
            const scoreBand = getScoreBand(signal.score);
            return (
              <article key={signal.name} className="rounded-md bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <ScoreRing score={signal.score} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-900">{signal.name}</h3>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${signal.movement.startsWith("up") ? "text-teal-700" : "text-rose-700"}`}>
                        <DirectionIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        {signal.movement}
                      </span>
                    </div>
                    <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${scoreBand.badgeClass}`}>
                      {scoreBand.label}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-base font-medium leading-7 text-slate-800">{signal.driver}</p>
                <div className="mt-4 flex items-center justify-between gap-3 text-xs font-medium text-slate-400">
                  <span>{signal.confidence}</span>
                  <span>Target: 80+</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mb-16 overflow-hidden rounded-md bg-white shadow-soft">
        <div className="border-b border-slate-100 px-6 py-7 md:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-teal-50 text-teal-700">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Trust checkpoint</div>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-950">Can these books support decisions?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                These are the decisions our current numbers can support. This is not a grade on our accountant.
              </p>
              <p className="mt-2 max-w-3xl text-xs leading-5 text-slate-400">
                We provide decision support based on current financial data. This is not tax, legal, or accounting advice.
              </p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2">
          <DecisionList title="Safe to use" items={safeDecisions} safe />
          <DecisionList title="Use caution" items={cautionDecisions} />
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-6 px-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Action plan</div>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-950">What we recommend reviewing next</h2>
          <p className="mt-2 text-sm text-slate-500">Three checks before we hire or make a large purchase.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-teal-50/70 p-6 md:p-8">
            <Gauge className="h-6 w-6 text-teal-700" aria-hidden="true" />
            <h3 className="mt-5 font-serif text-2xl font-semibold text-slate-950">What&apos;s blocking our cash?</h3>
            <p className="mt-3 text-base font-medium leading-7 text-slate-700">A/R aging, inventory timing, and payroll growth.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["A/R aging", "Inventory days", "Payroll growth", "COGS cleanup"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            {reviewActions.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="flex gap-4 border-b border-slate-200 px-1 py-5 first:pt-0">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-white text-teal-700 shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-950">{index + 1}. {item.label}</h3>
                      <span className="text-xs font-semibold text-teal-700">{item.status}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mb-16 rounded-md bg-white p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Bookkeeper agenda</div>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-950">
              What we should ask our bookkeeper this month
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A ready-made agenda for making next month&apos;s numbers more decision-safe.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCopied(true);
              window.setTimeout(copyQuestions, 0);
            }}
            className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50"
          >
            {copied ? <Check className="h-4 w-4 text-teal-600" aria-hidden="true" /> : <ClipboardCopy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy questions"}
          </button>
        </div>
        <ol className="mt-8 divide-y divide-slate-100">
          {bookkeeperQuestions.map((item, index) => (
            <li key={item.question} className="py-5 first:pt-0 last:pb-0">
              <div className="flex gap-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    <span className="font-semibold text-slate-700">Why:</span> {item.why}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-md bg-navy-950 p-7 text-white shadow-soft md:p-9">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-teal-500 text-white">
            <Flag className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold uppercase tracking-wider text-teal-300">June plan</div>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-white">Get sales to turn into cash.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              We should watch overdue invoices, inventory days, payroll growth, and COGS cleanup.
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {["We should review A/R aging", "We should recheck inventory days", "We should compare payroll growth to revenue"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-100">
                  <CheckCircle2 className="h-5 w-5 flex-none text-teal-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function DecisionList({
  title,
  items,
  safe = false
}: {
  title: string;
  items: Array<{ label: string; reason: string }>;
  safe?: boolean;
}) {
  return (
    <div className={`p-6 md:p-8 ${safe ? "bg-emerald-50/40" : "border-t border-slate-100 bg-amber-50/40 lg:border-l lg:border-t-0"}`}>
      <h3 className={`font-serif text-xl font-semibold ${safe ? "text-emerald-950" : "text-amber-950"}`}>{title}</h3>
      <div className="mt-5 space-y-5">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center gap-2">
              {safe ? (
                <CheckCircle2 className="h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
              ) : (
                <AlertTriangle className="h-4 w-4 flex-none text-amber-600" aria-hidden="true" />
              )}
              <span className="font-semibold text-slate-900">{item.label}</span>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${safe ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {safe ? "Safe" : "Use caution"}
              </span>
            </div>
            <p className="mt-2 pl-6 text-sm leading-6 text-slate-600">{item.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreRing({
  score,
  size = "small",
  dark = false
}: {
  score: number;
  size?: "small" | "large" | "xlarge";
  dark?: boolean;
}) {
  const ringColor = getScoreBand(score).ringColor;
  const degrees = Math.round((score / 100) * 360);
  const outerSize = size === "xlarge" ? "h-32 w-32" : size === "large" ? "h-20 w-20" : "h-16 w-16";
  const innerSize = size === "xlarge" ? "h-24 w-24" : size === "large" ? "h-16 w-16" : "h-12 w-12";
  const scoreSize = size === "xlarge" ? "text-3xl" : size === "large" ? "text-xl" : "text-base";

  return (
    <div
      className={`relative flex flex-none items-center justify-center rounded-full ${outerSize}`}
      style={{
        background: `conic-gradient(${ringColor} 0deg ${degrees}deg, ${
          dark ? "rgba(255,255,255,0.12)" : "#e2e8f0"
        } ${degrees}deg 360deg)`
      }}
      aria-label={`Score ${score} out of 100`}
    >
      <div className={`flex flex-col items-center justify-center rounded-full ${innerSize} ${dark ? "bg-navy-950" : "bg-white"}`}>
        <span className={`${scoreSize} font-semibold ${dark ? "text-white" : "text-slate-950"}`}>{score}</span>
        <span className={`text-[9px] font-semibold ${dark ? "text-slate-400" : "text-slate-400"}`}>/ 100</span>
      </div>
    </div>
  );
}

function getScoreBand(score: number) {
  if (score >= 80) {
    return {
      label: "Strong",
      ringColor: "#0d9488",
      badgeClass: "bg-teal-50 text-teal-700"
    };
  }

  if (score >= 65) {
    return {
      label: "Watch",
      ringColor: "#ca8a04",
      badgeClass: "bg-yellow-50 text-yellow-700"
    };
  }

  if (score >= 50) {
    return {
      label: "Needs attention",
      ringColor: "#f59e0b",
      badgeClass: "bg-amber-50 text-amber-700"
    };
  }

  return {
    label: "Critical",
    ringColor: "#dc2626",
    badgeClass: "bg-rose-50 text-rose-700"
  };
}

function ScoreBenchmark() {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="text-xs font-semibold text-slate-700">Score guide</div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
        {[
          ["80–100", "Strong", "bg-teal-600"],
          ["65–79", "Watch", "bg-yellow-600"],
          ["50–64", "Needs attention", "bg-amber-500"],
          ["0–49", "Critical", "bg-rose-600"]
        ].map(([range, label, color]) => (
          <span key={range} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            <span><strong className="font-semibold text-slate-700">{range}</strong> {label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
