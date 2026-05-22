import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pcwhelkqjjiwubfdgzvp.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjd2hlbGtxamppd3ViZmRnenZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMjY3MDUsImV4cCI6MjA5NDkwMjcwNX0.HHLtFxLSIW4KaRH_HL-FTXw6mov35R3YzttXw729kBM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
