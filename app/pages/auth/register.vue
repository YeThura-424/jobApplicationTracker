<template>
  <div
    class="min-h-screen bg-gradient-to-br from-urban-dark-slate to-urban-slate flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <div class="card bg-white">
        <h1 class="text-3xl font-bold text-urban-dark-slate mb-6">Create Account</h1>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-urban-dark-slate mb-1">
              Full Name
            </label>
            <input v-model="form.name" type="text" class="input-field" placeholder="John Doe" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-urban-dark-slate mb-1">
              Email
            </label>
            <input v-model="form.email" type="email" class="input-field" placeholder="you@example.com" required />
          </div>

          <div>
            <label class="block text-sm font-medium text-urban-dark-slate mb-1">
              Occupation
            </label>
            <input v-model="form.occupation" type="text" class="input-field" placeholder="Software Engineer" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-urban-dark-slate mb-1">
                Age
              </label>
              <input v-model.number="form.age" type="number" class="input-field" placeholder="25" required />
            </div>

            <div>
              <label class="block text-sm font-medium text-urban-dark-slate mb-1">
                Country
              </label>
              <input v-model="form.country" type="text" class="input-field" placeholder="USA" required />
            </div>
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
            {{ loading ? 'Creating account...' : 'Register' }}
          </button>
        </form>

        <p class="mt-6 text-center text-urban-slate">
          Already have an account?
          <NuxtLink to="/auth/login" class="text-urban-indigo font-medium hover:underline">
            Login here
          </NuxtLink>
        </p>
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
  age: 0,
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
