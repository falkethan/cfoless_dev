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
  Info,
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
  "Sell-ready": "Could we sell this business right now?",
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
    answer: "Books are usable with caution.",
    metrics: [
      { label: "Broad direction", value: "Usable" },
      { label: "Major decisions", value: "Confirm first" }
    ],
    why: "We can trust the broad direction.",
    ask: "We should confirm a few categories before major decisions."
  },
  Cash: {
    answer: "Cash is getting stuck before it reaches the bank.",
    metrics: [
      { label: "Cash change", value: "-$28.4k" },
      { label: "Unpaid invoices", value: "$35k" },
      { label: "Inventory timing", value: "61 days" }
    ],
    why: "Growth only helps when it turns into cash.",
    ask: "We should check collections, inventory timing, and payroll."
  },
  Profit: {
    answer: "Sales improved, but payroll grew faster than sales.",
    metrics: [
      { label: "Sales growth", value: "+8%" },
      { label: "Payroll growth", value: "+14%" },
      { label: "Profitability", value: "67" }
    ],
    why: "We should understand labor productivity before adding headcount.",
    ask: "We should confirm payroll classification and output."
  },
  "Sell-ready": {
    answer: "Our books are improving, but a buyer would still question our profit numbers.",
    metrics: [
      { label: "Business Value Readiness", value: "54" },
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
    label: "Confirm unpaid invoices",
    text: "We should make sure overdue invoices are real and current.",
    status: "Ask bookkeeper",
    icon: ReceiptText
  },
  {
    label: "Review inventory timing",
    text: "We should check whether the next large purchase can wait.",
    status: "Review this week",
    icon: PackageCheck
  },
  {
    label: "Compare payroll growth",
    text: "We should compare payroll growth to sales.",
    status: "Watch next month",
    icon: Users
  }
];

const safeDecisions = [
  { label: "Sales trend", reason: "Sales categories are consistent enough for broad direction." },
  { label: "Cash trend", reason: "Cash balances support a directional monthly review." },
  { label: "Expense review", reason: "Major operating expenses can be reviewed." }
];

const cautionMeaning =
  "Use caution means these numbers are directionally helpful, but we should confirm the underlying categories before using them for major decisions.";

const cautionDecisions = [
  {
    label: "What we make per job",
    reason: "Direct job cost categories changed across months.",
    action: "We should confirm direct job cost categories before using profit numbers for major decisions.",
    cta: "Confirm categories"
  },
  {
    label: "Which jobs actually make money",
    reason: "Labor and materials may not be classified consistently.",
    action: "We should confirm labor and material categories before comparing jobs.",
    cta: "Ask bookkeeper"
  },
  {
    label: "Whether prices cover costs",
    reason: "Profit data is not clean enough yet.",
    action: "We should review direct job cost categories before changing prices.",
    cta: "Review this week"
  },
  {
    label: "How a buyer would value the business",
    reason: "Books need cleanup before buyer-facing review.",
    action: "We should clean up direct job cost and payroll categories before buyer review.",
    cta: "Clean up first"
  }
];

const scoreSignals = [
  {
    name: "Cash Flow Health",
    score: 51,
    movement: "down 15",
    driver: "Unpaid invoices and inventory timing are tying up cash."
  },
  {
    name: "Profitability",
    score: 67,
    movement: "down 6",
    driver: "Payroll is growing faster than sales this month."
  },
  {
    name: "Business Value Readiness",
    score: 54,
    movement: "up 3",
    driver: "Books are usable, but profit analysis needs caution."
  }
];

