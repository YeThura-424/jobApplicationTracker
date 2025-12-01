<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-urban-darkslate">Job Applications</h1>
        <p class="text-urban-slate mt-2 text-sm md:text-base">Track and manage all your job applications</p>
      </div>
      <NuxtLink to="/applications/new" class="btn-primary w-full sm:w-auto whitespace-nowrap py-2 md:py-3">
        + New Application
      </NuxtLink>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div class="inline-block mb-4">
          <div class="w-12 h-12 border-4 border-urban-lightslate border-t-urban-indigo rounded-full animate-spin"></div>
        </div>
        <p class="text-urban-slate">Loading your applications...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="applications.length === 0" class="card text-center py-16 md:py-20">
      <div class="text-5xl mb-4">📭</div>
      <h2 class="text-2xl md:text-3xl font-bold text-urban-darkslate mb-2">No applications yet</h2>
      <p class="text-urban-slate mb-8 text-base md:text-lg">Start tracking your job search today!</p>
      <NuxtLink to="/applications/new" class="btn-primary inline-block py-3 px-6">
        Submit Your First Application
      </NuxtLink>
    </div>

    <!-- Applications List -->
    <div v-else class="space-y-4 md:space-y-6">
      <div v-for="app in applications" :key="app.id" @click="navigateTo(`/applications/${app.id}`)" class="card-hover">
        <!-- Top section: Title and Status -->
        <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div class="flex-1 min-w-0">
            <h2 class="text-xl md:text-2xl font-bold text-urban-darkslate truncate">{{ app.job_title }}</h2>
            <p class="text-urban-slate text-sm md:text-base mt-1">{{ app.company }} • {{ app.location }}</p>
          </div>
          <span :class="getStatusBadgeClass(app.status)" class="whitespace-nowrap">
            {{ formatStatus(app.status) }}
          </span>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-sm md:text-base">
          <div class="min-w-0">
            <p class="text-urban-dim font-semibold">Experience Level</p>
            <p class="text-urban-darkslate font-medium truncate">{{ app.experience_level }}</p>
          </div>
          <div class="min-w-0">
            <p class="text-urban-dim font-semibold">Experience</p>
            <p class="text-urban-darkslate font-medium">{{ app.experience_year }}+ yrs</p>
          </div>
          <div class="min-w-0">
            <p class="text-urban-dim font-semibold">Job Type</p>
            <p class="text-urban-darkslate font-medium truncate">{{ formatJobType(app.job_type) }}</p>
          </div>
          <div class="min-w-0">
            <p class="text-urban-dim font-semibold">Applied</p>
            <p class="text-urban-darkslate font-medium">{{ formatDate(app.applied_date) }}</p>
          </div>
        </div>

        <!-- Skills -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="skill in app.skills" :key="skill"
            class="px-3 py-1 bg-slate-100 text-urban-darkslate text-xs md:text-sm rounded-full font-medium">
            {{ skill }}
          </span>
        </div>

        <!-- Description -->
        <p class="text-sm md:text-base text-urban-slate line-clamp-2">
          {{ app.job_description.substring(0, 150) }}{{ app.job_description.length > 150 ? '...' : '' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

const { applications, loading, getApplications } = useJobApplication()

onMounted(() => {
  getApplications()
})

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatJobType = (type) => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })
}

const getStatusBadgeClass = (status) => {
  const baseClass = 'badge px-3 py-1 md:px-4 md:py-2'
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
