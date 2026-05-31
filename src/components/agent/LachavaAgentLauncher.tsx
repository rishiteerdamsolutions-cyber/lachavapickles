"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AgentPauseError,
  executeWorkflow,
  getWorkflow,
  loadClientManifest,
} from "@/lib/agent/dom-agent";
import { useAgentNavigation } from "@/lib/agent/use-agent-navigation";
import type { FinalizedIntent } from "@/types/site-manifest";

type Message = {
  role: "system" | "user" | "agent";
  text: string;
};

type IntentResponse = {
  mode: "dry_run" | "execute";
  intent: FinalizedIntent;
  workflow: { workflow_id: string; name: string };
  groq_enabled?: boolean;
};

const INITIAL_MESSAGE: Message = {
  role: "system",
  text: "Tell me what you want on Lachava — browse pickles, cart, checkout, combos, or support. Payment stays with you in Razorpay.",
};

export default function LachavaAgentLauncher() {
  const pathname = usePathname();
  const agentNavigate = useAgentNavigation();
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);

  const push = useCallback((role: Message["role"], text: string) => {
    setMessages((current) => [...current, { role, text }]);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const send = async () => {
    const trimmed = intent.trim();
    if (!trimmed || busy) return;

    push("user", trimmed);
    setIntent("");
    setBusy(true);
    push("agent", "Understanding your request…");

    try {
      const response = await fetch("/api/agent/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: trimmed }),
      });

      const data = (await response.json()) as IntentResponse & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`);
      }

      const groqNote = data.groq_enabled ? "" : " (keyword routing — add GROQ_API_KEY for smarter chat)";
      push(
        "agent",
        `${data.intent.reply}${groqNote}\nWorkflow: ${data.workflow.name}`
      );

      if (data.mode === "dry_run") {
        push("agent", "Dry run only — no page actions were taken.");
        return;
      }

      push("agent", "Working on the site…");

      const manifest = await loadClientManifest();
      const workflow = getWorkflow(manifest, data.workflow.workflow_id);
      if (!workflow) {
        throw new Error("Workflow missing from manifest");
      }

      await executeWorkflow(
        workflow,
        manifest,
        agentNavigate,
        data.intent,
        (step) => push("agent", step)
      );

      push("agent", "Done. Check the page — tell me if you need another step.");
    } catch (error) {
      if (error instanceof AgentPauseError) {
        push("agent", `Paused: ${error.handoffMessage}`);
        return;
      }
      push("agent", error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-[var(--content-pad-x)] z-40 rounded-full bg-ink px-[clamp(0.875rem,3vw,1.25rem)] py-[clamp(0.625rem,2.5vw,0.875rem)] text-[clamp(0.75rem,2.5vw,0.875rem)] font-semibold text-surface shadow-lg hover:bg-ink-muted transition-colors"
        style={{ bottom: "var(--fab-offset)" }}
        aria-label="Open Lachava assistant"
      >
        Ask Lachava
      </button>

      {open ? (
        <section
          aria-label="Lachava assistant"
          className="fixed left-[var(--content-pad-x)] z-50 flex w-[min(420px,calc(100vw-2*var(--content-pad-x)))] flex-col rounded-2xl border border-border bg-surface-elevated p-4 shadow-xl"
          style={{ bottom: "calc(var(--fab-offset) + 3.25rem)" }}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Lachava
              </p>
              <h2 className="font-display text-xl text-ink">Onsite Assistant</h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-2 py-1 text-muted hover:bg-surface hover:text-ink"
              aria-label="Close assistant"
            >
              ×
            </button>
          </div>

          <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  message.role === "system"
                    ? "bg-surface text-muted"
                    : message.role === "user"
                      ? "bg-accent-soft text-ink"
                      : "border border-border bg-surface text-ink-muted"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <label className="mt-3 grid gap-2 text-xs font-semibold uppercase text-muted">
            What do you need?
            <textarea
              rows={3}
              value={intent}
              disabled={busy}
              onChange={(e) => setIntent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="e.g. shop veg pickles and add to cart"
              className="resize-y rounded-xl border border-border bg-surface px-3 py-2.5 text-sm font-normal normal-case text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </label>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => void send()}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
            >
              {busy ? "Working…" : "Send"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => setMessages([INITIAL_MESSAGE])}
              className="rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:bg-border/40 disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
