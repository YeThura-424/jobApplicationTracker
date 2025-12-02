import type { User, UserCredentials } from '~/types'

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const checkAuth = async () => {
    try {
      const { data: { session } } = await $supabase.auth.getSession()
      if (session?.user) {
        // Fetch user profile from database
        const { data, error: fetchError } = await $supabase
          .from('profile')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (fetchError) throw fetchError
        user.value = data
      }
    } catch (err) {
      console.error('Auth check error:', err)
    }
  }

  const register = async (credentials: UserCredentials) => {
    loading.value = true
    error.value = null

    try {
      // Sign up user
      const { data: authData, error: authError } = await $supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      })

      if (authError) throw authError

      if (!authData.user) throw new Error('Registration failed')

      // Create user profile
      const { data: profileData, error: profileError } = await $supabase
        .from('profile')
        .insert([
          {
            id: authData.user.id,
            name: credentials.name,
            occupation: credentials.occupation,
            age: credentials.age,
            country: credentials.country,
          },
        ])
        .select()
        .single()

      if (profileError) throw profileError

      user.value = profileData
      return { success: true, user: profileData }
    } catch (err: any) {
      error.value = err.message || 'Registration failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: loginError } = await $supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) throw loginError

      if (!data.user) throw new Error('Login failed')

      // Fetch user profile
      const { data: profileData, error: profileError } = await $supabase
        .from('profile')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError) throw profileError

      user.value = profileData
      return { success: true, user: profileData }
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null

    try {
      const { error: logoutError } = await $supabase.auth.signOut()
      if (logoutError) throw logoutError

      user.value = null
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'Logout failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    checkAuth()
  })

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    register,
    login,
    logout,
    checkAuth,
  }
}
