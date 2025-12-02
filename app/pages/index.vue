<template>
  <div class="min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:py-12">
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-8 md:mb-12">
        <div class="inline-block mb-4 p-3 bg-linear-to-br from-urban-indigo to-urban-slate rounded-full">
          <span class="text-4xl">📋</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-urban-darkslate mb-3">JobTracker</h1>
        <p class="text-urban-slate text-lg md:text-xl">Organize your job search, one application at a time</p>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
        <NuxtLink to="/auth/login" class="btn-primary text-center block w-full py-3 md:py-4 text-base md:text-lg">
          👤 Login
        </NuxtLink>
        <NuxtLink to="/auth/register" class="btn-secondary text-center block w-full py-3 md:py-4 text-base md:text-lg">
          ✨ Create Account
        </NuxtLink>
      </div>

      <!-- Features Card -->
      <div class="card">
        <h2 class="text-2xl md:text-3xl font-bold text-urban-darkslate mb-6">Why Use JobTracker?</h2>

        <div class="space-y-4 mb-8">
          <div class="flex items-start gap-4">
            <div class="shrink-0">
              <div
                class="flex items-center justify-center h-8 w-8 rounded-lg bg-urban-indigo text-urban-darkslate font-bold">
                ✓
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-urban-darkslate mb-1">Centralized Management</h3>
              <p class="text-urban-slate">Submit and track all your job applications in one place</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="shrink-0">
              <div
                class="flex items-center justify-center h-8 w-8 rounded-lg bg-urban-indigo text-urban-darkslate font-bold">
                ✓
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-urban-darkslate mb-1">Real-time Status Updates</h3>
              <p class="text-urban-slate">Update application status from initial contact to offer received</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="shrink-0">
              <div
                class="flex items-center justify-center h-8 w-8 rounded-lg bg-urban-indigo text-urban-darkslate font-bold">
                ✓
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-urban-darkslate mb-1">Comprehensive History</h3>
              <p class="text-urban-slate">View detailed application history and keep important job details</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="shrink-0">
              <div
                class="flex items-center justify-center h-8 w-8 rounded-lg bg-urban-indigo text-urban-darkslate font-bold">
                ✓
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-urban-darkslate mb-1">Stay Organized</h3>
              <p class="text-urban-slate">Track all job details, application dates, and follow-ups in one place</p>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="flex flex-col sm:flex-row gap-3">
          <NuxtLink to="/auth/register"
            class="btn-primary flex-1 text-center py-3 md:py-4 text-base md:text-lg font-semibold">
            Get Started Now
          </NuxtLink>
          <NuxtLink to="/auth/login"
            class="btn-outline flex-1 text-center py-3 md:py-4 text-base md:text-lg font-semibold">
            Already have an account?
          </NuxtLink>
        </div>
      </div>

      <!-- Stats or Additional Info -->
      <div class="mt-10 grid grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-2xl md:text-3xl font-bold text-urban-indigo">100%</p>
          <p class="text-sm text-urban-slate mt-1">Free to Use</p>
        </div>
        <div>
          <p class="text-2xl md:text-3xl font-bold text-urban-indigo">∞</p>
          <p class="text-sm text-urban-slate mt-1">Unlimited Apps</p>
        </div>
        <div>
          <p class="text-2xl md:text-3xl font-bold text-urban-indigo">🔒</p>
          <p class="text-sm text-urban-slate mt-1">Secure & Private</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
})
</script>
