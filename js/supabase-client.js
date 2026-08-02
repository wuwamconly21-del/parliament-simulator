/* ==========================================================================
   Supabase Client Configuration
   ========================================================================== */

const SUPABASE_URL = "https://xhrabduyqoufiakhvpni.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_6Hm_Po8BOuuV36YlCqOz3g_rTHDqzyV";

const sb = (SUPABASE_URL.startsWith("http") && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;