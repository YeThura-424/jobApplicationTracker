<template>
  <div
    class="min-h-screen bg-gradient-to-br from-urban-dark-slate to-urban-slate flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <div class="card bg-white">
        <h1 class="text-3xl font-bold text-urban-dark-slate mb-6">Login</h1>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-urban-dark-slate mb-1">
              Email
            </label>
            <input v-model="form.email" type="email" class="input-field" placeholder="you@example.com" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-urban-dark-slate mb-1">
              Password
            </label>
            <input v-model="form.password" type="password" class="input-field" placeholder="••••••••" required />
          </div>

          <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ error }}
          </div>

          <button type="submit" :disabled="loading"
            class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <p class="mt-6 text-center text-urban-slate">
          Don't have an account?
          <NuxtLink to="/auth/register" class="text-urban-indigo font-medium hover:underline">
            Register here
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { login, loading, error } = useAuth()

const form = ref({
  email: '',
  password: '',
})

const handleLogin = async () => {
  const result = await login(form.value.email, form.value.password)
  if (result.success) {
    navigateTo('/applications')
  }
}
</script>
