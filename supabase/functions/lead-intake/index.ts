// Supabase Edge Function: lead-intake
// Deno runtime
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const SLACK_WEBHOOK_URL = Deno.env.get('SLACK_WEBHOOK_URL');

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

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
    const { row } = await req.json();
    if (!row || typeof row !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    // Extract first-class fields if present in row.additional_info
    let email: string | null = null;
    try {
      const ai = typeof row.additional_info === 'string' ? JSON.parse(row.additional_info) : row.additional_info;
      if (ai && typeof ai === 'object') {
        if (ai.contact_email && isValidEmail(ai.contact_email)) email = ai.contact_email;
        const meta = ai.meta || {};
        row.source_site = meta.source_site || null;
        row.path = meta.path || null;
        const utm = meta.utm || {};
        row.utm_source = utm.utm_source || null;
        row.utm_medium = utm.utm_medium || null;
        row.utm_campaign = utm.utm_campaign || null;
        row.utm_term = utm.utm_term || null;
        row.utm_content = utm.utm_content || null;
        row.ref = utm.ref || null;
      }
    } catch (_e) {}
    if (email) row.email = email;

    // Upsert / Insert
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
