import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. The system will run in "Local Mode" without database persistence.');
}

// Prevent crash if credentials are missing during dev
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder';

if (url === 'https://placeholder.supabase.co') {
    console.info('ℹ️ SUPABASE NOT CONFIGURED: Using placeholder client. Features like Announcements and Admin Panel will use local mock data.');
}

export const supabase = createClient(url, key);
export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;
