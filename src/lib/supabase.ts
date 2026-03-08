import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing! Please check your .env file and restart the server.');
}

// Prevent crash if credentials are missing during dev
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder';

if (url === 'https://placeholder.supabase.co') {
    console.error('⚠️ SUPABASE NOT CONFIGURED: Using placeholder URL. Realtime features will fail. Restart the server after editing .env');
}

export const supabase = createClient(url, key);
export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;
