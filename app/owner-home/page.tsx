"use client";

import { useState } from "react";
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
  Clock3,
  Download,
  Flag,
  Gauge,
  MessageCircleQuestion,
  PackageCheck,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";

type BriefTab = "Trust" | "Cash" | "Profit" | "Sell-ready" | "Plan";

const chapterLabels: Record<BriefTab, string> = {
  Trust: "01 Trust Check",
  Cash: "02 Cash Constraint",
  Profit: "03 Profit Signals",
  "Sell-ready": "04 Sell-Ready Watch",
  Plan: "05 June Plan"
};

const briefTabs: Record<
  BriefTab,
  { answer: string; metrics: Array<{ label: string; value: string }>; why: string; ask: string }
> = {
  Trust: {
    answer:
      "We can use the books for broad cash and revenue direction, but a few areas need cleanup before we rely on margins, pricing, or sell-ready analysis.",
    metrics: [
      { label: "Books Status", value: "Usable with caution" },
      { label: "Safe areas", value: "3" },
      { label: "Caution areas", value: "4" }
    ],
    why: "Decision quality depends on knowing which numbers are reliable enough to use today.",
    ask: "Are COGS, payroll, and A/R aging current and consistently classified?"
  },
  Cash: {
    answer: "Cash squeeze drivers: overdue invoices, inventory timing, and payroll growth.",
    metrics: [
      { label: "Cash change", value: "-$28.4k" },
      { label: "A/R over 30 days", value: "$35k" },
      { label: "Inventory days", value: "61" }
    ],
    why: "Growth only helps when it turns into cash.",
    ask: "Check collections, inventory timing, and payroll productivity."
  },
  Profit: {
    answer:
      "Revenue improved, but payroll grew faster than sales, so the additional activity did not create as much profit flexibility as expected.",
    metrics: [
      { label: "Revenue growth", value: "+8%" },
      { label: "Payroll growth", value: "+14%" },
      { label: "Profit Health", value: "67" }
    ],
    why: "Payroll productivity matters before Mike considers adding headcount or expanding capacity.",
    ask: "Are payroll costs classified correctly, and is current labor producing enough revenue?"
  },
  "Sell-ready": {
    answer:
      "The books are improving, but a buyer would still ask questions about margin reliability, customer concentration, and owner dependency.",
    metrics: [
      { label: "Sell-Ready Score", value: "54" },
      { label: "Monthly movement", value: "+3" },
      { label: "Books Status", value: "Caution" }
    ],
    why: "Clean, repeatable numbers make the business easier to understand and easier to trust.",
    ask: "Which cleanup items would create the clearest buyer-facing financial story?"
  },
  Plan: {
    answer: "June is about getting sales to turn into cash while improving confidence in the books.",
    metrics: [
      { label: "Primary focus", value: "Collections" },
      { label: "Next review", value: "June 5" },
      { label: "Open questions", value: "4" }
    ],
    why: "A short monthly operating plan keeps us focused on the few actions that can improve clarity.",
    ask: "What changed after collections, inventory timing, and payroll productivity were reviewed?"
  }
};

