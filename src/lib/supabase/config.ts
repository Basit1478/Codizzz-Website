export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://coxptjvzdwdphcpdnrsg.supabase.co";
export const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const adminEmail = (process.env.ADMIN_EMAIL ?? "teamcodizzz@gmail.com").toLowerCase();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);
