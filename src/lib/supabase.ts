import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_BOLT_DATABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_BOLT_DATABASE_ANON_KEY;

const hardcodedUrl = "https://lxqkwfdlxsffcnlibkcn.supabase.co";
const hardcodedAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4cWt3ZmRseHNmZmNubGlia2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NTA2MDksImV4cCI6MjA3NTAyNjYwOX0.RO-Ktsd-O4vz1KG6NF07xPtY6z_1RltSdbzjkcAQpB4";

const finalUrl = supabaseUrl || hardcodedUrl;
const finalAnonKey = supabaseAnonKey || hardcodedAnonKey;

if (!finalUrl || !finalAnonKey) {
  throw new Error("Missing Supabase credentials");
}

export const supabase = createClient(finalUrl, finalAnonKey);
