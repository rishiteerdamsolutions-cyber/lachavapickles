import { NextResponse } from "next/server";
import { finalizeIntentWithGroq } from "@/lib/agent/finalize-intent";
import { loadSiteManifest } from "@/lib/agent/manifest";

export const runtime = "nodejs";

type Body = {
  intent?: string;
  dryRun?: boolean;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const intent = body.intent?.trim();
  if (!intent) {
    return NextResponse.json({ error: "intent is required" }, { status: 400 });
  }

  const manifest = await loadSiteManifest();
  const finalized = await finalizeIntentWithGroq(intent, manifest);
  const workflow = manifest.workflows.find((w) => w.workflow_id === finalized.workflow_id);

  if (!workflow) {
    return NextResponse.json({ error: "Workflow not found" }, { status: 400 });
  }

  const dryRun =
    body.dryRun === true || process.env.AGENT_DRY_RUN === "true";

  const humanSteps = workflow.steps
    .filter((s) => s.requires_human)
    .map((s) => s.description || s.step_id);

  return NextResponse.json({
    mode: dryRun ? "dry_run" : "execute",
    site_id: manifest.site_id,
    site_name: manifest.site_name,
    intent: finalized,
    workflow: {
      workflow_id: workflow.workflow_id,
      name: workflow.name,
      step_count: workflow.steps.length,
      human_steps: humanSteps,
    },
    groq_enabled: Boolean(process.env.GROQ_API_KEY?.trim()),
  });
}
