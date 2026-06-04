import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle2 } from "lucide-react";
import { businessScores, company, progressSinceLastMonth } from "@/lib/data";
import { BottomLine, Card, PageHeader, SectionTitle } from "@/components/ui";

const actionItems = [
  "Collect overdue invoices.",
  "Slow the next inventory order.",
  "Review payroll before hiring."
];

const cashScore = businessScores.find((score) => score.name === "Cash Health")!;
const secondaryScores = businessScores.filter((score) => score.name !== "Cash Health");

function Direction({ change }: { change?: number }) {
  if (!change) {
    return null;
  }

  const Icon = change > 0 ? ArrowUp : ArrowDown;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
        change > 0 ? "bg-sky-50 text-sky-700" : "bg-rose-50 text-rose-700"
      }`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {change > 0 ? `up ${change}` : `down ${Math.abs(change)}`}
    </span>
  );
}

export default function OwnerHomePage() {
  return (
    <div>
      <PageHeader
        eyebrow={`${company.owner}'s monthly view`}
        title="What should Mike focus on this month?"
        subtitle="CFOLess shows the scores that match Mike's goals, then explains what changed and what to improve next."
      />

      <BottomLine>
        Sales improved, but cash got tighter. Mike should focus this month on collecting invoices,
        slowing inventory purchases, and reviewing payroll before hiring.
      </BottomLine>

      <Card className="mb-6 border-teal-200 !bg-navy-950 p-7 text-white">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-teal-300">
              This month's coaching focus
            </div>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal">
              Mike, focus on cash conversion first.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              Sales increased, but cash got tighter because more money is tied up in inventory and
              unpaid invoices.
            </p>
          </div>

          <div className="rounded-md bg-white/10 p-5">
            <div className="text-base font-semibold uppercase tracking-wider text-teal-200">
              Do these 3 things next
            </div>
            <ol className="mt-5 space-y-4 text-base leading-7 text-white">
              {actionItems.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-teal-400 text-sm font-semibold text-navy-950">
                    {index + 1}
                  </span>
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Card>

      <div className="mb-6 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-soft">
        <span className="font-semibold text-slate-950">Mike's goals:</span> improve cash flow,
        improve profit, prepare to sell someday.
      </div>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <Card className="border-amber-200">
          <div className="text-sm font-semibold uppercase tracking-wider text-amber-700">
            Supporting score
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-950">Cash Health</h2>
          <div className="mt-5 flex items-end gap-2">
            <span className="text-5xl font-semibold text-slate-950">{cashScore.score}</span>
            <span className="pb-1 text-sm font-medium text-slate-500">/ Needs attention</span>
          </div>
          <Direction change={cashScore.change} />
          <p className="mt-4 text-base leading-7 text-slate-700">{cashScore.driver}</p>
          <Link
            href="/score/cash-health"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            View Cash Health <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Card>

        <Card>
          <SectionTitle title="Other scores to watch" />
          <div className="divide-y divide-slate-200">
            {secondaryScores.map((score) => (
              <div key={score.name} className="grid gap-3 py-4 md:grid-cols-[180px_170px_1fr_auto] md:items-center">
                <div className="font-semibold text-slate-950">
                  {score.name === "Books Health" ? "Books Status" : score.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {score.name === "Books Health" ? "Usable with caution" : `${score.score} / ${score.label}`}
                  </span>
                  <Direction change={score.change} />
                </div>
                <p className="text-sm leading-6 text-slate-600">{score.driver}</p>
                {score.href ? (
                  <Link href={score.href} className="text-sm font-semibold text-teal-700">
                    View details
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <SectionTitle title="Progress since last month" />
        <ul className="space-y-3">
          {progressSinceLastMonth.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-md bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal-600" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
