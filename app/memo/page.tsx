import { company } from "@/lib/data";
import { BottomLine, Card, PageHeader } from "@/components/ui";

const planSections = [
  {
    title: "What happened",
    body: "Sales improved this month, but cash moved the other direction. The business brought in more revenue, yet ended the month with $28,400 less cash."
  },
  {
    title: "Why it happened",
    body: "More money is sitting in inventory, and customers are paying slower. Inventory days rose from 42 to 61, and invoices over 30 days increased from $18k to $35k. Payroll is also growing faster than sales."
  },
  {
    title: "Why it matters",
    body: "Growth is good only if it turns into cash. If Mike keeps growing sales while cash gets tighter, the business may feel busier without feeling healthier."
  },
  {
    title: "What Mike should do next",
    body: "Collect overdue invoices first. Then slow the next inventory order until older inventory moves. Before hiring, review whether the current payroll level is producing enough sales."
  },
  {
    title: "What Mike should ask his bookkeeper / CPA",
    body: "Ask whether all bank accounts are reconciled through month-end, whether A/R aging is current, whether inventory purchases are categorized consistently, and whether payroll costs are classified correctly."
  },
  {
    title: "What we'll check next month",
    body: "Next month, CFOLess will check whether overdue invoices came down, whether inventory days improved, whether payroll grew slower than sales, whether the bookkeeper cleaned up COGS categories, and whether Cash Health improved from 58."
  }
];

const nextActions = [
  "Collect overdue invoices.",
  "Slow the next inventory order.",
  "Review payroll before hiring."
];

export default function MemoPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Monthly Coaching Plan"
        title={`${company.owner}'s Monthly Coaching Plan`}
        subtitle="This is not a finance report. It is the plain-English plan for what Mike should focus on next."
      />

      <BottomLine>
        Growth did not turn into cash quickly enough this month.
      </BottomLine>

      <Card className="mx-auto max-w-4xl">
        <div className="border-b border-slate-200 pb-6">
          <div className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            {company.name}
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            This month is about getting sales to turn into cash.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This is not a finance report. It is the plain-English plan for what Mike should focus on
            next. These books are usable for broad cash and revenue decisions, but not clean enough
            for every decision yet.
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {planSections.map((section) => (
            <section key={section.title} className="py-6">
              <h3 className="text-lg font-semibold text-slate-950">{section.title}</h3>
              {section.title === "What Mike should do next" ? (
                <div className="mt-4 rounded-md border border-teal-200 bg-teal-50 p-5">
                  <p className="text-base leading-7 text-teal-950">{section.body}</p>
                  <ol className="mt-5 space-y-3">
                    {nextActions.map((action, index) => (
                      <li key={action} className="flex gap-3 text-base font-semibold text-teal-950">
                        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-teal-600 text-sm text-white">
                          {index + 1}
                        </span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p className="mt-3 text-base leading-7 text-slate-700">{section.body}</p>
              )}
            </section>
          ))}
        </div>
      </Card>
    </div>
  );
}
