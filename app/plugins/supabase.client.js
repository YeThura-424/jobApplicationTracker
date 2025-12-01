import { createClient } from "@supabase/supabase-js"

export default defineNuxtPlugin(() => { 

  const runtimeConfig = useRuntimeConfig()

  const supabaseUrl = runtimeConfig.public.supabaseUrl
  const supabaseAnonKey = runtimeConfig.public.supabaseAnonKey

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  return {
    provide: {
      supabase
    }
  }
})