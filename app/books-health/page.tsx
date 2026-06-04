import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  bookkeeperQuestions,
  booksIssues,
  company,
  decisionSafeMap,
  progressSinceLastMonth
} from "@/lib/data";
import { BottomLine, Card, ListCard, PageHeader, SectionTitle } from "@/components/ui";

const safeUses = ["revenue trend", "high-level cash trend", "expense review"];
const cautionUses = ["gross margin", "job profitability", "sell-ready analysis", "pricing decisions"];

export default function BooksHealthPage() {
  return (
    <div>
      <PageHeader
        eyebrow={`${company.name} - ${company.system}`}
        title="Can I Trust My Books?"
        subtitle="CFOLess first asks: Can you safely make decisions from these books?"
      />

      <BottomLine>
        Mike can use these books for broad cash and revenue decisions, but should not rely on them
        yet for pricing, margins, or sell-ready decisions.
      </BottomLine>

      <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <Card className="bg-white">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Books Status
              </div>
              <div className="mt-4 text-3xl font-semibold text-slate-950">
                Usable with caution
              </div>
            </div>
            <div className="rounded-md bg-amber-50 p-3 text-amber-700">
              <ShieldCheck className="h-7 w-7" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4">
            <p className="text-base leading-7 text-amber-900">
              These books are useful for broad cash and revenue direction, but not clean enough yet
              for pricing, margin, job profitability, or sell-ready decisions.
            </p>
          </div>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="lg:col-span-2">
            <SectionTitle title="Can I safely use these numbers?" />
            <p className="text-base leading-7 text-slate-700">
              Before CFOLess scores the business, it checks whether the accounting is reliable enough
              to use. If the books are messy, CFOLess shows what needs to be fixed before giving
              confident financial coaching.
            </p>
          </Card>

          <Card>
            <SectionTitle title="Safe to use for" />
            <div className="space-y-3">
              {safeUses.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
                  <CheckCircle2 className="h-5 w-5 flex-none" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionTitle title="Use caution for" />
            <div className="space-y-3">
              {cautionUses.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-rose-50 p-3 text-sm font-medium text-rose-800">
                  <AlertTriangle className="h-5 w-5 flex-none" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <ListCard title="Issues detected" items={booksIssues} icon="alert" />
          <ListCard title="Questions for your bookkeeper" items={bookkeeperQuestions} icon="check" />
        </div>
      </div>

      <Card className="mt-5">
        <SectionTitle
          title="Decision-Safe Map"
        />
        <div className="overflow-hidden rounded-md border border-slate-200">
          <div className="hidden grid-cols-[1fr_170px] bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
            <div>Decision area</div>
            <div>Status</div>
          </div>
          <div className="divide-y divide-slate-200">
            {decisionSafeMap.map((item) => {
              const isSafe = item.status === "Safe";
              const Icon = isSafe ? CheckCircle2 : AlertTriangle;

              return (
                <div key={item.area} className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_170px] md:items-center">
                  <div>
                    <div className="font-semibold text-slate-950">{item.area}</div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.why}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ${
                        isSafe
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : "bg-amber-50 text-amber-700 ring-amber-200"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="mt-5">
        <ListCard title="Progress since last month" items={progressSinceLastMonth} icon="check" />
      </div>
    </div>
  );
}
