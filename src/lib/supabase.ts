import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

const getJwtRole = (jwt: string | undefined) => {
  if (!jwt) return null;
  const parts = jwt.split('.');
  if (parts.length < 2) return null;

  try {
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    const payload = JSON.parse(json) as { role?: unknown };
    return typeof payload.role === 'string' ? payload.role : null;
  } catch {
    return null;
  }
};

const hasCreds = !!supabaseUrl && !!supabaseAnonKey;
const jwtRole = getJwtRole(supabaseAnonKey);

export const isSupabaseConfigured = hasCreds && jwtRole !== 'service_role';

if (hasCreds && jwtRole === 'service_role') {
  console.error('Supabase service_role key detected in client env. Refusing to initialize Supabase client.');
}

const url = isSupabaseConfigured ? supabaseUrl! : 'https://placeholder.supabase.co';
const key = isSupabaseConfigured ? supabaseAnonKey! : 'placeholder';

export const supabase = createClient(url, key);
