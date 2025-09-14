-- Enable RLS and timestamps, add columns, indexes, and policy
alter table if exists public.lead_forms enable row level security;

alter table if exists public.lead_forms
  alter column created_at set default now(),
  alter column updated_at set default now();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_lead_forms_updated on public.lead_forms;
create trigger trg_lead_forms_updated
before update on public.lead_forms
for each row execute procedure public.set_updated_at();

alter table if exists public.lead_forms
  add column if not exists email text,
  add column if not exists source_site text,
  add column if not exists path text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_term text,
  add column if not exists utm_content text,
  add column if not exists ref text;

create index if not exists idx_lead_forms_created_at on public.lead_forms (created_at desc);
create index if not exists idx_lead_forms_email on public.lead_forms (lower(email));

create unique index if not exists uniq_lead_email_day
on public.lead_forms (lower(email), date_trunc('day', created_at))
where email is not null;

drop policy if exists anon_insert_leads on public.lead_forms;
create policy anon_insert_leads on public.lead_forms
for insert to anon with check (
  (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);
