<template>
  <div
    class="min-h-screen bg-gradient-to-br from-urban-dark-slate to-urban-slate flex flex-col items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">JobTracker</h1>
        <p class="text-urban-light-slate">Track your job applications easily</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <NuxtLink to="/auth/login" class="btn-primary text-center block w-full">
          Login
        </NuxtLink>
        <NuxtLink to="/auth/register" class="btn-outline text-center block w-full border-white text-white">
          Register
        </NuxtLink>
      </div>

      <div class="card bg-white bg-opacity-95">
        <h2 class="text-2xl font-bold text-urban-dark-slate mb-4">Welcome</h2>
        <p class="text-urban-slate mb-4">
          Manage all your job applications in one place. Track application statuses, keep notes, and stay organized
          throughout your job search.
        </p>
        <ul class="space-y-2 text-sm text-urban-slate">
          <li class="flex items-start">
            <span class="text-urban-indigo mr-2">✓</span>
            <span>Submit and track job applications</span>
          </li>
          <li class="flex items-start">
            <span class="text-urban-indigo mr-2">✓</span>
            <span>Update application status</span>
          </li>
          <li class="flex items-start">
            <span class="text-urban-indigo mr-2">✓</span>
            <span>View detailed application history</span>
          </li>
          <li class="flex items-start">
            <span class="text-urban-indigo mr-2">✓</span>
            <span>Keep all job details in one place</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})
</script>
