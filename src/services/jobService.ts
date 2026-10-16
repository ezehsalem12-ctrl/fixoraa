import api from "./api";
import type { CreateJobInput, Job } from "../types/job";

interface JobsResponse {
  message: string;
  jobs: Job[];
  pagination?: {
    limit: number;
    totalJobs: number;
    page: number;
  };
}

interface SingleJobResponse {
  message: string;
  jobs: Job;
}

interface JobActionResponse {
  message: string;
  job: Job;
}

interface CreateJobResponse {
  message: string;
  data: Job;
}

// Get available jobs
export const getAvailableJobs = async (): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>("/jobs/available-jobs");
  return response.data;
};

// Get a single job
export const getJobById = async (
  id: string,
): Promise<SingleJobResponse> => {
  const response = await api.get<SingleJobResponse>(
    `/jobs/available-jobs/${id}/`,
  );

  return response.data;
};

// Get jobs posted by the logged-in customer
export const getCustomerJobs = async (): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>("/jobs/my-jobs/");
  return response.data;
};

// Create a job

export const createJob = async (
  jobData: CreateJobInput,
): Promise<CreateJobResponse> => {
  const response = await api.post<CreateJobResponse>("/jobs/", jobData);
  return response.data;
};

// Accept a job
export const acceptJob = async (jobId: string): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(`/jobs/${jobId}/accept/`);
  return response.data;
};

// Start a job
export const startJob = async (jobId: string): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(
    `/jobs/${jobId}/in-progress/`,
  );
  return response.data;
};

// Submit a job for customer review
export const submitJobForReview = async (
  jobId: string,
): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(
    `/jobs/${jobId}/update-to-review/`,
  );
  return response.data;
};

// Complete a job
export const completeJob = async (
  jobId: string,
): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(
    `/jobs/${jobId}/completed/`,
  );
  return response.data;
};

// Cancel a job
export const cancelJob = async (jobId: string): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(`/jobs/${jobId}/cancel/`);
  return response.data;
};
