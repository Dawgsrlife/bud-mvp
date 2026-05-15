/**
 * Environment configuration.
 *
 * For Amir: this file is the *only* place we read config values from the build.
 * Expo SDK 54 exposes `process.env.EXPO_PUBLIC_*` vars at build time. The publishable
 * Supabase key is safe to bundle into the mobile client (it's the anon key, scoped
 * by RLS). The service-role secret NEVER lives here; it stays in Supabase Edge
 * Function secrets only.
 *
 * If you ever see `EXPO_PUBLIC_SUPABASE_SECRET` in this file, delete it and shout.
 *
 * SOLID: Single Responsibility. This file does environment plumbing, nothing else.
 */

interface AppConfig {
  /** Supabase project URL (e.g. https://abcdefg.supabase.co). */
  readonly supabaseUrl: string;

  /** Publishable / anon key. Safe to embed in the mobile client. RLS enforces access. */
  readonly supabaseAnonKey: string;
}

/**
 * Read environment variables with a fallback warning if missing.
 * Production builds should NEVER hit the fallback path; it exists so dev preview
 * still renders something meaningful instead of a crash.
 */
function readEnv(key: string, fallback: string): string {
  const value = process.env[key];
  if (value === undefined || value === '') {
    if (__DEV__) {
      console.warn(
        `[env] ${key} is missing. Using fallback. ` +
          `Set in .env or app.json -> expo.extra to enable backend features.`,
      );
    }
    return fallback;
  }
  return value;
}

/**
 * Public config. Imported by anything that needs to talk to the backend.
 *
 * Currently both Supabase fields fall back to the live BUD project values for
 * dev convenience. Once we wire EAS Build secrets, the fallbacks will only fire
 * on local web preview.
 */
export const config: AppConfig = {
  supabaseUrl: readEnv(
    'EXPO_PUBLIC_SUPABASE_URL',
    'https://rtmeutqbxswjfhjdlnop.supabase.co',
  ),
  supabaseAnonKey: readEnv(
    'EXPO_PUBLIC_SUPABASE_ANON_KEY',
    'sb_publishable_IgRQ6AuVl_l_RkFB6r-vhQ_pybEC52K',
  ),
};