const bookkeeperQuestions = [
  { question: "Are our unpaid invoices current as of month-end?", why: "Confirms whether cash collection risk is real." },
  {
    question: "Are inventory and parts purchases categorized consistently?",
    why: "Protects cash flow and profit analysis."
  },
  {
    question: "Are payroll costs classified correctly?",
    why: "Protects hiring readiness and labor profitability."
  },
  {
    question: "Are direct job cost categories consistent month to month?",
    why: "Makes profit and pricing conclusions more reliable."
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
    <div className="mx-auto min-w-0 max-w-[1340px] overflow-x-hidden pb-14">
      <header className="mb-6 border-b border-slate-200/70 px-1 pb-5 pt-0 md:mb-10 md:pb-7 md:pt-1">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="mb-3 hidden text-sm font-medium text-slate-500 sm:block">
              {greeting}, Mike. Here&apos;s our May business brief.
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              May 2025 Business Brief
            </div>
            <h1 className="mt-3 font-serif text-2xl font-semibold text-slate-950 md:text-4xl">
              Buckeye HVAC &amp; Plumbing
            </h1>
            <p className="mt-2 text-xs leading-5 text-slate-500 md:text-sm">
              $2.4M sales &middot; QuickBooks &middot; Last updated May 31, 2025
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/ask"
              className="inline-flex h-11 w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-500 shadow-sm transition hover:border-teal-300 hover:text-teal-800 sm:w-[290px]"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Ask about this brief...
            </Link>
            <button
              type="button"
              className="hidden items-center justify-center gap-2 rounded-md bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-900 sm:inline-flex"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Export brief
            </button>
          </div>
        </div>
      </header>

      <section className="mb-5 text-white">
        <div className="grid gap-2 xl:grid-cols-[minmax(0,1.3fr)_310px_minmax(320px,0.72fr)]">
          <div className="rounded-md bg-[radial-gradient(circle_at_12%_10%,rgba(13,148,136,0.24),transparent_38%),linear-gradient(135deg,#082f35_0%,#07172f_72%)] px-5 py-7 shadow-soft md:px-10 md:py-14 xl:px-12 xl:py-16">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Bottom line
            </div>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl font-semibold leading-[1.12] md:mt-6 md:text-5xl md:leading-[1.08]">
              Mike, sales are up — but cash is getting squeezed.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-200 md:mt-6 md:text-lg md:leading-8">
              Cash is down $28.4k even though sales are up 8%. We should review unpaid invoices, inventory timing,
              and payroll before we hire or make another large purchase.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-300 md:mt-9 md:gap-x-6 md:text-sm">
              <span className="border-l-2 border-teal-400 pl-3">Books usable with caution</span>
              <span className="border-l-2 border-teal-400 pl-3">Next review: June 5</span>
            </div>
          </div>

          <div className="lg:hidden">
            <ScoreSection mobile />
          </div>

          <div className="hidden flex-col items-center justify-center rounded-md bg-[#142b43] px-8 py-12 text-center shadow-soft lg:flex xl:py-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">This Month&apos;s #1 Priority</div>
            <div className="mt-7"><ScoreRing score={51} size="xlarge" dark /></div>
            <div className="mt-7 text-xl font-semibold" title="Cash conversion: how quickly sales turn into real cash in the bank.">Cash Flow Health</div>
            <span className="mt-3 rounded-full border border-amber-300/15 bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-200">
              {getScoreBand(51).label}
            </span>
            <p className="mt-5 max-w-52 text-[15px] leading-6 text-slate-300">Growth is not fully reaching our bank account yet.</p>
          </div>

          <div className="rounded-md bg-navy-950 px-5 py-7 shadow-soft md:px-9 md:py-12 xl:py-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-teal-200">What we should do next</div>
            <ol className="mt-6 divide-y divide-white/10">
              {[
                ["Review unpaid invoices", "Confirm our unpaid invoice list is current."],
                ["Check inventory timing", "See whether the next order can wait."],
                ["Review payroll before hiring", "Compare payroll growth to sales."]
              ].map(([title, note], index) => (
                <li key={title} className="flex gap-4 py-4 first:pt-0 last:pb-0 md:py-6">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-teal-300/20 bg-teal-500/90 text-xs font-semibold text-white">{index + 1}</span>
                  <div>
                    <div className="font-semibold leading-6 text-white">{title}</div>
                    <div className="mt-1.5 text-sm leading-6 text-slate-400">{note}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="hidden lg:block">
        <ScoreSection />
      </div>

      <section className="mb-16 grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="rounded-md border border-slate-200/70 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.045)] md:p-9">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">This month&apos;s decision</div>
          <h2 className="mt-3 max-w-4xl font-serif text-xl font-semibold leading-8 text-slate-950 md:mt-4 md:text-3xl md:leading-10">
            We should pause hiring or large purchases until we review unpaid invoices, inventory timing, and payroll growth.
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-2 border-t border-slate-100 pt-5 md:mt-8 md:flex md:max-w-full md:items-stretch md:gap-0 md:overflow-x-auto md:pt-6">
            {[
              ["Sales", "+8%", "text-teal-700"],
              ["Unpaid invoices", "+$17k", "text-amber-700"],
              ["Inventory timing", "+19 days", "text-amber-700"],
              ["Cash", "-$28.4k", "text-rose-700"]
            ].map(([label, value, tone], index) => (
              <div key={label} className="flex min-w-0 flex-1 items-center md:min-w-36">
                {index > 0 && <ChevronRight className="mx-1 hidden h-4 w-4 flex-none text-slate-300 md:block" aria-hidden="true" />}
                <div className="h-full flex-1 rounded-md bg-slate-50/70 px-3 py-3 text-center md:rounded-none md:bg-slate-50/55 md:px-4 md:py-3.5">
                  <div className="text-xs font-semibold text-slate-500">{label}</div>
                  <div className={`mt-1 text-lg font-semibold ${tone}`}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-md bg-navy-950 p-7 text-white shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-teal-500 text-white">
              <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold">Suggested questions</h2>
              <p className="mt-1 text-sm leading-5 text-slate-400">Prompts based on this month&apos;s brief.</p>
            </div>
          </div>
          <div className="mt-5">
            {askPrompts.map((prompt) => (
              <Link key={prompt} href="/ask" className="group flex items-center justify-between gap-3 border-b border-white/10 py-3.5 text-sm leading-5 text-slate-200 transition hover:bg-white/[0.04] hover:px-2 hover:text-teal-200">
                <span>{prompt}</span>
                <ChevronRight className="h-4 w-4 flex-none text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-teal-300" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link href="/ask" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 transition hover:text-teal-200">
            Ask another question
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section className="mb-16 min-w-0">
        <div className="mb-4 flex items-center gap-3 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Explore the brief</span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="no-scrollbar flex max-w-full overflow-x-auto border-b border-slate-200">
          {(Object.keys(briefTabs) as BriefTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`min-w-max border-b-2 px-6 py-5 text-sm font-semibold leading-5 transition lg:min-w-0 lg:flex-1 lg:px-2 ${
                activeTab === tab
                  ? "border-teal-600 bg-white text-teal-900 shadow-[inset_0_-1px_0_#0d9488]"
                  : "border-transparent text-slate-500 hover:border-teal-200 hover:bg-white/70 hover:text-slate-900"
              }`}
            >
              {chapterLabels[tab]}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-md border border-slate-200 bg-white px-7 py-9 shadow-soft md:px-10 md:py-11">
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
              <div className={`mt-8 grid gap-3 border-t border-slate-100 pt-6 ${activeBrief.metrics.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                {activeBrief.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-md bg-slate-50 px-4 py-3">
                    <div className="text-xl font-semibold text-slate-900">{metric.value}</div>
                    <div className="mt-1 text-xs font-medium text-slate-500">{metric.label}</div>
                  </div>
                ))}
              </div>
              {activeTab === "Trust" && (
                <a href="#trust-checkpoint" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-900">
                  Review trust checkpoint
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
            <div className="grid gap-4">
              <div className="rounded-md border border-teal-100/70 bg-teal-50/70 p-6">
                <div className="text-sm font-semibold text-teal-800">Why it matters</div>
                <p className="mt-2 text-[15px] leading-7 text-teal-950">{activeBrief.why}</p>
              </div>
              <div className="rounded-md border border-amber-100/70 bg-amber-50/70 p-6">
                <div className="text-sm font-semibold text-amber-900">What we should do next</div>
                <p className="mt-2 text-[15px] leading-7 text-amber-950">{activeBrief.ask}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ActionPlan />

      <section className="mb-16 overflow-hidden rounded-md border border-slate-200/80 bg-white shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="px-6 pt-7 md:px-9 md:pt-9">
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
              copyQuestions();
              window.setTimeout(() => setCopied(false), 1800);
            }}
            className="mr-6 mt-7 inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-teal-300 hover:bg-teal-50 md:mr-9 md:mt-9"
          >
            {copied ? <Check className="h-4 w-4 text-teal-600" aria-hidden="true" /> : <ClipboardCopy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "Copied" : "Copy questions"}
          </button>
        </div>
        <ol className="mt-8 grid gap-x-10 border-t border-slate-100 bg-slate-50/35 px-6 pb-4 pt-2 md:px-9 lg:grid-cols-2">
          {bookkeeperQuestions.map((item, index) => (
            <li key={item.question} className="border-b border-slate-200/70 py-6">
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

      <TrustCheckpoint />

      <section className="rounded-md border border-teal-300/10 bg-[linear-gradient(135deg,#07172f_0%,#09283a_100%)] p-7 text-white shadow-soft md:p-10">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-teal-500 text-white">
            <Flag className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold uppercase tracking-wider text-teal-300">Next Month&apos;s Plan</div>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-white">Get sales to turn into cash.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              We should watch unpaid invoices, inventory timing, payroll growth, and direct job costs.
            </p>
            <ul className="mt-7 grid gap-3 border-t border-white/10 pt-6 md:grid-cols-3">
              {["We should review unpaid invoices", "We should recheck inventory timing", "We should compare payroll growth to sales"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-100">
                  <CheckCircle2 className="h-5 w-5 flex-none text-teal-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center">
        <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">CFOLess Private Briefing</div>
        <p className="mt-3 text-xs text-slate-400">Buckeye HVAC &amp; Plumbing &middot; May 2025</p>
      </footer>
    </div>
  );
}

function ActionPlan() {
  return (
    <section className="mb-16">
      <div className="mb-6 px-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Action plan</div>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-950">What we recommend reviewing next</h2>
        <p className="mt-2 text-sm text-slate-500">Three checks before we hire or make a large purchase.</p>
      </div>
      <div className="overflow-hidden rounded-md border border-slate-200/80 bg-white shadow-soft lg:grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="bg-teal-50/60 p-8 md:p-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-700 shadow-sm">
            <Gauge className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-6 font-serif text-2xl font-semibold text-slate-950">What is keeping cash from reaching us?</h3>
          <p className="mt-3 text-base font-medium leading-7 text-slate-700">Unpaid invoices, inventory timing, and payroll growth.</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Unpaid invoices", "Inventory timing", "Payroll growth", "Direct job costs"].map((item) => (
              <span
                key={item}
                title={item === "Unpaid invoices" ? "A/R" : item === "Direct job costs" ? "COGS" : undefined}
                className="rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="divide-y divide-slate-100 border-t border-slate-100 px-7 py-4 md:px-9 lg:border-l lg:border-t-0">
          {reviewActions.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="flex gap-4 py-6">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-slate-50 text-teal-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-950">{index + 1}. {item.label}</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-teal-700">{item.status}</span>
                  </div>
                  <p className="mt-2 text-[15px] leading-6 text-slate-600">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScoreSection({ mobile = false }: { mobile?: boolean }) {
  return (
    <section className={mobile ? "text-slate-900" : "mb-14"}>
      <div className={mobile ? "grid gap-2" : "grid gap-4 lg:grid-cols-3"}>
        {scoreSignals.map((signal) => {
          const DirectionIcon = signal.movement.startsWith("up") ? ArrowUp : ArrowDown;
          const scoreBand = getScoreBand(signal.score);
          return (
            <article
              key={signal.name}
              className={
                mobile
                  ? "flex min-h-0 flex-col rounded-md border border-slate-200/70 bg-white px-5 py-4 shadow-[0_8px_22px_rgba(15,23,42,0.05)]"
                  : "flex min-h-52 flex-col rounded-md border border-slate-200/60 bg-white px-7 py-6 shadow-[0_12px_32px_rgba(15,23,42,0.045)] transition hover:border-slate-300/80 hover:shadow-[0_16px_38px_rgba(15,23,42,0.065)]"
              }
            >
              <div className={mobile ? "flex items-center gap-4" : "flex items-center gap-5"}>
                <ScoreRing score={signal.score} size={mobile ? "small" : "large"} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3
                      className="text-base font-semibold text-slate-900"
                      title={
                        signal.name === "Cash Flow Health"
                          ? "Cash conversion: how quickly sales turn into real cash in the bank."
                          : signal.name === "Profitability"
                            ? "How much money we actually keep after expenses."
                            : "Buyer readiness: how attractive the business would look to a buyer."
                      }
                    >
                      {signal.name}
                    </h3>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${signal.movement.startsWith("up") ? "text-teal-700" : "text-rose-700"}`}>
                      <DirectionIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {signal.movement}
                    </span>
                  </div>
                  <span className={`mt-2.5 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${scoreBand.badgeClass}`}>
                    {scoreBand.label}
                  </span>
                </div>
              </div>
              <p className={mobile ? "mt-3 text-sm font-medium leading-6 text-slate-600" : "mt-6 border-t border-slate-100 pt-5 text-[15px] font-medium leading-7 text-slate-700"}>{signal.driver}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TrustCheckpoint() {
  return (
    <section id="trust-checkpoint" className="mb-16 scroll-mt-8 overflow-hidden rounded-md border border-slate-200/80 bg-white shadow-soft">
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
  );
}

function DecisionList({
  title,
  items,
  safe = false
}: {
  title: string;
  items: Array<{ label: string; reason: string; action?: string; cta?: string }>;
  safe?: boolean;
}) {
  return (
    <div className={`p-6 md:p-8 ${safe ? "bg-emerald-50/30" : "border-t border-slate-100 bg-amber-50/15 lg:border-l lg:border-t-0"}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className={`font-serif text-xl font-semibold ${safe ? "text-emerald-950" : "text-amber-950"}`}>{title}</h3>
      </div>
      <div className={`mt-5 ${safe ? "space-y-5" : "divide-y divide-slate-200/70"}`}>
        {items.map((item) => (
          <div
            key={item.label}
            className={safe ? undefined : "py-4 first:pt-0 last:pb-0"}
          >
            <div className="flex flex-wrap items-center gap-2">
              {safe ? (
                <CheckCircle2 className="h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
              ) : (
                <AlertTriangle className="h-4 w-4 flex-none text-amber-500" aria-hidden="true" />
              )}
              <span
                className="font-semibold text-slate-900"
                title={
                  item.label === "What we make per job"
                    ? "Gross margin"
                    : item.label === "How a buyer would value the business"
                      ? "Buyer readiness"
                      : undefined
                }
              >
                {item.label}
              </span>
              {safe && <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">Safe</span>}
            </div>
            {safe ? (
              <p className="mt-2 pl-6 text-sm leading-6 text-slate-600">{item.reason}</p>
            ) : (
              <div className="mt-2 pl-6">
                <p className="text-sm leading-6 text-slate-600">{item.reason}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {item.cta}
                  </span>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-teal-700 transition hover:text-teal-900">
                      <Info className="h-3.5 w-3.5" aria-hidden="true" />
                      What does this mean?
                    </summary>
                    <div className="mt-2 max-w-md rounded-md bg-white/80 px-3 py-2.5 text-xs leading-5 text-slate-600 shadow-sm ring-1 ring-slate-200/70">
                      <p>{cautionMeaning}</p>
                      <p className="mt-1.5 font-medium text-slate-700">{item.action}</p>
                    </div>
                  </details>
                </div>
              </div>
            )}
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
