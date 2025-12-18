<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-urban-darkslate">Job Applications</h1>
        <p class="text-urban-slate mt-2 text-sm md:text-base">Track and manage all your job applications</p>
      </div>
      <NuxtLink to="/applications/new"
        class="btn-primary w-full flex gap-x-2 justify-center items-center sm:w-auto whitespace-nowrap py-2 md:py-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <path fill="currentColor"
            d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z" />
        </svg>
        <p>New Application</p>
      </NuxtLink>
    </div>

    <!-- status tabs section -->
    <div class="mb-3 flex gap-2 overflow-x-auto pb-2">
      <button @click="selectedStatus = 'all'" :class="[
        'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm md:text-base text-white',
        selectedStatus === 'all'
          ? 'bg-urban-indigo'
          : 'bg-urban-slate hover:bg-slate-500'
      ]">
        All
      </button>
      <button @click="selectedStatus = 'applied'" :class="[
        'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm md:text-base text-white',
        selectedStatus === 'applied'
          ? 'bg-urban-indigo'
          : 'bg-urban-slate hover:bg-slate-500'
      ]">
        Applied
      </button>
      <button @click="selectedStatus = 'interviewing'" :class="[
        'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm md:text-base text-white',
        selectedStatus === 'interviewing'
          ? 'bg-urban-indigo'
          : 'bg-urban-slate hover:bg-slate-500'
      ]">
        Interviewing
      </button>
      <button @click="selectedStatus = 'offered'" :class="[
        'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm md:text-base text-white',
        selectedStatus === 'offered'
          ? 'bg-urban-indigo'
          : 'bg-urban-slate hover:bg-slate-500'
      ]">
        Offered
      </button>
      <button @click="selectedStatus = 'rejected'" :class="[
        'px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm md:text-base text-white',
        selectedStatus === 'rejected'
          ? 'bg-urban-indigo'
          : 'bg-urban-slate hover:bg-slate-500'
      ]">
        Rejected
      </button>
    </div>

    <!-- search section  -->
    <div class="mb-3 flex flex-col md:flex-row gap-2">
      <input v-model="searchQuery" type="text" placeholder="Search by job title..." class="input-field" />
      <VueDatePicker v-model="appliedDate" class="" auto-apply placeholder="Select apply date"
        :formats="{ input: 'yyyy-MM-dd' }">
      </VueDatePicker>
      <div class="action-buttons flex gap-2 justify-end">
        <button @click="resetSearch()"
          class="btn-secondary flex gap-2 justify-center w-full sm:w-auto whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
            <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1">
              <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" />
              <path d="M7.5 6.5h-4v-4" />
            </g>
          </svg>
          <span class="md:hidden">Reset</span>
        </button>

        <button @click="searchApplication()"
          class="btn-primary flex gap-2 justify-center w-full sm:w-auto whitespace-nowrap">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="m21 21l-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </g>
          </svg>
          <span class="md:hidden">Search</span>
        </button>
      </div>
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
      <h2 class="text-2xl font-bold text-urban-darkslate mb-2">No applications yet</h2>
      <p class="text-urban-slate mb-8 text-base md:text-lg">Start tracking your job search today!</p>
      <NuxtLink to="/applications/new" class="btn-primary inline-block py-3 px-6">
        Submit Your First Application
      </NuxtLink>
    </div>

    <!-- Applications List -->
    <div v-else class="space-y-4 md:space-y-6">
      <div class="display-message-container flex justify-between items-center">
        <p class="text-urban-slate mb-4 text-sm md:text-base">Total Applications: {{ totalApplications }}</p>
        <p class="text-urban-slate mb-4 text-sm md:text-base">Showing {{
          applications.length }} of {{ totalApplications }}</p>
      </div>
      <div v-for="app in applications" :key="app.id" @click="navigateTo(`/applications/${app.id}`)"
        class="card-hover bg-white shadow-sm rounded-lg p-6 md:p-8">
        <!-- Top section: Title and Status -->
        <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div class="">
            <h2 class="text-lg font-bold text-urban-darkslate line-clamp-1">{{ app.job_title }}</h2>
            <p class="text-urban-slate text-sm md:text-base mt-1">{{ app.company }} • {{ app.location }} •
              <span class="text-slate-500 text-sm md:text-base">{{
                getTimeAgo(app.applied_date) }}</span>
            </p>
          </div>
          <span :class="getStatusBadgeClass(app.status)" class="whitespace-nowrap">
            {{ formatStatus(app.status) }}
          </span>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4 text-sm md:text-base">
          <div class="min-w-0">
            <p class="text-urban-dim font-semibold">Experience Level</p>
            <p class="text-urban-darkslate font-medium capitalize truncate">{{ app.experience_level }}</p>
          </div>
          <div class="min-w-0">
            <p class="text-urban-dim font-semibold">Experience</p>
            <p v-if="includeNumber(app.experience_year)" class="text-urban-darkslate font-medium">{{
              app.experience_year }} yrs</p>
            <p v-else class="text-urban-darkslate font-medium">Not Mentioned</p>
          </div>
          <div class="min-w-0">
            <p class="text-urban-dim font-semibold">Job Type</p>
            <p class="text-urban-darkslate font-medium truncate">{{ formatJobType(app.job_type) }}</p>
          </div>
          <div class="min-w-0">
            <p class="text-urban-dim font-semibold">Applied</p>
            <p class="text-urban-darkslate font-medium">{{ formatDate(app.applied_date) }}</p>
          </div>
          <div class="min-w-0">
            <p class="text-urban-dim text-sm">Applied From</p>
            <a class="text-urban-dark-slate font-medium" :href="app.job_post_link" target="_blank"
              rel="noopener noreferrer">{{
                app.applied_from }}</a>
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

      <div v-if="currentPage < totalPages" class="load-more-button flex justify-center mt-6 md:mt-8">
        <button @click="loadMoreApplications()" class="btn-primary w-full sm:w-auto whitespace-nowrap py-2 md:py-3">
          Load More Applications
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute();
const router = useRouter();

