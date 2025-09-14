import { supabase } from "@/integrations/supabase/client";

type AnyRecord = Record<string, any>;

function pickString(raw: AnyRecord, keys: string[], fallback: string = ""): string {
  for (const k of keys) {
    const v = raw?.[k];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return fallback;
}

function coercePainPoints(raw: AnyRecord): string {
  const a = raw?.challenges;
  if (Array.isArray(a) && a.length) return a.join(", ");
  return (
    pickString(raw, ["pain_points", "challenge", "biggestChallenge", "challenges", "problem"]) || ""
  );
}

function collectUtm(): Record<string, string> {
  try {
    const url = new URL(window.location.href);
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "ref",
    ];
    const out: Record<string, string> = {};
    for (const k of utmKeys) {
      const v = url.searchParams.get(k);
      if (v) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

export async function submitLead(raw: AnyRecord): Promise<{ ok: boolean; error?: string }>
{
  try {
    const full_name = pickString(raw, ["full_name", "fullName", "name"]);
    const company_name = pickString(raw, [
      "company_name",
      "company",
      "companyName",
      "corporationName",
      "businessName",
    ]);
    const industry = pickString(raw, ["industry"]);
    const title = pickString(raw, ["title", "currentRole", "role"]);
    const value_message = pickString(raw, ["value_message", "successVision", "valueMessage"]);
    const ideal_lead = pickString(raw, ["ideal_lead"]);
    const lead_capacity = pickString(raw, ["lead_capacity"]);
    const spend_range = pickString(raw, ["spend_range"]);
    const success_rate = pickString(raw, ["success_rate"]);
    const pain_points = coercePainPoints(raw);
    const phone = pickString(raw, ["phone", "telephone"], "");
    const company_url = pickString(raw, ["company_url", "companyUrl", "website", "site"], "");
    const contact_email = pickString(raw, ["email", "contactEmail", "workEmail"], "");

    const source_info = {
      source_site: typeof window !== "undefined" ? window.location.host : "",
      path: typeof window !== "undefined" ? window.location.pathname : "",
      utm: collectUtm(),
    };

    const additional_info = JSON.stringify({
      contact_email,
      raw,
      meta: source_info,
    });

    // Honeypot pickup (DOM hidden input)
    try {
      if (typeof window !== "undefined") {
        const el = window.document.querySelector("input[name=\"hpt\"]") as HTMLInputElement | null;
        if (el && el.value) { (raw as any).hpt = el.value; }
      }
    } catch {}


    const row = {
      full_name,
      company_name,
      industry,
      title,
      value_message,
      ideal_lead,
      lead_capacity,
      spend_range,
      success_rate,
      pain_points,
      phone: phone || null,
      company_url: company_url || null,
      additional_info,
    } as any;

    // Try Edge Function first (if deployed), then fallback
    try {
      const { data, error: fnError } = await supabase.functions.invoke('lead-intake', { body: { row } });
      if (!fnError) return { ok: true };
    } catch (_e) {
      // ignore and fallback to direct insert
    }
    const { error } = await supabase.from("lead_forms").insert([row]);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) };
  }
}
