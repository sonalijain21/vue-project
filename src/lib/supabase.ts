import { createClient } from "@supabase/supabase-js";

// Prefer Vite client envs, fallback to Node-style envs (useful for SSR/tests)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Provide a clearer error if the env vars are missing at runtime
if (!supabaseUrl || !supabaseKey) {
	const missing: string[] = [];
	if (!supabaseUrl) missing.push('VITE_SUPABASE_URL');
	if (!supabaseKey) missing.push('VITE_SUPABASE_PUBLISHABLE_KEY');
	throw new Error(
		`Missing Supabase environment variable(s): ${missing.join(', ')}.\n` +
			`Add them to your .env (or your Vite environment) and restart the dev server. Example:\n` +
			`VITE_SUPABASE_URL=https://your-project.supabase.co\n` +
			`VITE_SUPABASE_PUBLISHABLE_KEY=public-anon-key\n\n` +
			`Note: Do NOT access process.env in client code. For SSR/server usage create the Supabase client on the server side.`
	);
}

export const supabase = createClient(supabaseUrl, supabaseKey);