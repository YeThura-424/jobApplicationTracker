import { supabase } from '~/utils/supabase'
import type { JobApplication, JobApplicationInput, StatusUpdateInput, JobStatusLog } from '~/types'

export const useJobApplication = () => {
  const applications = ref<JobApplication[]>([])
  const currentApplication = ref<JobApplication | null>(null)
  const statusLogs = ref<JobStatusLog[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const submitApplication = async (input: JobApplicationInput) => {
    loading.value = true
    error.value = null

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) throw new Error('User not authenticated')

      const { data, error: submitError } = await supabase
        .from('job_applications')
        .insert([
          {
            user_id: session.user.id,
            ...input,
            skills: Array.isArray(input.skills) ? input.skills : input.skills.split(',').map(s => s.trim()),
            status: 'applied',
            applied_date: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (submitError) throw submitError

      applications.value.unshift(data)

      // Create initial status log
      await supabase
        .from('job_status_logs')
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

  const getApplications = async () => {
    loading.value = true
    error.value = null

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) throw new Error('User not authenticated')

      const { data, error: fetchError } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('applied_date', { ascending: false })

      if (fetchError) throw fetchError

      applications.value = data || []
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
        .from('job_applications')
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
        .from('job_applications')
        .update({ status: input.status })
        .eq('id', applicationId)
        .select()
        .single()

      if (updateError) throw updateError

      // Create status log entry
      const { error: logError } = await supabase
        .from('job_status_logs')
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
        .from('job_status_logs')
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

  return {
    applications: readonly(applications),
    currentApplication: readonly(currentApplication),
    statusLogs: readonly(statusLogs),
    loading: readonly(loading),
    error: readonly(error),
    submitApplication,
    getApplications,
    getApplicationById,
    updateApplicationStatus,
    getStatusLogs,
  }
}
