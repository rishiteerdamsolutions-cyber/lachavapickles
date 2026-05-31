import type {
  FinalizedIntent,
  ManifestAction,
  ManifestWorkflow,
  SiteManifest,
} from "@/types/site-manifest";
import { addProductToCartBySlug } from "@/lib/agent/direct-actions";
import { fallbackPathForRoute, routePathForId } from "@/lib/agent/routes";
import {
  collectClickables,
  elementText,
  findBySelectorHint,
  findByTextHints,
  findProductCard,
  findWeightButton,
  getManifestElement,
  highlightAndClick,
  normalizeText,
  sleep,
  waitForElement,
  waitForPageReady,
  waitForPath,
  waitForProductReady,
  waitForTexts,
} from "@/lib/agent/dom-perception";

export class AgentPauseError extends Error {
  constructor(
    message: string,
    public handoffMessage: string
  ) {
    super(message);
    this.name = "AgentPauseError";
  }
}

export type NavigateFn = (path: string) => void | Promise<void>;

function isSizeAction(action: ManifestAction): boolean {
  if (action.element_id === "size_select") return true;
  const blob = [...(action.target_texts ?? []), action.label].map(normalizeText).join(" ");
  return blob.includes("select size") || /\bsize\b/.test(blob);
}

function isProductCardAction(action: ManifestAction): boolean {
  if (action.element_id === "product_card") return true;
  return (action.target_texts ?? []).some((t) => /product/i.test(t));
}

function isAddToCartAction(action: ManifestAction): boolean {
  if (action.element_id === "add_to_cart") return true;
  return (action.target_texts ?? []).some((t) => normalizeText(t).includes("add to cart"));
}

function resolveClickTarget(
  action: ManifestAction,
  manifest: SiteManifest,
  context: FinalizedIntent["context"]
): HTMLElement | null {
  const manifestEl = getManifestElement(manifest, action.element_id);

  if (manifestEl?.requires_human || action.requires_human) {
    return null;
  }

  const fromSelector = findBySelectorHint(manifestEl?.selector_hint);
  if (fromSelector && !fromSelector.hasAttribute("disabled")) return fromSelector;

  if (isSizeAction(action)) {
    return findWeightButton(context?.weight_label);
  }

  if (isProductCardAction(action)) {
    if (window.location.pathname.startsWith("/products/")) {
      return null;
    }
    return findProductCard(context?.product_name);
  }

  if (isAddToCartAction(action)) {
    for (const el of collectClickables()) {
      if (normalizeText(elementText(el)).includes("add to cart")) return el;
    }
  }

  const hints = [
    ...(action.target_texts ?? []),
    ...(manifestEl?.text_hints ?? []),
    action.label,
    manifestEl?.label ?? "",
  ].filter(Boolean);

  return findByTextHints(hints);
}

async function navigateTo(path: string, navigate: NavigateFn): Promise<void> {
  const target = path.split("?")[0];
  await navigate(path);
  if (window.location.pathname !== target && !window.location.pathname.startsWith(`${target}/`)) {
    await waitForPath(target, 5000);
  }
  await sleep(400);
  await waitForPageReady(target);
}

function stepsForWorkflow(
  workflow: ManifestWorkflow,
  context: FinalizedIntent["context"]
): ManifestWorkflow["steps"] {
  if (workflow.workflow_id !== "browse_and_add_to_cart") {
    return workflow.steps;
  }
  if (context?.product_slug) {
    return workflow.steps.filter((s) => s.step_id !== "open_product");
  }
  return workflow.steps;
}

