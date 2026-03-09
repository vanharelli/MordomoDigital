import { createClient } from '@supabase/supabase-js';

// Tenta obter as variáveis de ambiente do Vite ou usa hardcoded se não estiverem definidas (para garantir em produção/Vercel)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://uhsedujkzkprogsvfpjj.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoc2VkdWpremtwcm9nc3ZmcGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1ODUyODcsImV4cCI6MjA4NjE2MTI4N30.Av1PWGiMhoMhj6mpNaYxEGUzuyqUxXAsO8-ylC4sHzY";

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
