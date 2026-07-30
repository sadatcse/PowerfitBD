import { type Status } from "@/constants/config";

/** A client testimonial as serialised over the API. */
export interface Testimonial {
  _id: string;
  clientName: string;
  company: string;
  designation: string;
  review: string;
  rating: number;
  image: string;
  displayOrder: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface TestimonialInput {
  clientName: string;
  company?: string;
  designation?: string;
  review: string;
  rating: number;
  image: string;
  displayOrder?: number;
  status?: Status;
}

export type TestimonialUpdateInput = Partial<TestimonialInput>;
