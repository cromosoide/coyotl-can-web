"use client";

import { createClient } from "@supabase/supabase-js";

let _supabase: any = null;

export function getSupabase() {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) throw new Error("Supabase env vars not set");
  _supabase = createClient(url, key, {
    db: { schema: "coyotl_can" },
  });
  return _supabase;
}

// Lazy getter proxy
export const supabase = new Proxy({} as any, {
  get(_target: any, prop: string | symbol, receiver: any) {
    const client = getSupabase();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
