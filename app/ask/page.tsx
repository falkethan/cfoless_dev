"use client";

import { useState } from "react";
import { Bot, Send, UserRound } from "lucide-react";
import { askAnswers, company } from "@/lib/data";
import { BottomLine, Card, PageHeader, SectionTitle } from "@/components/ui";

export default function AskPage() {
  const [activeQuestion, setActiveQuestion] = useState(askAnswers[0]);

  return (
    <div>
      <PageHeader
        eyebrow="Ask CFOLess"
        title={`Ask about ${company.name}`}
        subtitle="Ask plain-English questions like you would ask a CFO."
      />

      <BottomLine>
        Ask plain-English questions about your business. CFOLess answers using your scores, goals,
        and underlying QuickBooks data.
      </BottomLine>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <div className="grid gap-5">
          <Card>
            <SectionTitle
              title="Suggested follow-up questions"
              description="These are the kinds of questions Mike might ask a CFO after seeing the scores."
            />
            <div className="space-y-3">
              {askAnswers.map((item) => {
                const isActive = item.question === activeQuestion.question;

                return (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => setActiveQuestion(item)}
                    className={`w-full rounded-md border p-3 text-left text-sm font-medium transition ${
                      isActive
                        ? "border-teal-500 bg-teal-50 text-teal-900"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {item.question}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-950">Current context</h2>
              <p className="mt-1 text-sm text-slate-600">
                CFOLess uses these facts when answering the follow-up questions.
              </p>
            </div>
            <div className="space-y-3 text-sm leading-6 text-slate-700">
              <p>Books Status: usable with caution.</p>
              <p>Cash Health: 58, needs attention.</p>
              <p>Goal focus: cash flow, profit, and building a business Mike could sell someday.</p>
            </div>
          </Card>
        </div>

        <Card className="min-h-[560px]">
          <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-semibold text-slate-950">Conversation</h2>
              <p className="mt-1 text-sm text-slate-600">
                Hardcoded sample answers for alignment.
              </p>
            </div>

            <div className="flex-1 space-y-5 py-6">
              <div className="flex justify-end">
                <div className="max-w-xl rounded-md bg-navy-950 px-4 py-3 text-sm leading-6 text-white">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                    Mike
                  </div>
                  {activeQuestion.question}
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-2xl rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800">
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
                    <Bot className="h-4 w-4" aria-hidden="true" />
                    CFOLess
                  </div>
                  {activeQuestion.answer}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
              <div className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                Ask a question about cash, books cleanup, hiring, pricing, or sell-ready decisions...
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-600 text-white"
                aria-label="Send question"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
