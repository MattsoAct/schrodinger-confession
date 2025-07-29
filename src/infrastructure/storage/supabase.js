import { createClient } from '@supabase/supabase-js';

console.log('=== SUPABASE MODULE LOADING ===');

// 직접 하드코딩으로 테스트 (환경 변수 문제 우회)
const supabaseUrl = 'https://orhvdkwmottijmviurdn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yaHZka3dtb3R0aWptdml1cmRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNjY3OTAsImV4cCI6MjA2NzY0Mjc5MH0.MXXmhQzoWQNqs91aIlHF74TGCvg2IbBkENk9CiNhtQA';

console.log('=== HARDCODED VALUES TEST ===');
console.log('Using hardcoded values to bypass env var issues');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseAnonKey.length);

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
  console.log('Creating Supabase client with minimal config...');
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client created successfully');
} catch (error) {
  console.error('❌ Failed to create Supabase client:', error);
  throw error;
}

export { supabase };