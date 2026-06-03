<template>
  <div class="w-full max-w-md px-4">
    <div class="card bg-white">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-block mb-4 p-3 bg-linear-to-br from-urban-indigo to-urban-slate rounded-full">
          <span class="text-3xl">👤</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-urban-darkslate mb-2">Password Reset Here</h1>
        <p class="text-urban-slate">Type your new password here</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="resetPassword" class="space-y-5">


        <!-- Password Field -->
        <div>
          <label class="label">New Password</label>
          <input v-model="form.password" type="password" class="input-field" placeholder="••••••••"
            aria-label="Password" required />

        </div>


        <!-- Submit Button -->
        <button type="submit" :disabled="loading"
          class="btn-primary w-full py-3 text-base font-semibold transition-all duration-200">
          <span v-if="loading" class="inline-flex items-center gap-2">
            <span
              class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Setting new password...
          </span>
          <span v-else>Reset Now</span>
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
})

const { $supabase } = useNuxtApp()
const loading = ref(false);

const form = ref({
  email: '',
  password: '',
})

const resetPassword = async () => {
  loading.value = true;
  const { error } = await $supabase.auth.updateUser({
    password: form.value.password
  })

  if (!error) {
    return navigateTo('/auth/login')
  }
}
</script>
