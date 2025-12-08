<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold text-urban-dark-slate mb-8">Submit Job Application</h1>

    <form @submit.prevent="handleSubmit" class="card space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Job Title *
          </label>
          <input v-model="form.job_title" type="text" class="input-field" placeholder="e.g., Senior Software Engineer"
            required />
        </div>

        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Company *
          </label>
          <input v-model="form.company" type="text" class="input-field" placeholder="e.g., Google" required />
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Location *
          </label>
          <input v-model="form.location" type="text" class="input-field" placeholder="e.g., San Francisco, CA"
            required />
        </div>

        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Applied From *
          </label>
          <input v-model="form.applied_from" type="text" class="input-field"
            placeholder="e.g., LinkedIn, Company Website" required />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-urban-dark-slate mb-2">
          Job Description *
        </label>
        <textarea v-model="form.job_description" class="input-field resize-none h-24"
          placeholder="Paste the job description here..." required></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-urban-dark-slate mb-2">
          Job Requirements *
        </label>
        <textarea v-model="form.job_requirements" class="input-field resize-none h-24"
          placeholder="Paste the job requirements here..." required></textarea>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Salary Expectation
          </label>
          <input v-model="form.salary_expectation" type="text" class="input-field"
            placeholder="e.g., $100,000 - $120,000" />
        </div>

        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Provided Salary
          </label>
          <input v-model="form.provided_salary" type="text" class="input-field" placeholder="e.g., $100,000" />
        </div>

        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Salary Provided Type
          </label>
          <select v-model="form.salary_provided_type" class="input-field" required>
            <option value="annual">Annual</option>
            <option value="monthly">Monthly</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Job Type *
          </label>
          <select v-model="form.job_type" class="input-field" required>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Job Location *
          </label>
          <select v-model="form.job_location" class="input-field" required placeholder="Select job location">
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <!-- applied at -->
        <div>
          <label class="block text-sm font-medium mb-2">
            Applied At *
          </label>
          <VueDatePicker v-model="form.applied_date" auto-apply placeholder="Select apply date"
            :formats="{ input: 'yyyy-MM-dd' }">
          </VueDatePicker>
          <!-- <input v-model="form.applied_at" type="date" class="input-field" required /> -->
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Experience Level *
          </label>
          <select v-model="form.experience_level" class="input-field" required>
            <option value="entry">Entry Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-urban-dark-slate mb-2">
            Years of Experience *
          </label>
          <input v-model="form.experience_year" class="input-field" placeholder="e.g., 5" required />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-urban-dark-slate mb-2">
          Skills (comma-separated)
        </label>
        <input v-model="form.skills" type="text" class="input-field" placeholder="e.g., JavaScript, Vue.js, Node.js" />
        <p class="text-xs text-urban-dim mt-1">Separate skills with commas</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-urban-dark-slate mb-2">
          Job Post Link
        </label>
        <input v-model="form.job_post_link" type="text" class="input-field"
          placeholder="e.g., https://jobposting.com" />
      </div>

      <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        {{ error }}
      </div>

      <div class="flex gap-4">
        <button type="submit" :disabled="loading"
          class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Submitting...' : 'Submit Application' }}
        </button>
        <NuxtLink to="/applications" class="btn-outline flex-1 text-center">
          Cancel
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

definePageMeta({
  middleware: 'auth',
})

const { submitApplication, loading, error } = useJobApplication()

const form = ref({
  job_title: '',
  company: '',
  location: '',
  applied_from: '',
  job_description: '',
  salary_expectation: '',
  provided_salary: '',
  salary_provided_type: 'monthly', // e.g., "annual", "monthly"
  job_location: 'on-site', // e.g., "remote", "on-site", "hybrid"
  job_type: 'full-time', // fulltime, part-time, contract, permanent
  experience_level: 'mid',
  experience_year: 0,
  job_requirements: '',
  skills: '',
  applied_date: '',
  job_post_link: ''
})

const handleSubmit = async () => {
  const skillsArray = form.value.skills
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s)

  const result = await submitApplication({
    ...form.value,
    skills: skillsArray,
  })

  if (result.success) {
    navigateTo('/applications')
  }
}
</script>
