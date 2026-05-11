import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

const url = supabaseUrl ?? 'https://placeholder.supabase.co';
const key = supabaseAnonKey ?? 'placeholder';

export const supabase = createClient(url, key);
