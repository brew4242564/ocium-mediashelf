import { createClient } from "@supabase/supabase-js";

const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;

export const supabase = createClient(supabaseURL, supabaseKey);  