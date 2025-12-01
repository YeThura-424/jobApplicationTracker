// for job_application
alter table job_application enable row level security;

create policy "Allow authenticated users to insert job application"
on job_application
for insert
to authenticated
with check (user_id = auth.uid());

create policy "Allow authenticated users to select job application"
on job_application
for select
to authenticated
using (user_id = auth.uid());

create policy "Allow authenticated users to update their own job application"
on job_application
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());


// for job_status_log
alter table job_status_log enable row level security;

create policy "Users can view their job status logs"
on job_status_log
for select
to authenticated
using (
  exists (
    select 1 from job_application
    where job_application.id = job_status_log.application_id
    and job_application.user_id = auth.uid()
  )
);


create policy "Users can insert logs for their own job applications"
on job_status_log
for insert
to authenticated
with check (
  exists (
    select 1 from job_application
    where job_application.id = job_status_log.application_id
    and job_application.user_id = auth.uid()
  )
);

create policy "Users can update their logs"
on job_status_log
for update
to authenticated
using (
  exists (
    select 1 from job_application
    where job_application.id = job_status_log.application_id
    and job_application.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from job_application
    where job_application.id = job_status_log.application_id
    and job_application.user_id = auth.uid()
  )
);
