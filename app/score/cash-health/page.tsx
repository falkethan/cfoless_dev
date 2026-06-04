import { Banknote, CheckCircle2, HelpCircle, Package, Users } from "lucide-react";
import { company, progressSinceLastMonth } from "@/lib/data";
import { BottomLine, Card, PageHeader, SectionTitle } from "@/components/ui";

const drivers = [
  {
    title: "Inventory days increased from 42 to 61",
    body: "More money is sitting in inventory before it turns into completed work.",
    icon: Package
  },
  {
    title: "A/R over 30 days increased from $18k to $35k",
    body: "Customers are paying slower, so sales are not turning into cash quickly enough.",
    icon: Banknote
  },
  {
    title: "Payroll increased 14% while revenue increased 8%",
    body: "Payroll is growing faster than sales, which puts pressure on cash and profit at the same time.",
    icon: Users
  }
];

const improvements = [
  "Collect overdue invoices.",
  "Slow the next inventory order.",
  "Review payroll before hiring."
];

const questions = [
  "Is A/R aging current?",
  "Are inventory purchases categorized consistently?",
  "Are payroll costs classified correctly?"
];

const scoreDrivers = [
  {
    title: "Inventory is tying up more cash.",
    body:
      "Inventory days increased from 42 to 61, which means more money is sitting in parts or stock before it turns into completed work."
  },
  {
    title: "Customers are paying slower.",
    body:
      "A/R over 30 days increased from $18k to $35k, so more completed work has not been collected as cash."
  },
  {
    title: "Payroll is growing faster than sales.",
    body:
      "Payroll increased 14% while revenue increased 8%, which puts pressure on both cash and profit."
  }
];

export default function CashHealthPage() {
  return (
    <div>
      <PageHeader
        eyebrow={`${company.name} - Cash Health`}
        title="Cash Health dropped from 70 to 58"
        subtitle="Revenue increased 8%, but cash decreased $28,400. Sales are not turning into cash as quickly as last month."
      />

      <BottomLine>
        Cash dropped even though sales increased because more money is tied up in inventory and
        unpaid invoices.
      </BottomLine>

      <Card className="mb-5 border-amber-200 bg-amber-50 p-6">
        <h2 className="text-2xl font-semibold text-amber-950">
          Cash is getting tighter even though sales increased.
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-amber-900">
          More money is sitting in inventory and unpaid invoices. That means sales are not turning
          into cash quickly enough.
        </p>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <Card>
          <SectionTitle title="Cash Health" description="This score focuses on whether cash is keeping up with sales and operating needs." />
          <div className="mt-6 flex items-end gap-3">
            <div>
              <div className="text-sm font-medium text-slate-500">Last month</div>
              <div className="mt-1 text-4xl font-semibold text-slate-400">70</div>
            </div>
            <div className="pb-3 text-2xl text-slate-300">to</div>
            <div>
              <div className="text-sm font-medium text-rose-600">This month</div>
              <div className="mt-1 text-6xl font-semibold text-slate-950">58</div>
            </div>
          </div>
          <div className="mt-3 inline-flex rounded-md bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
            Needs attention
          </div>
          <div className="mt-6 rounded-md bg-rose-50 p-4 text-sm leading-6 text-rose-900">
            Revenue is up, but cash is down because cash is tied up in inventory, unpaid invoices,
            and faster payroll growth.
          </div>
        </Card>

        <div className="grid gap-5">
          <Card>
            <SectionTitle title="Main drivers" />
            <div className="grid gap-4 md:grid-cols-3">
              {drivers.map((driver) => {
                const Icon = driver.icon;

                return (
                  <div key={driver.title} className="rounded-md border border-slate-200 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-slate-950">{driver.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{driver.body}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <SectionTitle title="What is driving the score" />
            <ol className="space-y-4">
              {scoreDrivers.map((driver, index) => (
                <li key={driver.title} className="flex gap-4 rounded-md bg-slate-50 p-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-800">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-950">{driver.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{driver.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Card>
          <SectionTitle title="What Mike should do next" />
          <ul className="space-y-3">
            {improvements.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionTitle title="What Mike should ask his bookkeeper" />
          <ul className="space-y-3">
            {questions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <HelpCircle className="mt-0.5 h-5 w-5 flex-none text-amber-600" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-5">
        <SectionTitle title="Progress since last month" />
        <ul className="space-y-3">
          {progressSinceLastMonth.map((item) => (
            <li key={item} className="flex gap-3 rounded-md bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-teal-600" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
