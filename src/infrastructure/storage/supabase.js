import { createClient } from '@supabase/supabase-js';

console.log('=== SUPABASE MODULE LOADING ===');

// 환경 변수를 안전하게 가져오고 검증
const supabaseUrl = (process.env.REACT_APP_SUPABASE_URL || 'https://orhvdkwmottijmviurdn.supabase.co').trim();
const supabaseAnonKey = (process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yaHZka3dtb3R0aWptdml1cmRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjY3OTAsImV4cCI6MjA2NzY0Mjc5MH0.MXXmhQzoWQNqs91aIlHF74TGCvg2IbBkENk9CiNhtQA').trim();

console.log('=== ENV VARS CHECK ===');
console.log('All process.env keys:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP')));
console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('REACT_APP_SUPABASE_ANON_KEY exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);

console.log('Supabase Config Debug:', {
  url: supabaseUrl,
  urlLength: supabaseUrl.length,
  urlValid: supabaseUrl.startsWith('https://'),
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey.length,
  keyValid: supabaseAnonKey.startsWith('eyJ'),
  keyPrefix: supabaseAnonKey?.substring(0, 20) + '...',
  envUrl: process.env.REACT_APP_SUPABASE_URL,
  envKeyExists: !!process.env.REACT_APP_SUPABASE_ANON_KEY
});

// 더 엄격한 검증
if (!supabaseUrl || !supabaseAnonKey || 
    !supabaseUrl.startsWith('https://') || 
    !supabaseAnonKey.startsWith('eyJ') ||
    supabaseUrl.length < 10 || 
    supabaseAnonKey.length < 50) {
  console.error('Supabase configuration is invalid:', {
    url: supabaseUrl,
    key: supabaseAnonKey?.substring(0, 20) + '...'
  });
  throw new Error('Supabase configuration is invalid');
}

let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'X-Client-Info': 'schrodinger-confession@1.0.0'
      }
    }
  });
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('Failed to create Supabase client:', error);
  throw error;
}

export { supabase };