async function executeAction(
  action: ManifestAction,
  manifest: SiteManifest,
  navigate: NavigateFn,
  context: FinalizedIntent["context"]
): Promise<void> {
  if (action.requires_human || action.kind === "pause") {
    throw new AgentPauseError(
      action.human_handoff_message || action.label,
      action.human_handoff_message ||
        "Please complete this step manually on the page."
    );
  }

  switch (action.kind) {
    case "open_url": {
      const path =
        action.url ??
        (action.route_id
          ? routePathForId(manifest, action.route_id) ??
            fallbackPathForRoute(action.route_id)
          : undefined);
      if (!path) throw new Error(`No URL for action ${action.action_id}`);
      await navigateTo(path, navigate);
      return;
    }
    case "wait": {
      await waitForTexts(action.target_texts ?? action.success_hints ?? [action.label]);
      await sleep(action.wait_after_ms ?? 300);
      return;
    }
    case "click": {
      if (isProductCardAction(action) && window.location.pathname.startsWith("/products/")) {
        await sleep(action.wait_after_ms ?? 200);
        return;
      }

      if (isSizeAction(action)) {
        await waitForProductReady();
      }

      let el = resolveClickTarget(action, manifest, context);

      if (!el && action.route_id) {
        const path =
          routePathForId(manifest, action.route_id) ??
          fallbackPathForRoute(action.route_id);
        if (path && window.location.pathname !== path) {
          await navigateTo(path, navigate);
          el = resolveClickTarget(action, manifest, context);
        }
      }

      if (!el && isProductCardAction(action) && context?.product_slug) {
        await navigateTo(`/products/${context.product_slug}`, navigate);
        el = resolveClickTarget(action, manifest, context);
      }

      if (!el) {
        el = await waitForElement(
          () => resolveClickTarget(action, manifest, context),
          8000
        ).catch(() => null);
      }

      if (!el) {
        throw new Error(`Could not find control for: ${action.label}`);
      }

      await highlightAndClick(el);
      await sleep(action.wait_after_ms ?? 300);
      return;
    }
    default:
      return;
  }
}

async function runPreflight(
  workflow: ManifestWorkflow,
  context: FinalizedIntent["context"],
  navigate: NavigateFn
): Promise<void> {
  if (workflow.workflow_id !== "browse_and_add_to_cart") return;

  if (context?.product_slug) {
    const onProduct = window.location.pathname === `/products/${context.product_slug}`;
    if (!onProduct) {
      await navigateTo(`/products/${context.product_slug}`, navigate);
    }
    return;
  }

  const category = context?.category;
  const listing =
    category === "non-veg"
      ? "/non-veg-pickles"
      : category === "veg" || context?.product_name
        ? "/veg-pickles"
        : null;

  if (listing && !window.location.pathname.startsWith("/products/")) {
    const onListing = window.location.pathname === listing;
    if (!onListing) await navigateTo(listing, navigate);
  }
}

export async function executeWorkflow(
  workflow: ManifestWorkflow,
  manifest: SiteManifest,
  navigate: NavigateFn,
  finalized: FinalizedIntent,
  onStep?: (message: string) => void
): Promise<void> {
  if (
    workflow.workflow_id === "browse_and_add_to_cart" &&
    finalized.context?.product_slug
  ) {
    onStep?.("Adding to cart…");
    const result = await addProductToCartBySlug(
      finalized.context.product_slug,
      finalized.context.weight_label
    );
    onStep?.(`Added ${result.productName} (${result.variantLabel}) to cart.`);
    return;
  }

  await runPreflight(workflow, finalized.context, navigate);

  const steps = stepsForWorkflow(workflow, finalized.context);

  for (const step of steps) {
    if (step.requires_human) {
      throw new AgentPauseError(
        step.description || "Human step required",
        "Please complete this step manually."
      );
    }
    onStep?.(step.description || step.step_id);
    for (const action of step.actions) {
      await executeAction(action, manifest, navigate, finalized.context);
    }
  }
}

export function getWorkflow(
  manifest: SiteManifest,
  workflowId: string
): ManifestWorkflow | undefined {
  return manifest.workflows.find((w) => w.workflow_id === workflowId);
}

export async function loadClientManifest(): Promise<SiteManifest> {
  const res = await fetch("/manifest/site-manifest.json");
  if (!res.ok) throw new Error("Could not load site manifest");
  return res.json() as Promise<SiteManifest>;
}
