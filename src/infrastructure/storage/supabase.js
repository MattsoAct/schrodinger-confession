import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://orhvdkwmottijmviurdn.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yaHZka3dtb3R0aWptdml1cmRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjY3OTAsImV4cCI6MjA2NzY0Mjc5MH0.MXXmhQzoWQNqs91aIlHF74TGCvg2IbBkENk9CiNhtQA';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration is missing');
  throw new Error('Supabase configuration is missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});