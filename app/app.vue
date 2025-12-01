<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  title: 'Job Tracker - Manage Your Job Applications Efficiently',
  meta: [
    { name: 'description', content: 'My amazing site.' },
  ],
})
</script>