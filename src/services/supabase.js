/**
 * Supabase service layer — future-ready stub.
 *
 * Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file
 * when you're ready to activate Supabase.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY
const isConfigured = Boolean(supabaseUrl && supabaseKey)

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null

// ── AR Experiences ─────────────────────────────────────────────────────────

/**
 * Fetch all AR experiences from Supabase.
 * Falls back to null if Supabase is not configured.
 */
export async function fetchARExperiences() {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('ar_experiences')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Fetch AR experiences by category.
 */
export async function fetchByCategory(category) {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('ar_experiences')
    .select('*')
    .eq('category', category)

  if (error) throw error
  return data
}

// ── Contact Form ───────────────────────────────────────────────────────────

/**
 * Submit a contact form message to Supabase.
 */
export async function submitContactForm({ name, email, message }) {
  if (!supabase) return null

  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, message }])
    .select()

  if (error) throw error
  return data
}
