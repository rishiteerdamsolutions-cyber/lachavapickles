import type { FinalizedIntent, IntentContext, SiteManifest } from "@/types/site-manifest";

function guessCategory(text: string): IntentContext["category"] {
  if (/non[- ]?veg|prawn|chicken|mutton|fish|royyala/i.test(text)) return "non-veg";
  if (/veg|mamidikaya|mango|chinthankaya|usirikaya|nimmakaya|tomato|kakarakaya|pickle/i.test(text)) {
    return "veg";
  }
  return null;
}

function guessProductSlug(text: string): { name: string; slug: string } | null {
  const pairs: [RegExp, string, string][] = [
    [/mutton|matan/i, "Mutton Pickle", "mutton-pickle"],
    [/prawn|chepal|royyala/i, "Prawn Pickle", "prawn-pickle"],
    [/chicken|kodi/i, "Chicken Pickle", "chicken-pickle"],
    [/chinthankaya|chintakaya|tamarind/i, "Chinthankaya Pickle", "chinthankaya-pickle"],
    [/usirikaya|amla/i, "Usirikaya Pickle", "usirikaya-pickle"],
    [/nimmakaya|lemon/i, "Nimmakaya Pickle", "nimmakaya-pickle"],
    [/mamidikaya.*allam|allam.*mamidikaya/i, "Mamidikaya Allam Pickle", "mamidikaya-allam-pickle"],
    [/mamidikaya|avakaya|mango/i, "Mamidikaya Pickle", "mamidikaya-pickle"],
    [/tomato|tamata/i, "Tomato Pickle", "tomato-pickle"],
    [/kakarakaya|bitter gourd/i, "Kakarakaya Pickle", "kakarakaya-pickle"],
  ];
  for (const [re, name, slug] of pairs) {
    if (re.test(text)) return { name, slug };
  }
  return null;
}

function buildContext(userIntent: string): IntentContext {
  const product = guessProductSlug(userIntent);
  return {
    product_name: product?.name ?? null,
    product_slug: product?.slug ?? null,
    category: guessCategory(userIntent),
    weight_label: guessWeight(userIntent),
  };
}

function guessWeight(text: string): string | null {
  const match = text.match(/\b(\d+\s*(?:g|kg))\b/i);
  return match ? match[1].replace(/\s+/g, "") : null;
}

function finalizeIntentLocally(userIntent: string, manifest: SiteManifest): FinalizedIntent {
  const text = userIntent.toLowerCase();
  let best = manifest.workflows[0];
  let bestScore = -1;

  for (const workflow of manifest.workflows) {
    let score = 0;
    for (const hint of workflow.intent_hints ?? []) {
      const h = hint.toLowerCase();
      if (text.includes(h)) score += h.length;
      else if (h.split(/\s+/).some((word) => word.length > 3 && text.includes(word))) {
        score += 2;
      }
    }
    if (workflow.workflow_id.includes("cart") && /cart|basket/.test(text)) score += 5;
    if (workflow.workflow_id.includes("checkout") && /checkout|pay|order|shipping/.test(text)) {
      score += 5;
    }
    if (workflow.workflow_id.includes("whatsapp") && /whatsapp|chat/.test(text)) score += 8;
    if (workflow.workflow_id.includes("combo") && /combo/.test(text)) score += 8;
    if (score > bestScore) {
      bestScore = score;
      best = workflow;
    }
  }

  const context = buildContext(userIntent);

  return {
    workflow_id: best.workflow_id,
    workflow_name: best.name,
    confidence: bestScore > 4 ? "high" : bestScore > 0 ? "medium" : "low",
    reply: `I'll help you with: ${best.name}.`,
    context,
  };
}

export async function finalizeIntentWithGroq(
  userIntent: string,
  manifest: SiteManifest
): Promise<FinalizedIntent> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    return finalizeIntentLocally(userIntent, manifest);
  }

  const model = process.env.GROQ_MODEL?.trim() || "llama-3.3-70b-versatile";
  const workflowList = manifest.workflows
    .map((w) => `- ${w.workflow_id}: ${w.name} (hints: ${(w.intent_hints ?? []).join(", ")})`)
    .join("\n");

  const system = `You map shopper messages for Lachava Telangana Pickles.
Available workflows:
${workflowList}

Respond with JSON only:
{
  "workflow_id": "...",
  "reply": "short friendly sentence",
  "confidence": "high"|"medium"|"low",
  "product_name": "Mamidikaya Pickle" or null,
  "product_slug": "mamidikaya-pickle" or null,
  "category": "veg"|"non-veg"|null,
  "weight_label": "500g" or null
}

Rules:
- Pick one workflow_id from the list.
- Extract product_name/slug when the user names a pickle (Mamidikaya, Chinthankaya, Chicken, etc.).
- Use slug form like mamidikaya-pickle, chinthankaya-pickle when known.
- weight_label only if user mentions size (250g, 500g, 1kg).
- If unclear, prefer browse_and_add_to_cart.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: userIntent },
        ],
      }),
    });

    if (!response.ok) {
      return finalizeIntentLocally(userIntent, manifest);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) return finalizeIntentLocally(userIntent, manifest);

    const parsed = JSON.parse(content) as {
      workflow_id?: string;
      reply?: string;
      confidence?: FinalizedIntent["confidence"];
      product_name?: string | null;
      product_slug?: string | null;
      category?: IntentContext["category"];
      weight_label?: string | null;
    };

    const workflow = manifest.workflows.find((w) => w.workflow_id === parsed.workflow_id);
    if (!workflow) return finalizeIntentLocally(userIntent, manifest);

    return {
      workflow_id: workflow.workflow_id,
      workflow_name: workflow.name,
      reply: parsed.reply?.trim() || `I'll help you with: ${workflow.name}.`,
      confidence: parsed.confidence ?? "medium",
      context: {
        product_name: parsed.product_name ?? null,
        product_slug: parsed.product_slug ?? null,
        category: parsed.category ?? null,
        weight_label: parsed.weight_label ?? null,
      },
    };
  } catch {
    return finalizeIntentLocally(userIntent, manifest);
  }
}
