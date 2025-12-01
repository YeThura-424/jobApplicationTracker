<template>
  <div class="min-h-screen bg-urban-50">
    <nav class="bg-urban-dark-slate text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <NuxtLink to="/" class="text-2xl font-bold text-urban-light-slate">
            JobTracker
          </NuxtLink>
          <div class="flex items-center gap-4" v-if="user">
            <span class="text-sm">{{ user.name }}</span>
            <button @click="handleLogout"
              class="btn-outline text-white border-white hover:bg-urban-dark-slate hover:bg-opacity-80">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()

const handleLogout = async () => {
  const result = await logout()
  if (result.success) {
    navigateTo('/auth/login')
  }
}
</script>
