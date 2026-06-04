"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookCheck,
  Bot,
  ClipboardList,
  FileText,
  Gauge,
  HeartPulse,
  Target
} from "lucide-react";
import clsx from "clsx";
import { company } from "@/lib/data";

const navItems = [
  { label: "Goals", href: "/onboarding", icon: Target },
  { label: "Can I Trust My Books?", href: "/books-health", icon: BookCheck },
  { label: "What To Focus On", href: "/owner-home", icon: HeartPulse },
  { label: "Cash Health", href: "/score/cash-health", icon: Gauge },
  { label: "Ask CFOLess", href: "/ask", icon: Bot },
  { label: "Monthly Coaching Plan", href: "/memo", icon: FileText },
  { label: "Advisor View", href: "/advisor-view", icon: ClipboardList }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 border-b border-white/10 bg-navy-950 text-white lg:h-screen lg:w-72 lg:flex-none lg:border-b-0">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 px-5 py-5">
          <Link href="/books-health" className="block">
            <Image
              src="/cfoless-logo-nav.png"
              alt="CFOLess"
              width={156}
              height={44}
              priority
              className="h-9 w-auto"
            />
            <div className="mt-3 text-xs font-medium text-slate-300">
              CFO-style coaching for small business owners
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
                  "flex min-w-max items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-white text-navy-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 flex-none" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden border-t border-white/10 p-5 lg:block">
          <div className="rounded-md bg-white/8 p-4">
            <div className="text-xs uppercase tracking-wider text-slate-400">Fake company</div>
            <div className="mt-2 text-sm font-semibold">{company.name}</div>
            <div className="mt-1 text-xs text-slate-300">
              {company.revenue} revenue - {company.system}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
