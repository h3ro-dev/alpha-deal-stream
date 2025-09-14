// Supabase Edge Function: lead-intake
// Deno runtime
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
const SLACK_WEBHOOK_URL = Deno.env.get('SLACK_WEBHOOK_URL')
  ?? 'https://hooks.slack.com/services/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';

function getClient(req: Request) {
  if (SERVICE_ROLE_KEY) {
    return createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  }
  const headers: Record<string, string> = {};
  const auth = req.headers.get('Authorization');
  if (auth) headers['Authorization'] = auth;
  return createClient(SUPABASE_URL, ANON_KEY ?? '', { global: { headers } });
}

function isValidEmail(email?: string | null) {
  if (!email) return false;
  return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
}

async function postToSlack(text: string) {
  if (!SLACK_WEBHOOK_URL) return;
  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
  } catch (_e) {}
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }
  try {
    const supabase = getClient(req);
    const { row } = await req.json();
    if (!row || typeof row !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    // Parse additional_info and project email + attribution to first-class columns
    let email: string | null = null;
    let source_site: string | null = null;
    let path: string | null = null;
    let utm: Record<string,string> = {};
    // Capture best-effort client IP for later analysis
    const ip = req.headers.get('cf-connecting-ip')
      || req.headers.get('x-real-ip')
      || (req.headers.get('x-forwarded-for')?.split(',')[0]?.trim())
      || null;
    const ua = req.headers.get('user-agent') || '';

    try {
      const ai = typeof row.additional_info === 'string' ? JSON.parse(row.additional_info) : (row.additional_info || {});
      if (ai && typeof ai === 'object') {
        if (ai.contact_email && isValidEmail(ai.contact_email)) email = ai.contact_email;
        const meta = ai.meta || {};
        source_site = meta.source_site || null;
        path = meta.path || null;
        utm = meta.utm || {};
        // store ip into meta
        meta.ip = meta.ip || ip || null;
        ai.meta = meta;
        row.additional_info = JSON.stringify(ai);
      }
    } catch (_e) {
      // If parsing fails, rebuild additional_info with minimal payload
      const meta: any = { source_site, path, utm, ip };
      row.additional_info = JSON.stringify({ contact_email: email, meta });
    }

    // Fill first-class columns from parsed metadata
    if (email) row.email = email;
    if (source_site) row.source_site = source_site;
    if (path) row.path = path;
    if (utm) {
      row.utm_source = utm.utm_source || null;
      row.utm_medium = utm.utm_medium || null;
      row.utm_campaign = utm.utm_campaign || null;
      row.utm_term = utm.utm_term || null;
      row.utm_content = utm.utm_content || null;
      row.ref = utm.ref || null;
    }

    // Simple email-based rate limit: max 3 per 2 minutes
    if (email) {
      const since = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const { count, error: countErr } = await supabase
        .from('lead_forms')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', since)
        .eq('email', email);
      if (!countErr && (count ?? 0) >= 3) {
        return new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), { status: 429 });
      }
    }

    // Honeypot checks: silently accept but drop if bots fill either field
    const hp = (row.hpt || row.honeypot || row.hp || '').toString().trim();
    const hp2 = (row.hp2 || row.website_url || '').toString().trim();
    if (hp || hp2) {
      // Optional: log to Slack for monitoring
      await postToSlack(`Honeypot triggered from ${email || 'unknown'} on ${source_site || ''}`);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // Small dynamic delay for suspicious patterns to degrade bot throughput
    const looksSuspicious = (!email || !ua || ua.length < 10);
    if (looksSuspicious) {
      const ms = 100 + Math.floor(Math.random() * 250);
      await new Promise((r) => setTimeout(r, ms));
    }

    // Satisfy NOT NULL constraints with safe defaults
    const required = [
      'ideal_lead', 'lead_capacity', 'spend_range', 'success_rate', 'engagement_model',
      'full_name', 'company_name', 'industry', 'title', 'value_message', 'pain_points'
    ];
    for (const k of required) {
      if (row[k] === undefined || row[k] === null) row[k] = '';
    }

    const { error } = await supabase.from('lead_forms').insert([row]);
    if (error) {
      await postToSlack(`Lead insert failed: ${error.message}`);
      return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 400 });
    }

    await postToSlack(`New lead: ${row.full_name || ''} <${row.email || ''}> from ${row.source_site || ''}`);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e?.message || e) }), { status: 500 });
  }
});
