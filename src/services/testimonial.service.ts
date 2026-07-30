import "server-only";
import Testimonial, { type TestimonialDocument } from "@/models/Testimonial";
import {
  TESTIMONIAL_SEARCH_FIELDS,
  TESTIMONIAL_SORT_FIELDS,
} from "@/lib/validations/testimonial";
import { type Testimonial as TestimonialType } from "@/types/testimonial";
import { createCrudService } from "./crud.service";

export const testimonialService = createCrudService<
  TestimonialDocument,
  TestimonialType
>({
  model: Testimonial,
  resourceName: "Testimonial",
  searchFields: TESTIMONIAL_SEARCH_FIELDS,
  sortFields: TESTIMONIAL_SORT_FIELDS,
});
