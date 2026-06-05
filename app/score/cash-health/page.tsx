import {
  AlertTriangle,
  ArrowDown,
  CheckCircle2,
  Flag,
  HelpCircle,
  Mountain,
  Package,
  Receipt,
  Users
} from "lucide-react";
import { company } from "@/lib/data";
import { BottomLine } from "@/components/ui";

const actionItems = [
  "Collect overdue invoices",
  "Slow the next inventory order",
  "Review payroll before hiring"
];

const drivers = [
  {
    title: "Inventory is tying up more cash",
    body:
      "Inventory days increased from 42 to 61, which means more money is sitting in parts or stock before it turns into completed work.",
    icon: Package
  },
  {
    title: "Customers are paying slower",
    body:
      "A/R over 30 days increased from $18k to $35k, so more completed work has not been collected as cash.",
    icon: Receipt
  },
  {
    title: "Payroll is growing faster than sales",
    body:
      "Payroll increased 14% while revenue increased 8%, which puts pressure on both cash and profit.",
    icon: Users
  }
];

const questions = [
  "Is A/R aging current?",
  "Are inventory purchases categorized consistently?",
  "Are payroll costs classified correctly?"
];

const progressItems = [
  "Sell-Ready Score improved because books cleanup improved.",
  "Cash Health dropped because inventory and A/R worsened.",
  "Next unlock: clean up COGS categories and collect overdue invoices."
];

export default function CashHealthPage() {
  return (
    <div className="mx-auto max-w-6xl pb-6">
      <header className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-wider text-teal-700">
          {company.name} · Cash Health
        </div>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-normal text-slate-950 md:text-5xl">
          Cash Health dropped from 70 to 58
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Revenue increased 8%, but cash decreased $28,400. Sales are not turning into cash as
          quickly as last month.
        </p>
      </header>

      <BottomLine>
        Cash dropped even though sales increased because more money is tied up in inventory and
        unpaid invoices.
      </BottomLine>

      <section className="mb-8 overflow-hidden rounded-md border border-teal-900/20 bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.25),transparent_34%),linear-gradient(135deg,#053f3b_0%,#062b2e_48%,#02172d_100%)] p-7 text-white shadow-soft md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-teal-200">
              CFO coaching note
            </div>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight md:text-4xl">
              Cash is getting tighter even though sales increased.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100">
              More money is sitting in inventory and unpaid invoices. That means sales are not
              turning into cash quickly enough.
            </p>
          </div>

          <div className="rounded-md border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-wider text-teal-200">
              What Mike should do next
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

      <section className="mb-8 rounded-md border border-amber-200 bg-amber-50/70 p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-amber-700">
              Supporting evidence
            </div>
            <h2 className="mt-3 text-xl font-semibold text-slate-950">Cash Health</h2>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              58 <span className="text-base font-medium text-slate-600">/ Needs attention</span>
            </p>
            <p className="mt-3 text-base leading-7 text-amber-950">
              Sales are up, but cash is getting tighter.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700">
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
            Down 12 points from last month
          </span>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-5 font-serif text-2xl font-semibold text-slate-950">
          Why cash got tighter
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {drivers.map((driver) => {
            const Icon = driver.icon;

            return (
              <article key={driver.title} className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{driver.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{driver.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mb-8 rounded-md border border-rose-200 bg-rose-50/70 p-5 shadow-sm">
        <div className="flex gap-4">
          <AlertTriangle className="mt-1 h-6 w-6 flex-none text-rose-600" aria-hidden="true" />
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-rose-700">
              Decision warning
            </div>
            <p className="mt-2 text-base leading-7 text-rose-950">
              Avoid adding headcount or making a large inventory purchase until collections improve
              or cash stabilizes.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-teal-50 text-teal-700">
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-slate-950">
              What Mike should ask his bookkeeper
            </h2>
            <ul className="mt-5 space-y-3">
              {questions.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-teal-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-md border border-sky-200 bg-sky-50/60 p-6 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[1fr_220px] md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-slate-950">
              Progress since last month
            </h2>
            <ul className="mt-5 space-y-4">
              {progressItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-teal-600" aria-hidden="true" />
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
