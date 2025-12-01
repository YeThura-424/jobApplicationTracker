export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $supabase: supabase } = useNuxtApp()

  const { data: { session } } = await supabase.auth.getSession()

  // If no session and trying to access protected route, redirect to login
  if (!session && to.path !== '/auth/login' && to.path !== '/auth/register' && to.path !== '/') {
    return navigateTo('/auth/login')
  }

  // If session exists and trying to access auth pages, redirect to dashboard
  if (session && (to.path === '/auth/login' || to.path === '/auth/register')) {
    return navigateTo('/applications')
  }
})
