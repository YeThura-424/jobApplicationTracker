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
          <p @click="showResetModal = true"
            class="text-sm text-urban-primary italic hover:text-urban-indigo cursor-pointer transition-colors duration-200 pt-2">
            Forgot Password?
          </p>
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
        <p class="text-urban-slate text-sm pb-5">
          Don't have an account?
        </p>
        <NuxtLink to="/auth/register" class="btn-outline w-full text-center py-2.5 text-base font-semibold">
          Create Account
        </NuxtLink>
      </div>

      <!-- Back Home Link -->
      <div class="mt-4 text-center">
        <NuxtLink to="/" class="text-sm text-urban-slate hover:text-urban-indigo transition-colors duration-200">
          ← Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- modal box  -->
  <Teleport to="body">
    <div v-if="showResetModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-urban-darkslate">
            Reset Password
          </h2>

          <button @click="showResetModal = false" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <p class="text-sm text-gray-600 mb-4">
          Enter your email address and we'll send you a password reset link.
        </p>

        <input v-model="resetEmail" type="email" placeholder="you@example.com" class="input-field" />

        <div v-if="resetMessage" class="mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
          {{ resetMessage }}
        </div>

        <div v-if="resetError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {{ resetError }}
        </div>

        <div class="flex gap-3 mt-5">
          <button @click="showResetModal = false" class="btn-outline flex-1">
            Cancel
          </button>

          <button @click="sendResetEmail" :disabled="resetLoading || !resetEmail" class="btn-primary flex-1">
            <span v-if="resetLoading">
              Sending...
            </span>

            <span v-else>
              Send Link
            </span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>

</template>

<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})
const { $supabase } = useNuxtApp()

const baseURL = 'https://gr-job-trace.netlify.app/';

const showResetModal = ref(false)
const resetEmail = ref('')
const resetLoading = ref(false)
const resetMessage = ref('')
const resetError = ref('')

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

const sendResetEmail = async () => {
  resetLoading.value = true
  resetError.value = ''
  resetMessage.value = ''

  const { error } = await $supabase.auth.resetPasswordForEmail(
    resetEmail.value,
    {
      redirectTo: `${baseURL}/auth/password-reset`,
    }
  )

  if (error) {
    resetError.value = error.message
  } else {
    resetMessage.value =
      'If an account exists for this email, a password reset link has been sent.'

    setTimeout(() => {
      showResetModal.value = false;
    }, 200);
  }

  resetLoading.value = false
}
</script>
