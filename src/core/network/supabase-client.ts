/**
 * Supabase client singleton.
 *
 * For Amir: the entire app talks to Supabase through THIS file. Nowhere else
 * imports `@supabase/supabase-js` directly. That keeps the swap to (eventually)
 * a different backend a one-file change. If you see another file importing the
 * SDK, push back in PR review.
 *
 * SOLID: Single Responsibility (the SDK + anon-key glue), Open-Closed (this is
 * the seam where backend swaps would happen).
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config/env';

let cachedClient: SupabaseClient | null = null;

/**
 * Get-or-create the Supabase client.
 *
 * The client is created lazily on first access so we don't pay the cost during
 * cold start when the user is on the launch screen and we haven't shown them
 * anything yet.
 *
 * AsyncStorage adapter is NOT wired here in slice 5 because we have no auth
 * flow yet (anon access only). Slice 6 will pass a custom storage adapter for
 * session persistence.
 */
export function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient;

  cachedClient = createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return cachedClient;
}
