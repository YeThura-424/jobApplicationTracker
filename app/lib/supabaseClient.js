import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const runtimeConfig = useRuntimeConfig()

const supabaseUrl = runtimeConfig.public.supabaseUrl
const supabaseAnonKey = runtimeConfig.public.supabaseAnonKey

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase