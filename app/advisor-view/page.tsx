import { AlertTriangle, ClipboardList, MessageSquareText } from "lucide-react";
import { bookkeeperQuestions, booksIssues, company } from "@/lib/data";
import { BottomLine, Card, ListCard, PageHeader, SectionTitle } from "@/components/ui";

export default function AdvisorViewPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Advisor View"
        title="Bookkeeper and advisor follow-up"
        subtitle="A lightweight workspace for the questions behind the owner-facing coaching."
      />

      <BottomLine>
        The owner should get plain-English coaching now, while the advisor helps clean up the book
        details that are not safe enough for pricing, margins, or sell-ready decisions.
      </BottomLine>

      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-5">
          <Card>
            <SectionTitle title="Decision-safe summary" />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-md bg-emerald-50 p-4">
                <div className="text-sm font-semibold text-emerald-800">Use now</div>
                <div className="mt-2 text-sm leading-6 text-emerald-900">
                  Revenue trend, high-level cash trend, and expense review.
                </div>
              </div>
              <div className="rounded-md bg-amber-50 p-4">
                <div className="text-sm font-semibold text-amber-800">Clean up first</div>
                <div className="mt-2 text-sm leading-6 text-amber-900">
                  COGS consistency, miscellaneous expenses, A/R aging, and payroll classes.
                </div>
              </div>
              <div className="rounded-md bg-rose-50 p-4">
                <div className="text-sm font-semibold text-rose-800">Do not over-rely on</div>
                <div className="mt-2 text-sm leading-6 text-rose-900">
                  Gross margin, job profitability, pricing, and sell-ready analysis.
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle title="Advisor notes" />
            <div className="space-y-4">
              <div className="flex gap-3 rounded-md border border-slate-200 p-4">
                <AlertTriangle className="mt-1 h-5 w-5 flex-none text-amber-600" aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-700">
                  Books Status is usable with caution. Owner coaching should stay directional until
                  COGS, miscellaneous expenses, A/R aging, and payroll classification are confirmed.
                </p>
              </div>
              <div className="flex gap-3 rounded-md border border-slate-200 p-4">
                <MessageSquareText className="mt-1 h-5 w-5 flex-none text-teal-700" aria-hidden="true" />
                <p className="text-sm leading-6 text-slate-700">
                  Recommended owner message: "The books are useful for trend direction, but we should
                  tighten a few categories before making margin or pricing decisions."
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-5">
          <Card className="!bg-navy-950 text-white">
            <ClipboardList className="h-7 w-7 text-teal-300" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">{company.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Owner: {company.owner}. Revenue: {company.revenue}. Source system: {company.system}.
            </p>
          </Card>
          <ListCard title="Issues to resolve" items={booksIssues} icon="alert" />
          <ListCard title="Questions to confirm" items={bookkeeperQuestions} icon="check" />
        </div>
      </div>
    </div>
  );
}
