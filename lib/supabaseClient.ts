import { createClient } from '@supabase/supabase-js';

// Use the actual values directly since env vars aren't loading properly
const supabaseUrl = 'https://qznjubmqvrcwdbgvgxss.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bmp1Ym1xdnJjd2RiZ3ZneHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDA2OTYsImV4cCI6MjA3NTg3NjY5Nn0.UR-8DwlpiOm1YoSSdD-iQRFuWk9gSFRYuSnB67Ijf_I';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
