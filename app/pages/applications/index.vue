<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-urban-dark-slate">Job Applications</h1>
      <NuxtLink to="/applications/new" class="btn-primary">
        + New Application
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block">
        <div class="w-8 h-8 border-4 border-urban-light-slate border-t-urban-indigo rounded-full animate-spin"></div>
      </div>
    </div>

    <div v-else-if="applications.length === 0" class="card text-center py-12">
      <p class="text-urban-slate mb-4">No applications yet. Start tracking your job search!</p>
      <NuxtLink to="/applications/new" class="btn-primary inline-block">
        Submit Your First Application
      </NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <div v-for="app in applications" :key="app.id" @click="navigateTo(`/applications/${app.id}`)" class="card-hover">
        <div class="flex justify-between items-start mb-3">
          <div>
            <h2 class="text-xl font-bold text-urban-dark-slate">{{ app.job_title }}</h2>
            <p class="text-urban-slate">{{ app.company }} • {{ app.location }}</p>
          </div>
          <span :class="getStatusBadgeClass(app.status)">
            {{ formatStatus(app.status) }}
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3 text-sm">
          <div>
            <p class="text-urban-dim">Experience Level</p>
            <p class="text-urban-dark-slate font-medium">{{ app.experience_level }}</p>
          </div>
          <div>
            <p class="text-urban-dim">Experience Years</p>
            <p class="text-urban-dark-slate font-medium">{{ app.experience_year }}+ years</p>
          </div>
          <div>
            <p class="text-urban-dim">Job Type</p>
            <p class="text-urban-dark-slate font-medium">{{ formatJobType(app.job_type) }}</p>
          </div>
          <div>
            <p class="text-urban-dim">Applied</p>
            <p class="text-urban-dark-slate font-medium">{{ formatDate(app.applied_date) }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mb-3">
          <span v-for="skill in app.skills" :key="skill"
            class="px-2 py-1 bg-urban-100 text-urban-dark-slate text-xs rounded">
            {{ skill }}
          </span>
        </div>

        <p class="text-sm text-urban-slate">
          {{ app.job_description.substring(0, 100) }}...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { applications, loading, getApplications } = useJobApplication()

onMounted(() => {
  getApplications()
})

const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatJobType = (type: string) => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const getStatusBadgeClass = (status: string) => {
  const baseClass = 'badge px-3 py-1'
  switch (status) {
    case 'offered':
      return `${baseClass} badge-success`
    case 'interviewing':
      return `${baseClass} badge-interviewing`
    case 'rejected':
      return `${baseClass} badge-rejected`
    default:
      return `${baseClass} badge-pending`
  }
}
</script>
