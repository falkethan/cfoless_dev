import { AlertTriangle, CheckCircle2, HelpCircle, ShieldCheck } from "lucide-react";
import { bookkeeperQuestions, company, decisionSafeMap } from "@/lib/data";
import { BottomLine } from "@/components/ui";

const safeUses = ["Revenue trend", "High-level cash trend", "Expense review"];
const cautionUses = ["Gross margin", "Job profitability", "Sell-ready analysis", "Pricing decisions"];

export default function BooksHealthPage() {
  return (
    <div className="mx-auto max-w-6xl pb-6">
      <header className="mb-8">
        <div className="text-sm font-semibold uppercase tracking-wider text-teal-700">
          {company.name} · {company.system}
        </div>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-normal text-slate-950 md:text-5xl">
          Can I trust my books?
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          CFOLess checks whether the books are reliable enough to support owner decisions.
        </p>
      </header>

      <BottomLine>
        Mike can use these books for broad cash and revenue decisions, but should not rely on them
        yet for pricing, margins, or sell-ready decisions.
      </BottomLine>

      <section className="mb-8 rounded-md border border-amber-200 bg-amber-50/70 p-7 shadow-soft">
        <div className="grid gap-6 md:grid-cols-[1fr_72px] md:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-amber-700">
              Books Status
            </div>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-slate-950">
              Usable with caution
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-amber-950">
              These books are useful for broad direction, but a few areas need review before Mike
              should rely on them for pricing, margin, job profitability, or sell-ready decisions.
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md bg-white text-amber-700 shadow-sm">
            <ShieldCheck className="h-7 w-7" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="mb-8 rounded-md border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl font-semibold text-slate-950">Decision-Safe Summary</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-md bg-emerald-50 p-5">
            <h3 className="text-lg font-semibold text-emerald-900">Safe to use for</h3>
            <ul className="mt-4 space-y-3">
              {safeUses.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-emerald-950">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md bg-amber-50 p-5">
            <h3 className="text-lg font-semibold text-amber-900">Use caution for</h3>
            <ul className="mt-4 space-y-3">
              {cautionUses.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-amber-950">
                  <AlertTriangle className="mt-1 h-5 w-5 flex-none text-amber-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-5">
          <h2 className="font-serif text-2xl font-semibold text-slate-950">Decision-Safe Map</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            A simple view of which decisions Mike can make from the books today.
          </p>
        </div>

        <div className="space-y-3">
          {decisionSafeMap.map((item) => {
            const isSafe = item.status === "Safe";
            const Icon = isSafe ? CheckCircle2 : AlertTriangle;

            return (
              <div
                key={item.area}
                className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_170px] md:items-center"
              >
                <div>
                  <h3 className="font-semibold text-slate-950">{item.area}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.why}</p>
                </div>
                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                    isSafe ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-md border border-teal-200 bg-teal-50/60 p-6 shadow-soft">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-teal-600 text-white">
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-slate-950">
              What Mike should ask his bookkeeper
            </h2>
            <ul className="mt-5 space-y-3">
              {bookkeeperQuestions.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-teal-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
