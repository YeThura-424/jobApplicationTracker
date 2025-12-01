<template>
  <div class="w-full max-w-xl px-4">
    <div class="card bg-white">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-block mb-4 p-3 bg-linear-to-br from-urban-indigo to-urban-slate rounded-full">
          <span class="text-3xl">✨</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-urban-darkslate mb-2">Create Account</h1>
        <p class="text-urban-slate">Join thousands tracking their job search</p>
      </div>

      <!-- Register Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Full Name -->
        <div>
          <label class="label">Full Name</label>
          <input v-model="form.name" type="text" class="input-field" placeholder="John Doe" aria-label="Full name"
            required />
        </div>

        <!-- Email -->
        <div>
          <label class="label">Email Address</label>
          <input v-model="form.email" type="email" class="input-field" placeholder="you@example.com"
            aria-label="Email address" required />
        </div>

        <!-- Occupation -->
        <div>
          <label class="label">Occupation</label>
          <input v-model="form.occupation" type="text" class="input-field" placeholder="e.g., Software Engineer"
            aria-label="Occupation" required />
        </div>

        <!-- Age and Country Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="label">Age</label>
            <input v-model.number="form.age" type="number" class="input-field" placeholder="25" aria-label="Age"
              min="18" required />
          </div>
          <div>
            <label class="label">Country</label>
            <input v-model="form.country" type="text" class="input-field" placeholder="USA" aria-label="Country"
              required />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label class="label">Password</label>
          <input v-model="form.password" type="password" class="input-field" placeholder="••••••••"
            aria-label="Password" minlength="6" required />
          <p class="text-xs text-urban-slate mt-1">Minimum 6 characters</p>
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
            Creating account...
          </span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Login Link -->
      <div class="text-center">
        <p class="text-urban-slate text-sm mb-2">
          Already have an account?
        </p>
        <NuxtLink to="/auth/login" class="btn-outline w-full text-center py-2.5 text-base font-semibold">
          Sign In
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

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { register, loading, error } = useAuth()

const form = ref({
  name: '',
  email: '',
  occupation: '',
  age: null,
  country: '',
  password: '',
})

const handleRegister = async () => {
  const result = await register(form.value)
  if (result.success) {
    navigateTo('/applications')
  }
}
</script>
