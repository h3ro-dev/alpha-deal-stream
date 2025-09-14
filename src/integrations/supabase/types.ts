+export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      lead_forms: {
        Row: {
          additional_info: string | null
          company_name: string
          company_url: string | null
          created_at: string
          engagement_model: string
          full_name: string
          id: string
          ideal_lead: string
          industry: string
          lead_capacity: string
          pain_points: string
          phone: string | null
          spend_range: string
          success_rate: string
          title: string
          updated_at: string
          value_message: string
        }
        Insert: {
          additional_info?: string | null
          company_name: string
          company_url?: string | null
          created_at?: string
          engagement_model: string
          full_name: string
          id?: string
          ideal_lead: string
          industry: string
          lead_capacity: string
          pain_points: string
          phone?: string | null
          spend_range: string
          success_rate: string
          title: string
          updated_at?: string
          value_message: string
        }
        Update: {
          additional_info?: string | null
          company_name?: string
          company_url?: string | null
          created_at?: string
          engagement_model?: string
          full_name?: string
          id?: string
          ideal_lead?: string
          industry?: string
          lead_capacity?: string
          pain_points?: string
          phone?: string | null
          spend_range?: string
          success_rate?: string
          title?: string
          updated_at?: string
          value_message?: string
        }
        Relationships: []
      }
      rsvps: {
        Row: {
          created_at: string
          email: string
          guests: number
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          guests?: number
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          guests?: number
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
