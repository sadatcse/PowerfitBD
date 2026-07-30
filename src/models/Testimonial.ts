import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";
import { RATING, STATUS } from "@/constants/config";

/** Client testimonial shown on the public site and managed from the dashboard. */

const testimonialSchema = new Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required."],
      trim: true,
      minlength: [2, "Client name must be at least 2 characters."],
      maxlength: [80, "Client name must be 80 characters or fewer."],
    },
    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: [120, "Company must be 120 characters or fewer."],
    },
    designation: {
      type: String,
      trim: true,
      default: "",
      maxlength: [120, "Designation must be 120 characters or fewer."],
    },
    review: {
      type: String,
      required: [true, "Review is required."],
      trim: true,
      minlength: [10, "Review must be at least 10 characters."],
      maxlength: [1500, "Review must be 1500 characters or fewer."],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
      min: [RATING.min, `Rating must be at least ${RATING.min}.`],
      max: [RATING.max, `Rating must be at most ${RATING.max}.`],
      // Guards against fractional ratings sneaking past the numeric range.
      validate: {
        validator: Number.isInteger,
        message: "Rating must be a whole number.",
      },
    },
    image: {
      type: String,
      required: [true, "Image is required."],
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order cannot be negative."],
    },
    status: {
      type: String,
      enum: {
        values: Object.values(STATUS),
        message: "Status must be either active or inactive.",
      },
      default: STATUS.active,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true, versionKey: false },
  },
);

testimonialSchema.index({ displayOrder: 1, createdAt: -1 });
testimonialSchema.index({ clientName: "text", company: "text" });

/** Short preview used in the dashboard table cell. */
testimonialSchema
  .virtual("excerpt")
  .get(function (this: { review: string }) {
    return this.review.length > 120
      ? `${this.review.slice(0, 120)}…`
      : this.review;
  });

export type TestimonialDocument = InferSchemaType<typeof testimonialSchema>;

export const Testimonial: Model<TestimonialDocument> =
  (mongoose.models.Testimonial as Model<TestimonialDocument>) ??
  mongoose.model<TestimonialDocument>("Testimonial", testimonialSchema);

export default Testimonial;
