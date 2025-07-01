
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://npbzwdadusywnevwozya.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wYnp3ZGFkdXN5d25ldndvenlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTUxMTUsImV4cCI6MjA2NTE5MTExNX0.tUGCjPJ15-L4hIyiE8sQ46GwHtD0Qt-99Yo0VJOpug4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
