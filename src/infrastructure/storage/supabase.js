import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://orhvdkwmottijmviurdn.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yaHZka3dtb3R0aWptdml1cmRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjY3OTAsImV4cCI6MjA2NzY0Mjc5MH0.MXXmhQzoWQNqs91aIlHF74TGCvg2IbBkENk9CiNhtQA';

console.log('Supabase Config Debug:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyPrefix: supabaseAnonKey?.substring(0, 20) + '...',
  envUrl: process.env.REACT_APP_SUPABASE_URL,
  envKeyExists: !!process.env.REACT_APP_SUPABASE_ANON_KEY
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration is missing');
  throw new Error('Supabase configuration is missing');
}

let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('Failed to create Supabase client:', error);
  throw error;
}

export { supabase };