// lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tickets: {
        Row: {
          id: string;
          title: string;
          description: string;
          priority: string;
          status: string;
          client_id: string;
          company_id: string;
          assignee_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          priority: string;
          status?: string;
          client_id: string;
          company_id: string;
          assignee_id?: string | null;
        };
        Update: {
          title?: string;
          description?: string;
          priority?: string;
          status?: string;
          assignee_id?: string | null;
        };
      };

      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          company_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          company_id: string;
          role?: string;
        };
        Update: {
          full_name?: string | null;
          company_id?: string;
          role?: string;
        };
      };
    };
  };
}
