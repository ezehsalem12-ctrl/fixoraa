import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  acceptJob,
  getProviderJobs,
  startJob,
  submitJobForReview,
} from "../services/jobService";

export type JobAction = "accept" | "start" | "review";

export const useProviderJobs = () => {
  const queryClient = useQueryClient();

  const jobsQuery = useQuery({
    queryKey: ["provider-jobs"],
    queryFn: getProviderJobs,
  });

  const actionMutation = useMutation({
    mutationFn: ({ jobId, action }: { jobId: string; action: JobAction }) => {
      switch (action) {
        case "accept":
          return acceptJob(jobId);
        case "start":
          return startJob(jobId);
        case "review":
          return submitJobForReview(jobId);
      }
    },

    onSuccess: async (_response, variables) => {
      const messages: Record<JobAction, string> = {
        accept: "Job accepted successfully.",
        start: "You have started this job.",
        review: "Job submitted for customer review.",
      };

      toast.success(messages[variables.action]);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["provider-jobs"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["available-jobs"],
        }),
      ]);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update this job. Please try again.",
      );
    },
  });

  return {
    ...jobsQuery,
    jobs: jobsQuery.data?.jobs ?? [],
    actionMutation,
  };
};
