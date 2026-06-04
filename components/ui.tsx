import clsx from "clsx";
import { CheckCircle2, CircleAlert, MessageSquareText } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="max-w-4xl text-3xl font-semibold tracking-normal text-slate-950 md:text-4xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-3 max-w-3xl text-base text-slate-600">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx("rounded-md border border-slate-200 bg-white p-5 shadow-soft", className)}>
      {children}
    </section>
  );
}

export function SectionTitle({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}

export function BottomLine({ children }: { children: React.ReactNode }) {
  return (
    <Card className="mb-5 border-teal-200 bg-teal-50 shadow-none">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-teal-600 text-white">
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-teal-800">
            Bottom line
          </div>
          <p className="mt-1 text-base leading-7 text-teal-950">{children}</p>
        </div>
      </div>
    </Card>
  );
}

export function ListCard({
  title,
  items,
  icon = "check"
}: {
  title: string;
  items: string[];
  icon?: "check" | "alert";
}) {
  const Icon = icon === "alert" ? CircleAlert : CheckCircle2;

  return (
    <Card>
      <SectionTitle title={title} />
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <Icon
              className={clsx("mt-0.5 h-5 w-5 flex-none", icon === "alert" ? "text-amber-500" : "text-teal-600")}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
