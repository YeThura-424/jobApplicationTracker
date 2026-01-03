import type { GetApplicationPayload, JobApplication, JobApplicationInput, StatusUpdateInput, JobStatusLog, JobAppliedFrom } from '~/types'

export const useJobApplication = () => {
  const applications = ref<JobApplication[]>([])
  const totalApplications = ref<number | null>(null)
  const currentApplication = ref<JobApplication | null>(null)
  const currentPage = ref(1)
  const perPage = ref(5)
  const totalPages = ref<number | null>(null)
  const statusLogs = ref<JobStatusLog[]>([])
  const jobAppliedFrom = ref<JobAppliedFrom[]>([]);
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { $supabase: supabase } = useNuxtApp()

  const submitApplication = async (input: JobApplicationInput) => {
    loading.value = true
    error.value = null

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) throw new Error('User not authenticated')

      const { data, error: submitError } = await supabase
        .from('job_application')
        .insert([
          {
            user_id: session.user.id,
            ...input,
            skills: Array.isArray(input.skills) ? input.skills : input.skills.split(',').map(s => s.trim()),
            status: 'applied',
          },
        ])
        .select()
        .single()

      if (submitError) throw submitError

      applications.value.unshift(data)

      // Create initial status log
      await supabase
        .from('job_status_log')
        .insert([
          {
            application_id: data.id,
            status: 'applied',
            updated_at: new Date().toISOString(),
            notes: 'Application submitted',
          },
        ])

      return { success: true, application: data }
    } catch (err: any) {
      error.value = err.message || 'Failed to submit application'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getApplications = async (payload: GetApplicationPayload) => {
    loading.value = true
    error.value = null

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) throw new Error('User not authenticated')

      const offset = (payload.page - 1) * payload.per_page

      let query = supabase
          .from('job_application')
          .select('*', { count: 'exact' })
          .eq('user_id', session.user.id);

      if (payload.search) {
        // query = query.like('job_title', `%${payload.search}%`)4
        query = query.or(`job_title.ilike.%${payload.search}%, company.ilike.%${payload.search}%`)
      }

      if (payload.applied_at) {
        const start = new Date(payload.applied_at)
        start.setHours(0, 0, 0, 0)

        const end = new Date(payload.applied_at)
        end.setHours(23, 59, 59, 999)

        query = query.gte('applied_date', start.toISOString())
                    .lt('applied_date', end.toISOString())
      }

      if (payload.status) {
        query = query.eq('status', payload.status)
      }

      const { data, count, error: fetchError } = await query
        .order('applied_date', { ascending: false })
        .range(offset, offset + payload.per_page - 1)

      if (fetchError) throw fetchError

      applications.value = payload.page === 1 ? (data || []) : [...applications.value, ...(data || [])]
      totalApplications.value = count
      currentPage.value = payload.page
      perPage.value = payload.per_page
      totalPages.value = Math.ceil((count ?? 0) / payload.per_page)
      return { success: true, applications: applications.value }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch applications'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getApplicationById = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('job_application')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) throw fetchError

      currentApplication.value = data
      return { success: true, application: data }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch application'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateApplicationStatus = async (applicationId: string, input: StatusUpdateInput) => {
    loading.value = true
    error.value = null

    try {
      // Update application status
      const { data, error: updateError } = await supabase
        .from('job_application')
        .update({ status: input.status })
        .eq('id', applicationId)
        .select()
        .single()

      if (updateError) throw updateError

      // Create status log entry
      const { error: logError } = await supabase
        .from('job_status_log')
        .insert([
          {
            application_id: applicationId,
            status: input.status,
            updated_at: new Date().toISOString(),
            notes: input.notes || null,
          },
        ])

      if (logError) throw logError

      currentApplication.value = data
      const index = applications.value.findIndex(app => app.id === applicationId)
      if (index !== -1) {
        applications.value[index] = data
      }

      return { success: true, application: data }
    } catch (err: any) {
      error.value = err.message || 'Failed to update application status'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getStatusLogs = async (applicationId: string) => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('job_status_log')
        .select('*')
        .eq('application_id', applicationId)
        .order('updated_at', { ascending: false })

      if (fetchError) throw fetchError

      statusLogs.value = data || []
      return { success: true, logs: statusLogs.value }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch status logs'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const getAppliedFrom = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('job_application')
        .select('applied_from', { distinct: true});

      if (fetchError) throw fetchError

      jobAppliedFrom.value = data || []
      return { success: true, appliedFrom: jobAppliedFrom.value }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch applied from data'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    applications: readonly(applications),
    totalApplications: readonly(totalApplications),
    currentApplication: readonly(currentApplication),
    statusLogs: readonly(statusLogs),
    loading: readonly(loading),
    error: readonly(error),
    currentPage: readonly(currentPage),
    perPage: readonly(perPage),
    totalPages: readonly(totalPages),
    submitApplication,
    getApplications,
    getApplicationById,
    updateApplicationStatus,
    getStatusLogs,
    getAppliedFrom,
  }
}
