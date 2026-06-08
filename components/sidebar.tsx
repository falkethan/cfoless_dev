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
    <aside className="sticky top-0 z-20 border-b border-white/10 bg-navy-950 text-white lg:h-screen lg:w-72 lg:flex-none lg:border-b-0">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 px-5 py-5">
          <Link href="/owner-home" className="block">
            <Image
              src="/cfoless-logo-nav.png"
              alt="CFOLess"
              width={156}
              height={44}
              priority
              className="h-9 w-auto"
            />
            <div className="mt-3 text-xs font-medium text-slate-300">
              Monthly financial clarity, minus the accounting fog.
            </div>
          </Link>
        </div>

        <nav className="no-scrollbar flex max-w-full gap-2 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-x-visible lg:px-4 lg:py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex min-w-max items-center gap-3 rounded-md px-3 py-2.5 text-sm transition",
                  isActive
                    ? "bg-teal-50 font-semibold text-slate-950 shadow-sm [&_svg]:text-teal-700"
                    : "font-medium text-slate-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 flex-none" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden border-t border-white/10 p-5 lg:block">
          <div className="rounded-md border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-sm font-semibold text-white">
                MR
              </div>
              <div>
                <div className="text-sm font-semibold">Mike Reynolds</div>
                <div className="text-xs text-slate-400">Owner</div>
              </div>
            </div>
            <div className="mt-3 border-t border-white/10 pt-3 text-xs leading-5 text-slate-300">
              {company.name}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
