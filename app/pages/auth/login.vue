<template>
  <div class="w-full max-w-md px-4">
    <div class="card bg-white">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-block mb-4 p-3 bg-linear-to-br from-urban-indigo to-urban-slate rounded-full">
          <span class="text-3xl">👤</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-urban-darkslate mb-2">Welcome Back</h1>
        <p class="text-urban-slate">Sign in to your JobTracker account</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email Field -->
        <div>
          <label class="label">Email Address</label>
          <input v-model="form.email" type="email" class="input-field" placeholder="you@example.com"
            aria-label="Email address" required />
        </div>

        <!-- Password Field -->
        <div>
          <label class="label">Password</label>
          <input v-model="form.password" type="password" class="input-field" placeholder="••••••••"
            aria-label="Password" required />
        </div>

        <!-- Error Message -->
        <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <strong>Error:</strong> {{ error }}
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="loading"
          class="btn-primary w-full py-3 text-base font-semibold transition-all duration-200">
          <span v-if="loading" class="inline-flex items-center gap-2">
            <span
              class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Logging in...
          </span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Register Link -->
      <div class="text-center">
        <p class="text-urban-slate text-sm mb-2">
          Don't have an account?
        </p>
        <NuxtLink to="/auth/register" class="btn-outline w-full text-center py-2.5 text-base font-semibold">
          Create Account
        </NuxtLink>
      </div>

      <!-- Back Home Link -->
      <div class="mt-6 text-center">
        <NuxtLink to="/" class="text-sm text-urban-slate hover:text-urban-indigo transition-colors duration-200">
          ← Back to Home
        </NuxtLink>
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