const searchQuery = ref('');
const appliedDate = ref(null);
const selectedStatus = ref(route.query.status || 'all');

const { applications, loading, totalApplications, currentPage, perPage, totalPages, getApplications } = useJobApplication()

watch(() => selectedStatus.value, () => {
  router.push({
    query: { status: selectedStatus.value }
  })
  let status = selectedStatus.value == 'all' ? null : selectedStatus.value

  getApplications({ search: searchQuery.value, status: status, applied_at: appliedDate.value, page: 1, per_page: perPage.value })
});

onMounted(() => {
  let status = selectedStatus.value == 'all' ? null : selectedStatus.value

  getApplications({ search: searchQuery.value, status: status, applied_at: appliedDate.value, page: 1, per_page: perPage.value })
})

const searchApplication = () => {
  let status = selectedStatus.value == 'all' ? null : selectedStatus.value
  getApplications({
    search: searchQuery.value, status: status, applied_at: appliedDate.value, page: 1, per_page: perPage.value
  })
}

const resetSearch = () => {
  searchQuery.value = ''
  appliedDate.value = null
  let status = selectedStatus.value == 'all' ? null : selectedStatus.value

  getApplications({ search: '', status: status, applied_at: null, page: 1, per_page: perPage.value })
}

const loadMoreApplications = () => {
  let status = selectedStatus.value == 'all' ? null : selectedStatus.value

  getApplications({ search: searchQuery.value, status: status, applied_at: appliedDate.value, page: currentPage.value + 1, per_page: perPage.value })
}

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

const getTimeAgo = (date) => {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now - past
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} minute ago`
  if (diffInHours < 24) return `${diffInHours} hour ago`
  if (diffInDays === 1) return '1 day ago'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week(s) ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month(s) ago`
  return `${Math.floor(diffInDays / 365)} year(s) ago`
}

function includeNumber(value) {
  const match = value.match(/\d+/);
  if (match?.length > 0) return true;
  return false;
}
</script>
