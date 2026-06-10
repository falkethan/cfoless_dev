"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookCheck, Bot, FileText, Gauge, HeartPulse, Target } from "lucide-react";
import clsx from "clsx";
import { company } from "@/lib/data";

const navItems = [
  { label: "Monthly Brief", href: "/owner-home", icon: HeartPulse },
  { label: "Can I Trust My Books?", href: "/books-health", icon: BookCheck },
  { label: "Cash Health", href: "/score/cash-health", icon: Gauge },
  { label: "Ask CFOLess", href: "/ask", icon: Bot },
  { label: "Monthly Plan", href: "/memo", icon: FileText },
  { label: "Goals", href: "/onboarding", icon: Target }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 w-full max-w-full overflow-hidden border-b border-white/10 bg-[#06172d] text-white shadow-[12px_0_40px_rgba(15,23,42,0.08)] lg:h-screen lg:w-72 lg:flex-none lg:border-b-0 lg:border-r lg:border-r-white/[0.06]">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/[0.07] px-5 py-6 lg:px-7 lg:pb-8 lg:pt-7">
          <Link href="/owner-home" className="block transition-opacity hover:opacity-95">
            <Image
              src="/cfoless-logo-nav.png"
              alt="CFOLess"
              width={156}
              height={44}
              priority
              className="h-9 w-auto"
            />
            <div className="mt-4 max-w-48 text-xs font-medium leading-5 text-slate-400/90">
              Monthly financial clarity, minus the accounting fog.
            </div>
          </Link>
        </div>

        <nav className="no-scrollbar flex max-w-full gap-2 overflow-x-auto px-3 py-3 lg:flex-col lg:gap-2 lg:overflow-x-visible lg:px-4 lg:py-7">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group relative flex min-w-max items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition duration-200 lg:px-3.5 lg:py-3",
                  isActive
                    ? "border-white/[0.08] bg-white/[0.09] font-semibold text-white shadow-[0_8px_22px_rgba(0,0,0,0.14)] before:absolute before:bottom-2.5 before:left-0 before:top-2.5 before:w-0.5 before:rounded-full before:bg-teal-400"
                    : "border-transparent font-medium text-slate-400 hover:border-white/[0.05] hover:bg-white/[0.045] hover:text-slate-100"
                )}
              >
                <span
                  className={clsx(
                    "flex h-8 w-8 flex-none items-center justify-center rounded-md border transition duration-200",
                    isActive
                      ? "border-teal-300/20 bg-teal-400/10 text-teal-300"
                      : "border-white/[0.06] bg-white/[0.025] text-slate-500 group-hover:border-white/10 group-hover:text-slate-300"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{item.label}</span>
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-300 shadow-[0_0_10px_rgba(94,234,212,0.7)]" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden border-t border-white/[0.07] p-5 lg:block">
          <div className="rounded-md border border-white/[0.08] bg-white/[0.035] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-300/20 bg-teal-500/90 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(13,148,136,0.2)]">
                MR
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold">Mike Reynolds</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  Owner
                </div>
              </div>
            </div>
            <div className="mt-4 truncate border-t border-white/[0.07] pt-3 text-xs font-medium leading-5 text-slate-300">
              {company.name}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
