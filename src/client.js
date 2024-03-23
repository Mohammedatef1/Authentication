import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zwuegixqfrqsntjqqrzv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dWVnaXhxZnJxc250anFxcnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExMTMyODAsImV4cCI6MjAyNjY4OTI4MH0.o2RZ6X53Yu5alXY5-KMFyfWaK9gB7gcRfsqCjvRg9yk";

export const supabase = createClient(supabaseUrl, supabaseKey);
