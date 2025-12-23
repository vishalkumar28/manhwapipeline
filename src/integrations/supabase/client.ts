import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://jktyylrjyqxuvgfirske.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Xbv0ZRGoNgtSie0TC2EuNA_9_aaerg3";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
