import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Flag,
  Mountain,
  ShieldCheck,
  Star,
  Target,
  TrendingUp
} from "lucide-react";
import { progressSinceLastMonth } from "@/lib/data";
import { BottomLine } from "@/components/ui";

const actionItems = [
  "Collect overdue invoices",
  "Slow the next inventory order",
  "Review payroll before hiring"
];

const goalItems = [
  { label: "Improve cash flow", icon: CircleDollarSign },
  { label: "Improve profit", icon: BarChart3 },
  { label: "Sell someday", icon: Flag }
];

const watchRows = [
  {
    name: "Books Status",
    detail: "Usable with caution",
    description:
      "These books are useful for broad direction, but not clean enough for every decision.",
    pill: "Needs cleanup",
    tone: "amber",
    icon: ShieldCheck,
    href: "/books-health"
  },
  {
    name: "Profit Health",
    detail: "67 / Needs attention",
    description: "Revenue improved, but payroll is growing faster than sales.",
    pill: "6 points",
    tone: "rose",
    icon: TrendingUp,
    href: "/owner-home",
    direction: "down"
  },
  {
    name: "Cash Conversion",
    detail: "51 / Needs attention",
    description: "Too much money is sitting in inventory and unpaid invoices.",
    pill: "15 points",
    tone: "rose",
    icon: Target,
    href: "/score/cash-health",
    direction: "down"
  },
  {
    name: "Sell-Ready Score",
    detail: "54 / Needs attention",
    description: "The books are improving, but a buyer would still ask questions.",
    pill: "3 points",
    tone: "teal",
    icon: ShieldCheck,
    href: "/owner-home",
    direction: "up"
  }
];

function StatusPill({
  pill,
  tone,
  direction
}: {
  pill: string;
  tone: string;
  direction?: string;
}) {
  const DirectionIcon = direction === "up" ? ArrowUp : direction === "down" ? ArrowDown : AlertTriangle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        tone === "teal"
          ? "bg-teal-50 text-teal-700"
          : tone === "rose"
            ? "bg-rose-50 text-rose-700"
            : "bg-amber-50 text-amber-700"
      }`}
    >
      <DirectionIcon className="h-3.5 w-3.5" aria-hidden="true" />
      {pill}
    </span>
  );
}

export default function OwnerHomePage() {
  return (
    <div className="mx-auto max-w-6xl pb-6">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            Your monthly focus
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-normal text-slate-950 md:text-5xl">
            Mike, here&apos;s what matters most this month.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            CFOLess looked at your books, your goals, and what changed. Here&apos;s where to focus
            right now.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
        >
          <CalendarDays className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <span>May 2025</span>
          <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
        </button>
      </div>

      <BottomLine>
        Sales improved, but cash got tighter. Mike should focus this month on collecting invoices,
        slowing inventory purchases, and reviewing payroll before hiring.
      </BottomLine>

      <section className="mb-8 overflow-hidden rounded-md border border-teal-900/20 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.25),transparent_32%),linear-gradient(135deg,#053f3b_0%,#062b2e_48%,#02172d_100%)] p-6 text-white shadow-soft md:p-8">
        <div className="grid gap-7 lg:grid-cols-[150px_minmax(0,1fr)_350px] lg:items-center">
          <div className="hidden justify-center lg:flex">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white/10 shadow-2xl">
              <div className="absolute h-28 w-28 rounded-full border-[15px] border-white" />
              <div className="absolute h-16 w-16 rounded-full border-[11px] border-navy-950/80 bg-white" />
              <div className="absolute h-5 w-5 rounded-full bg-teal-400" />
              <ArrowRight className="absolute -right-1 top-4 h-20 w-20 -rotate-45 text-teal-300" aria-hidden="true" />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-teal-200">
              This month&apos;s focus
            </div>
            <h2 className="mt-4 max-w-lg font-serif text-3xl font-semibold leading-tight">
              Focus on cash conversion before anything else.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-100">
              Sales are up, but more money is tied up in inventory and unpaid invoices.
            </p>
          </div>

          <div className="rounded-md border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-wider text-teal-200">
              Do these 3 things next
            </div>
            <ol className="mt-5 space-y-4">
              {actionItems.map((item, index) => (
                <li key={item} className="flex items-center gap-4 text-base font-semibold">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-teal-200 text-sm font-semibold text-navy-950">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mb-9 rounded-md border border-amber-200 bg-amber-50/60 p-5 shadow-soft">
        <div className="grid gap-5 md:grid-cols-[1.2fr_repeat(3,1fr)] md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-white">
              <Star className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-slate-950">Mike&apos;s goals</h2>
              <p className="mt-1 text-sm text-slate-600">These guide what CFOLess shows you.</p>
            </div>
          </div>

          {goalItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-center gap-3 text-sm font-medium text-slate-800 md:justify-center">
                <Icon className="h-5 w-5 text-teal-700" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-9">
        <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">
            Other areas to keep an eye on
          </h2>
          <p className="text-sm text-slate-500">We only show what matters to your goals.</p>
        </div>

        <div className="space-y-3">
          {watchRows.map((row) => {
            const Icon = row.icon;

            return (
              <a
                key={row.name}
                href={row.href}
                className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft md:grid-cols-[56px_240px_1fr_150px_24px] md:items-center"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md ${
                    row.tone === "teal"
                      ? "bg-sky-50 text-sky-700"
                      : row.tone === "rose"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-950">{row.name}</h3>
                  <p className={row.tone === "amber" ? "mt-1 text-sm font-medium text-amber-700" : "mt-1 text-sm text-slate-600"}>
                    {row.detail}
                  </p>
                </div>

                <p className="text-sm leading-6 text-slate-600">{row.description}</p>

                <StatusPill pill={row.pill} tone={row.tone} direction={row.direction} />

                <ChevronRight className="hidden h-5 w-5 text-slate-400 md:block" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </section>

      <section className="rounded-md border border-sky-200 bg-sky-50/60 p-6 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[1fr_220px] md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-slate-950">
              Progress since last month
            </h2>
            <ul className="mt-5 space-y-4">
              {progressSinceLastMonth.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden justify-center md:flex">
            <div className="relative flex h-36 w-44 items-end justify-center">
              <Mountain className="h-28 w-28 text-teal-500/70" aria-hidden="true" />
              <Flag className="absolute right-10 top-3 h-8 w-8 text-amber-500" aria-hidden="true" />
              <div className="absolute bottom-6 h-14 w-2 rotate-45 rounded-full bg-white/80" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
