import type { ManifestElement, SiteManifest } from "@/types/site-manifest";

export function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function collectClickables(root: ParentNode = document): HTMLElement[] {
  const nodes = root.querySelectorAll<HTMLElement>(
    "a, button, [role='button'], input[type='submit'], textarea, input:not([type='hidden'])"
  );
  return Array.from(nodes).filter((el) => {
    if (el.hasAttribute("disabled")) return false;
    const style = window.getComputedStyle(el);
    return style.visibility !== "hidden" && style.display !== "none";
  });
}

export function elementText(el: HTMLElement): string {
  const aria = el.getAttribute("aria-label");
  if (aria) return aria;
  const labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy) {
    const labelEl = document.getElementById(labelledBy);
    if (labelEl?.textContent) return labelEl.textContent.replace(/\s+/g, " ").trim();
  }
  return (el.textContent ?? "").replace(/\s+/g, " ").trim();
}

export function getManifestElement(
  manifest: SiteManifest,
  elementId?: string
): ManifestElement | undefined {
  if (!elementId) return undefined;
  return manifest.elements.find((e) => e.element_id === elementId);
}

export function findBySelectorHint(selectorHint?: string): HTMLElement | null {
  if (!selectorHint) return null;
  try {
    return document.querySelector<HTMLElement>(selectorHint);
  } catch {
    return null;
  }
}

export function findByTextHints(texts: string[]): HTMLElement | null {
  const targets = texts.map(normalizeText).filter(Boolean);
  if (!targets.length) return null;

  for (const el of collectClickables()) {
    const hay = normalizeText(elementText(el));
    if (!hay) continue;
    for (const target of targets) {
      if (hay.includes(target) || target.includes(hay)) return el;
    }
  }
  return null;
}

export function findProductCard(productName?: string | null): HTMLElement | null {
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>("[data-agent-product]")
  );
  if (!cards.length) {
    const link = document.querySelector<HTMLElement>("article a");
    return link;
  }
  if (!productName?.trim()) return cards[0]?.closest("a") ?? cards[0];

  const needle = normalizeText(productName);
  for (const card of cards) {
    const name = normalizeText(card.getAttribute("data-agent-product-name") ?? "");
    if (name.includes(needle) || needle.includes(name)) {
      return card.closest("a") ?? card;
    }
  }
  return cards[0]?.closest("a") ?? cards[0];
}

export function findWeightButton(weightLabel?: string | null): HTMLElement | null {
  const buttons = Array.from(
    document.querySelectorAll<HTMLElement>("button[data-agent-weight]:not(:disabled)")
  );
  if (!buttons.length) {
    for (const el of collectClickables()) {
      const hay = normalizeText(elementText(el));
      if (/\d+\s*g\b|\d+\s*kg\b/.test(hay)) return el;
    }
    return null;
  }
  if (!weightLabel?.trim()) return buttons[0];

  const needle = normalizeText(weightLabel);
  for (const btn of buttons) {
    const id = normalizeText(btn.getAttribute("data-agent-weight") ?? "");
    const label = normalizeText(elementText(btn));
    if (id.includes(needle) || label.includes(needle)) return btn;
  }
  return buttons[0];
}

export async function waitForPath(
  matcher: string | RegExp,
  timeoutMs = 12000
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const path = window.location.pathname;
    const ok =
      typeof matcher === "string"
        ? path === matcher || path.startsWith(`${matcher}/`)
        : matcher.test(path);
    if (ok) return;
    await sleep(120);
  }
  throw new Error(`Timed out waiting for route: ${String(matcher)}`);
}

export async function waitForTexts(texts: string[], timeoutMs = 12000): Promise<void> {
  const targets = texts.map(normalizeText).filter(Boolean);
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const body = normalizeText(document.body.innerText);
    if (targets.some((t) => body.includes(t))) return;
    await sleep(150);
  }
  throw new Error(`Timed out waiting for: ${texts.join(", ")}`);
}

export async function waitForProductReady(timeoutMs = 25000): Promise<void> {
  await waitForElement(() => {
    const text = normalizeText(document.body.innerText);
    if (text.includes("product not found")) {
      throw new Error("Product not found on this page.");
    }
    if (text.includes("loading")) return null;
    return document.querySelector<HTMLElement>("button[data-agent-weight]:not(:disabled)");
  }, timeoutMs);
}

export async function waitForListingReady(timeoutMs = 15000): Promise<void> {
  await waitForElement(
    () => document.querySelector<HTMLElement>("[data-agent-product]"),
    timeoutMs
  );
}

export async function waitForPageReady(path: string): Promise<void> {
  if (path.startsWith("/products/")) {
    const text = normalizeText(document.body.innerText);
    if (text.includes("product not found")) {
      throw new Error("Product not found on this page.");
    }
    await waitForProductReady();
    return;
  }
  if (path.includes("pickles")) {
    await waitForListingReady();
    return;
  }
  await sleep(400);
}

export async function waitForElement(
  finder: () => HTMLElement | null,
  timeoutMs = 12000
): Promise<HTMLElement> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const el = finder();
    if (el) return el;
    await sleep(120);
  }
  throw new Error("Timed out waiting for element");
}

/** Brief highlight so the user sees what the agent touched (browser-safe “cursor”). */
export async function highlightAndClick(el: HTMLElement): Promise<void> {
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  await sleep(280);

  const rect = el.getBoundingClientRect();
  const dot = document.createElement("div");
  dot.setAttribute("data-agent-cursor", "true");
  Object.assign(dot.style, {
    position: "fixed",
    left: `${rect.left + rect.width / 2 - 8}px`,
    top: `${rect.top + rect.height / 2 - 8}px`,
    width: "16px",
    height: "16px",
    borderRadius: "999px",
    background: "#e85d2c",
    boxShadow: "0 0 0 4px rgba(232,93,44,0.35)",
    zIndex: "9999",
    pointerEvents: "none",
    transition: "transform 180ms ease",
  });
  document.body.appendChild(dot);
  await sleep(220);
  dot.style.transform = "scale(1.15)";
  await sleep(160);
  el.click();
  await sleep(120);
  dot.remove();
}
