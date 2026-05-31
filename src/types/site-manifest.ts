export type ManifestActionKind =
  | "click"
  | "type"
  | "hotkey"
  | "scroll"
  | "open_url"
  | "wait"
  | "pause";

export interface ManifestAction {
  action_id: string;
  kind: ManifestActionKind;
  label: string;
  target_texts?: string[];
  route_id?: string;
  element_id?: string;
  url?: string;
  requires_human?: boolean;
  human_handoff_message?: string;
  wait_after_ms?: number;
  success_hints?: string[];
}

export interface ManifestStep {
  step_id: string;
  description?: string;
  requires_human?: boolean;
  actions: ManifestAction[];
}

export interface ManifestWorkflow {
  workflow_id: string;
  name: string;
  intent_hints?: string[];
  routes?: string[];
  steps: ManifestStep[];
}

export interface ManifestRoute {
  route_id: string;
  path: string;
  label: string;
  entry_texts?: string[];
  success_hints?: string[];
}

export interface ManifestElement {
  element_id: string;
  role?: string;
  label?: string;
  text_hints?: string[];
  selector_hint?: string;
  route_hint?: string;
  requires_human?: boolean;
  sensitive?: boolean;
  allow_autofill?: boolean;
}

export interface SiteManifest {
  site_id: string;
  site_name: string;
  version?: string;
  homepage_url: string;
  stack_hint?: string;
  routes: ManifestRoute[];
  elements: ManifestElement[];
  workflows: ManifestWorkflow[];
  sensitive_keywords?: string[];
  restricted_actions?: string[];
}

export interface IntentContext {
  product_name?: string | null;
  product_slug?: string | null;
  category?: "veg" | "non-veg" | null;
  weight_label?: string | null;
}

export interface FinalizedIntent {
  workflow_id: string;
  workflow_name: string;
  reply: string;
  confidence: "high" | "medium" | "low";
  context?: IntentContext;
}
