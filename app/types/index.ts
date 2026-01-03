// User-related types
export interface User {
  id: string
  name: string
  email: string
  occupation: string
  age: number
  country: string
  created_at: string
}

export interface UserCredentials {
  name: string
  email: string
  occupation: string
  password: string
  age: number
  country: string
}

// Job Application types
export interface JobApplication {
  id: string
  user_id: string
  job_title: string
  company: string
  status: 'applied' | 'rejected' | 'interviewing' | 'offered'
  applied_date: string
  job_description: string
  location: string
  salary_expectation: string
  experience_level: string
  experience_year: number
  skills: string[]
  job_type: 'full-time' | 'part-time' | 'contract'
  applied_from: string
  created_at: string
  updated_at: string
}

export interface JobApplicationInput {
  job_title: string
  company: string
  job_description: string
  location: string
  salary_expectation: string
  provided_salary: string
  salary_provided_type: string
  experience_level: string
  experience_year: number
  skills: string[] | string
  job_type: 'full-time' | 'part-time' | 'contract'
  applied_from: string,
  job_location: string,
  applied_at: string

}

export interface JobAppliedFrom {
  applied_from: string,
}

// Job Status Log types
export interface JobStatusLog {
  id: string
  application_id: string
  status: 'applied' | 'rejected' | 'interviewing' | 'offered'
  updated_at: string
  notes?: string
}

export interface StatusUpdateInput {
  status: 'applied' | 'rejected' | 'interviewing' | 'offered'
  notes?: string
}

export interface GetApplicationPayload {
  search: string
  status: string
  applied_at: string
  page: number
  per_page: number
}
