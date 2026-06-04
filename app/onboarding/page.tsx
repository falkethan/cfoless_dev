import { Check, SlidersHorizontal } from "lucide-react";
import { company, ownerGoals, selectedGoals } from "@/lib/data";
import { BottomLine, Card, PageHeader, SectionTitle } from "@/components/ui";

const focusAreas = [
  "Keep more cash in the business",
  "Improve profit",
  "Build a business he could sell someday"
];

export default function OnboardingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Goals"
        title={`What should CFOLess help ${company.owner} improve?`}
        subtitle="Pick the outcomes that matter most. CFOLess uses them to keep the home screen focused on the scores that actually support owner decisions."
      />

      <BottomLine>
        CFOLess does not show every possible report. It asks what you care about, then focuses only
        on the scores that help you make better decisions.
      </BottomLine>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card>
          <SectionTitle
            title="Owner goals"
            description="Mike's selected goals determine which scores CFOLess brings forward first."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {ownerGoals.map((goal) => {
              const isSelected = selectedGoals.includes(goal);

              return (
                <button
                  key={goal}
                  type="button"
                  className={`flex min-h-20 items-center justify-between gap-4 rounded-md border p-4 text-left transition ${
                    isSelected
                      ? "border-teal-600 bg-teal-50 text-teal-950 shadow-[0_0_0_3px_rgba(20,184,166,0.16)]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="text-sm font-semibold">{goal}</span>
                  <span
                    className={`flex h-6 w-6 flex-none items-center justify-center rounded-full ${
                      isSelected ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="!bg-navy-950 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-teal-500 text-navy-950">
            <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-xl font-semibold">Mike's focus areas:</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-100">
            {focusAreas.map((area) => (
              <li key={area} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-none text-teal-300" aria-hidden="true" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-md bg-white/10 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Current setup
            </div>
            <div className="mt-2 text-sm">{company.name}</div>
            <div className="mt-1 text-sm text-slate-300">
              {company.revenue} revenue - uses {company.system}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
