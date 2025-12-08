<template>
  <div class="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white shadow-md border-b-4 border-urban-indigo">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 md:h-20">
          <!-- Logo -->
          <NuxtLink to="/applications" class="flex items-center gap-2 group">
            <span
              class="text-xl md:text-2xl font-bold text-urban-darkslate group-hover:text-urban-indigo transition-colors duration-200">
              GR-JT
            </span>
          </NuxtLink>

          <!-- User Menu Dropdown -->
          <div class="relative" v-if="user">
            <button @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-3 cursor-pointer transition-colors duration-200 focus:outline-none">
              <!-- User Avatar -->
              <div
                class="w-10 h-10 rounded-full bg-linear-to-br from-urban-indigo to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {{ getUserInitials(user.name) }}
              </div>
            </button>

            <!-- Dropdown Menu -->
            <Transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <div v-show="isDropdownOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-50 overflow-hidden"
                @click.stop>
                <!-- User Info Section -->
                <div class="px-4 py-4 border-b border-slate-100 bg-slate-50">
                  <p class="text-sm font-semibold text-urban-darkslate">{{ user.name || 'User' }}</p>
                  <p class="text-xs text-urban-slate mt-1">{{ user.occupation }}</p>
                </div>

                <!-- Logout Option -->
                <button @click="handleLogout"
                  class="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-200">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto custom-scrollbar px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const isDropdownOpen = ref(false)

// Get user initials for avatar
const getUserInitials = (name: string | undefined): string => {
  if (!name) return 'U'
  return name.slice(0, 2).toUpperCase()
}

const handleLogout = async () => {
  isDropdownOpen.value = false
  const result = await logout()
  if (result.success) {
    navigateTo('/auth/login')
  }
}
</script>
