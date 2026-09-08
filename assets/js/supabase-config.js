// ============================================================
// 🔧 SUPABASE CONFIG — REPLACE WITH YOUR OWN PROJECT KEYS
// ============================================================
// How to get these:
// 1. Go to https://supabase.com/ → Sign in → New Project
// 2. Once created: Project Settings → API
// 3. Copy "Project URL" → paste into SUPABASE_URL below
// 4. Copy "anon public" key → paste into SUPABASE_ANON_KEY below
// (Full setup steps: see SUPABASE-SETUP.md)
// ============================================================

const SUPABASE_URL = "https://bmmlcqcpisvlihgbsauf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_WPqX5mVzIuCHUyMQ4Q3cVA_xj3yofUh";

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
