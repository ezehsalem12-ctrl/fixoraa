export type JobStatus =
  | "requested"
  | "accepted"
  | "in_progress"
  | "awaiting_review"
  | "completed"
  | "cancelled";

export type JobCategory =
  | "plumbing"
  | "electricals"
  | "cleaning"
  | "painting"
  | "carpentry"
  | "writing"
  | "laundry"
  | "tutoring"
  | "gardening"
  | "other";

export type Job = {
  _id: string;
  service: string;
  description: string;
  category: JobCategory;
  location: string;
  price: number;
  status: JobStatus;
  customer:
    | {
        _id?: string;
        name?: string;
      }
    | string;
  provider?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateJobInput = {
  service: string;
  description: string;
  category: JobCategory;
  location: string;
  price: number;
};
