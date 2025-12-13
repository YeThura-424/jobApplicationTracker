<template>
  <div>
    <NuxtLink to="/applications" class="text-urban-indigo hover:underline mb-6 inline-block">
      ← Back to Applications
    </NuxtLink>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block">
        <div class="w-8 h-8 border-4 border-urban-light-slate border-t-urban-indigo rounded-full animate-spin"></div>
      </div>
    </div>

    <div v-else-if="currentApplication" class="space-y-6">
      <!-- Application Header -->
      <div class="card">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-3xl font-bold text-urban-dark-slate">{{ currentApplication.job_title }}</h1>
            <p class="text-xl text-urban-slate mt-1">{{ currentApplication.company }}</p>
          </div>
          <span :class="getStatusBadgeClass(currentApplication.status)">
            {{ formatStatus(currentApplication.status) }}
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 pb-6 border-b border-urban-100">
          <div>
            <p class="text-urban-dim text-sm">Location</p>
            <p class="text-urban-dark-slate font-medium">{{ currentApplication.location }}</p>
          </div>
          <div>
            <p class="text-urban-dim text-sm">Job Type</p>
            <p class="text-urban-dark-slate font-medium">{{ formatJobType(currentApplication.job_type) }}</p>
          </div>
          <div>
            <p class="text-urban-dim text-sm">Applied Date</p>
            <p class="text-urban-dark-slate font-medium">{{ formatDate(currentApplication.applied_date) }}</p>
          </div>
          <div>
            <p class="text-urban-dim text-sm">Applied From</p>
            <a class="text-urban-dark-slate font-medium" :href="currentApplication.job_post_link" target="_blank"
              rel="noopener noreferrer">{{
                currentApplication.applied_from }}</a>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p class="text-urban-dim text-sm">Experience Level</p>
            <p class="text-urban-dark-slate capitalize font-medium">{{ currentApplication.experience_level }}</p>
          </div>
          <div>
            <p class="text-urban-dim text-sm">Experience Years</p>
            <p class="text-urban-dark-slate font-medium">{{ currentApplication.experience_year }} years</p>
          </div>
          <div>
            <p class="text-urban-dim text-sm">Salary Expectation</p>
            <p class="text-urban-dark-slate font-medium">{{ currentApplication.salary_expectation || 'Not specified' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Job Description -->
      <div class="card">
        <h2 class="text-xl font-bold text-urban-dark-slate mb-4">Job Description</h2>
        <p class="text-urban-slate whitespace-pre-wrap">{{ currentApplication.job_description }}</p>
      </div>

      <!-- Job Description -->
      <div v-if="currentApplication.job_requirements" class="card">
        <h2 class="text-xl font-bold text-urban-dark-slate mb-4">Job Requirements</h2>
        <p class="text-urban-slate whitespace-pre-wrap">{{ currentApplication.job_requirements }}</p>
      </div>

      <!-- Skills -->
      <div class="card">
        <h2 class="text-xl font-bold text-urban-dark-slate mb-4">Skills</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="skill in currentApplication.skills" :key="skill"
            class="px-3 py-1 bg-slate-100 text-urban-darkslate text-xs md:text-sm rounded-full font-medium">
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Status Update Section -->
      <div class="card bg-urban-50 border-2 border-urban-200">
        <h2 class="text-xl font-bold text-urban-dark-slate mb-4">Update Status</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-urban-dark-slate mb-2">
              New Status
            </label>
            <select v-model="statusUpdate.status" class="input-field" :disabled="updatingStatus">
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offered">Offered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-urban-dark-slate mb-2">
              Notes
            </label>
            <textarea v-model="statusUpdate.notes" class="input-field resize-none h-20"
              placeholder="Add any notes about this status update..." :disabled="updatingStatus"></textarea>
          </div>

          <div v-if="statusError" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ statusError }}
          </div>

          <button @click="handleStatusUpdate" :disabled="updatingStatus"
            class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {{ updatingStatus ? 'Updating...' : 'Update Status' }}
          </button>
        </div>
      </div>

      <!-- Status History -->
      <div class="card">
        <h2 class="text-xl font-bold text-urban-dark-slate mb-4">Status History</h2>
        <div v-if="logsLoading" class="text-center py-8">
          <div class="inline-block">
            <div class="w-6 h-6 border-3 border-urban-light-slate border-t-urban-indigo rounded-full animate-spin">
            </div>
          </div>
        </div>
        <div v-else-if="statusLogs.length === 0" class="text-center py-8 text-urban-slate">
          No status updates yet
        </div>
        <div v-else class="space-y-4">
          <div v-for="log in statusLogs" :key="log.id" class="pb-4 border-b border-urban-100 last:border-0">
            <div class="flex justify-between items-start mb-2">
              <span :class="getStatusBadgeClass(log.status)">
                {{ formatStatus(log.status) }}
              </span>
              <span class="text-sm text-urban-dim">{{ formatDateTime(log.updated_at) }}</span>
            </div>
            <p v-if="log.notes" class="text-urban-slate text-sm">{{ log.notes }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card text-center py-12">
      <p class="text-urban-slate">Application not found</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const { currentApplication, loading, statusLogs, getApplicationById, getStatusLogs, updateApplicationStatus } = useJobApplication()

const updatingStatus = ref(false)
const statusError = ref(null)
const logsLoading = ref(false)

const statusUpdate = ref({
  status: 'applied',
  notes: '',
})

const applicationId = route.params.id

onMounted(async () => {
  await getApplicationById(applicationId)
  if (currentApplication.value) {
    statusUpdate.value.status = currentApplication.value.status
    await loadStatusLogs()
  }
})

const loadStatusLogs = async () => {
  logsLoading.value = true
  await getStatusLogs(applicationId)
  logsLoading.value = false
}

const handleStatusUpdate = async () => {
  updatingStatus.value = true
  statusError.value = null

  const result = await updateApplicationStatus(applicationId, {
    status: statusUpdate.value.status,
    notes: statusUpdate.value.notes || undefined,
  })

  if (result.success) {
    statusUpdate.value.notes = ''
    await loadStatusLogs()
  } else {
    statusError.value = result.error
  }

  updatingStatus.value = false
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatJobType = (type) => {
  return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleString()
}

const getStatusBadgeClass = (status) => {
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
