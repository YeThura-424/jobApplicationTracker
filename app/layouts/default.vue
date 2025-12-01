<template>
  <div class="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white shadow-md border-b-4 border-urban-indigo">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">
          <!-- Logo -->
          <NuxtLink to="/applications" class="flex items-center gap-2 group">
            <div
              class="p-2 bg-linear-to-br from-urban-indigo to-urban-slate rounded-lg transition-transform duration-200 group-hover:scale-110">
              <span class="text-lg md:text-xl font-bold text-white">GR-JT</span>
            </div>
            <span
              class="hidden sm:inline text-xl md:text-2xl font-bold text-urban-darkslate group-hover:text-urban-indigo transition-colors duration-200">
              JobTracker
            </span>
          </NuxtLink>

          <!-- User Menu -->
          <div class="flex items-center gap-3 md:gap-6" v-if="user">
            <!-- User Info - Hidden on mobile -->
            <div class="hidden md:flex flex-col items-end">
              <p class="text-sm font-semibold text-urban-darkslate">{{ user.name || 'User' }}</p>
              <p class="text-xs text-urban-slate">{{ user.email }}</p>
            </div>
            <!-- Logout Button -->
            <button @click="handleLogout" class="btn-primary text-sm py-1.5 md:py-2">
              <span class="hidden sm:inline">Logout</span>
              <span class="sm:hidden">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
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