const reviewActions = [
  {
    label: "Confirm A/R aging",
    text: "Make sure overdue invoices are real and current.",
    status: "Ask bookkeeper",
    icon: ReceiptText
  },
  {
    label: "Inventory timing",
    text: "Check whether the next large purchase can wait.",
    status: "Review this week",
    icon: PackageCheck
  },
  {
    label: "Compare payroll growth",
    text: "Review whether payroll is growing faster than revenue.",
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
  "Are our books good enough to trust?",
  "What should we ask our bookkeeper?"
];

export default function OwnerHomePage() {
  const [activeTab, setActiveTab] = useState<BriefTab>("Cash");
  const [copied, setCopied] = useState(false);
  const activeBrief = briefTabs[activeTab];

  async function copyQuestions() {
    const text = bookkeeperQuestions
      .map((item, index) => `${index + 1}. ${item.question}\nWhy: ${item.why}`)
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mx-auto max-w-7xl pb-14">
      <header className="mb-8 px-1 pt-1 md:mb-10">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
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
              className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-teal-300 hover:text-teal-800"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Ask us...
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

      <div className="mb-16 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
          <section className="rounded-md bg-[radial-gradient(circle_at_12%_10%,rgba(13,148,136,0.24),transparent_38%),linear-gradient(135deg,#082f35_0%,#07172f_72%)] px-6 py-10 text-white shadow-soft md:px-10 md:py-14 xl:px-12 xl:py-16">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-teal-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Bottom line
            </div>
            <h2 className="mt-7 max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-5xl xl:text-6xl">
              Mike, sales are up — but cash is getting squeezed.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-100 md:text-xl md:leading-9">
              The business is growing, but more of our money is stuck in unpaid invoices and inventory.
              Before we hire or make another large purchase, we should review collections, inventory timing,
              and payroll growth.
            </p>

            <div className="mt-8 flex max-w-2xl flex-col gap-4 rounded-md border border-amber-300/20 bg-white/10 p-4 sm:flex-row sm:items-center">
              <ScoreRing score={51} size="large" dark />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">Main Focus Score</div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-lg font-semibold text-white">Cash Conversion</span>
                  <span className="rounded-full bg-amber-300/15 px-2.5 py-1 text-xs font-semibold text-amber-200">
                    Needs attention
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  More of our cash is stuck in unpaid invoices and inventory.
                </p>
              </div>
            </div>

            <div className="mt-9 grid gap-5 border-t border-white/15 pt-7 sm:grid-cols-3">
              {[
                { label: "Revenue increased", value: "Revenue up 8%", icon: TrendingUp },
                { label: "Cash decreased", value: "Cash down $28.4k", icon: ArrowDown },
                { label: "A/R over 30 days moved from $18k to $35k", value: "Overdue A/R up $17k", icon: Clock3 }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <Icon className="mt-1 h-4 w-4 flex-none text-teal-300" aria-hidden="true" />
                    <div>
                      <div className="text-2xl font-semibold">{item.value}</div>
                      <div className="mt-1 text-sm text-slate-300">{item.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
              {["Books Status: Usable with caution", "Next review: June 5"].map((item) => (
                <span key={item} className="border-l-2 border-teal-400 pl-3">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <aside className="rounded-md bg-navy-950 px-6 py-8 text-white shadow-soft xl:px-7 xl:py-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-teal-500 text-white">
                <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold">Ask us about this brief</h2>
                <p className="mt-1 text-xs text-slate-400">We answer using this month&apos;s books.</p>
              </div>
            </div>
            <div className="mt-6 space-y-1">
              {askPrompts.map((prompt) => (
                <Link
                  key={prompt}
                  href="/ask"
                  className="group flex items-center justify-between gap-3 border-b border-white/10 py-3 text-sm leading-5 text-slate-200 transition hover:text-teal-200"
                >
                  <span>{prompt}</span>
                  <ChevronRight className="h-4 w-4 flex-none text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-teal-300" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <Link href="/ask" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200">
              Ask another question
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
      </div>

      <section className="-mt-10 mb-16 px-4 md:px-8">
        <div className="rounded-md bg-white px-5 py-6 shadow-soft md:px-7 md:py-7">
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">How sales turned into less cash</div>
              <h2 className="mt-2 font-serif text-xl font-semibold text-slate-950">Growth is getting held up before it reaches the bank.</h2>
            </div>
            <span className="text-xs font-medium text-slate-400">May 2025 cash story</span>
          </div>
          <div className="no-scrollbar flex items-stretch gap-2 overflow-x-auto py-5">
            {[
              { label: "Sales grew", value: "+8%", note: "More work completed", tone: "text-teal-700" },
              { label: "Invoices waited", value: "+$17k", note: "More overdue A/R", tone: "text-amber-700" },
              { label: "Inventory waited", value: "+19 days", note: "Cash tied up longer", tone: "text-amber-700" },
              { label: "Cash tightened", value: "-$28.4k", note: "Less cash available", tone: "text-rose-700" }
            ].map((item, index) => (
              <div key={item.label} className="flex min-w-max flex-1 items-center gap-2">
                {index > 0 && <ChevronRight className="h-4 w-4 flex-none text-slate-300" aria-hidden="true" />}
                <div className="min-w-36 flex-1 rounded-md bg-slate-50 px-4 py-3">
                  <div className="text-xs font-semibold text-slate-500">{item.label}</div>
                  <div className={`mt-1 text-lg font-semibold ${item.tone}`}>{item.value}</div>
                  <div className="mt-1 text-xs text-slate-400">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-5">
            <div className="text-sm font-semibold text-slate-950">Before we make a big move, let&apos;s review:</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                ["Collections", "Are overdue invoices current?"],
                ["Inventory timing", "Can the next order wait?"],
                ["Payroll growth", "Is payroll outpacing sales?"]
              ].map(([title, question], index) => (
                <div key={title} className="flex items-start gap-3 rounded-md bg-teal-50/70 px-3 py-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">{index + 1}</span>
                  <div>
                    <div className="text-sm font-semibold text-teal-950">{title}</div>
                    <div className="mt-1 text-xs leading-5 text-teal-800">{question}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-5 flex items-center gap-3 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Explore the brief</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="no-scrollbar flex overflow-x-auto border-b border-slate-200">
          {(Object.keys(briefTabs) as BriefTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`min-w-max border-b-2 px-5 py-4 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-teal-600 bg-teal-50/60 text-teal-800"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {chapterLabels[tab]}
            </button>
          ))}
        </div>

        <div className="bg-white px-6 py-8 shadow-sm md:px-9 md:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-teal-700">
                {chapterLabels[activeTab]}
              </div>
              <p className="mt-4 max-w-3xl font-serif text-2xl font-semibold leading-9 text-slate-950 md:text-3xl md:leading-10">
                {activeBrief.answer}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-slate-100 pt-6">
                {activeBrief.metrics.map((metric) => (
                  <div key={metric.label} className="min-w-28">
                    <div className="text-xl font-semibold text-slate-900">{metric.value}</div>
                    <div className="mt-1 text-xs font-medium text-slate-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 border-slate-100 lg:border-l lg:pl-8">
              <div>
                <div className="text-sm font-semibold text-teal-800">Why it matters</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{activeBrief.why}</p>
              </div>
              <div className="border-t border-slate-100 pt-5">
                <div className="text-sm font-semibold text-slate-900">What to ask next</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{activeBrief.ask}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-5 px-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Evidence</div>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-950">
            Why we&apos;re flagging cash
          </h2>
          <p className="mt-2 text-sm text-slate-500">Three signals behind the cash warning.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {scoreSignals.map((signal) => {
            const DirectionIcon = signal.movement.startsWith("up") ? ArrowUp : ArrowDown;
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
                    <span className="mt-2 inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">Needs attention</span>
                  </div>
                </div>
                <p className="mt-3 text-base font-medium leading-7 text-slate-800">{signal.driver}</p>
                <div className="mt-4 text-xs font-medium text-slate-400">{signal.confidence}</div>
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
            <h3 className="mt-5 font-serif text-2xl font-semibold text-slate-950">What&apos;s blocking cash?</h3>
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
            onClick={copyQuestions}
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
              Watch overdue invoices, inventory days, payroll growth, and COGS cleanup.
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {["Review A/R aging", "Recheck inventory days", "Compare payroll growth vs. revenue growth"].map((item) => (
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
  size?: "small" | "large";
  dark?: boolean;
}) {
  const ringColor = score >= 70 ? "#0d9488" : score >= 50 ? "#fbbf24" : "#f87171";
  const degrees = Math.round((score / 100) * 360);
  const outerSize = size === "large" ? "h-20 w-20" : "h-16 w-16";
  const innerSize = size === "large" ? "h-16 w-16" : "h-12 w-12";
  const scoreSize = size === "large" ? "text-xl" : "text-base";

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
