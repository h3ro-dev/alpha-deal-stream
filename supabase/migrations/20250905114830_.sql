-- Remove the insecure anonymous read policy from rsvps table
DROP POLICY IF EXISTS "Allow anonymous reads" ON public.rsvps;

-- Create a secure lead_forms table for questionnaire data
CREATE TABLE public.lead_forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_url TEXT,
  phone TEXT,
  industry TEXT NOT NULL,
  ideal_lead TEXT NOT NULL,
  pain_points TEXT NOT NULL,
  lead_capacity TEXT NOT NULL,
  spend_range TEXT NOT NULL,
  success_rate TEXT NOT NULL,
  value_message TEXT NOT NULL,
  engagement_model TEXT NOT NULL,
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on lead_forms table
ALTER TABLE public.lead_forms ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for form submissions
CREATE POLICY "Allow anonymous form submissions" 
ON public.lead_forms 
FOR INSERT 
WITH CHECK (true);

-- Restrict reads to authenticated admin users only (no anonymous reads)
CREATE POLICY "Admin only reads" 
ON public.lead_forms 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Add updated_at trigger for lead_forms
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_lead_forms_updated_at
  BEFORE UPDATE ON public.lead_forms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update rsvps table to only allow admin reads (no more anonymous reads)
CREATE POLICY "Admin only rsvp reads" 
ON public.rsvps 
FOR SELECT 
USING (auth.role() = 'authenticated');;
