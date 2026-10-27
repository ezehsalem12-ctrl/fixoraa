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

// Get the first page of available jobs
export const getAvailableJobs = async (
  page = 1,
  limit = 8,
): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>("/jobs/available-jobs", {
    params: { page, limit },
  });

  return response.data;
};

// Get available jobs by category
export const getJobByCategory = async (
  category: string,
  page = 1,
  limit = 5,
): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>(
    `/jobs/category/${encodeURIComponent(category)}`,
    {
      params: { page, limit },
    },
  );

  return response.data;
};

// Get a single job by ID
export const getJobById = async (id: string): Promise<SingleJobResponse> => {
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

// Get jobs posted by the logged-in provider
export const getProviderJobs = async (): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>("/jobs/provider-jobs/");
  return response.data;
};

// Get a page of available jobs
export const getAvailableJobsPage = async (
  page = 1,
  limit = 8,
): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>("/jobs/available-jobs", {
    params: { page, limit },
  });

  return response.data;
};

// Create a job
export const createJob = async (
  jobData: CreateJobInput,
): Promise<CreateJobResponse> => {
  const response = await api.post<CreateJobResponse>("/jobs/", jobData);
  return response.data;
};

// Provider: accept a job
export const acceptJob = async (jobId: string): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(
    `/jobs/${jobId}/provider-status/`,
    { status: "accepted" },
  );

  return response.data;
};

// Provider: start a job
export const startJob = async (jobId: string): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(
    `/jobs/${jobId}/provider-status/`,
    { status: "in_progress" },
  );

  return response.data;
};

// Provider: submit a job for customer review
export const submitJobForReview = async (
  jobId: string,
): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(
    `/jobs/${jobId}/provider-status/`,
    { status: "awaiting_review" },
  );

  return response.data;
};

// Customer: complete a job
export const completeJob = async (
  jobId: string,
): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(
    `/jobs/${jobId}/customer-status/`,
    { status: "completed" },
  );

  return response.data;
};

// Customer: cancel a job
export const cancelJob = async (jobId: string): Promise<JobActionResponse> => {
  const response = await api.patch<JobActionResponse>(
    `/jobs/${jobId}/customer-status/`,
    { status: "cancelled" },
  );

  return response.data;
};
