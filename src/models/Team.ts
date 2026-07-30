import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";
import { STATUS } from "@/constants/config";

/**
 * Team member (trainer / staff) shown on the public Team page and managed
 * from the dashboard.
 */

const socialsSchema = new Schema(
  {
    facebook: { type: String, trim: true, default: "" },
    linkedin: { type: String, trim: true, default: "" },
    instagram: { type: String, trim: true, default: "" },
    twitter: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
      maxlength: [80, "Name must be 80 characters or fewer."],
    },
    designation: {
      type: String,
      required: [true, "Designation is required."],
      trim: true,
      maxlength: [120, "Designation must be 120 characters or fewer."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      maxlength: [2000, "Description must be 2000 characters or fewer."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
      trim: true,
    },
    socials: { type: socialsSchema, default: () => ({}) },
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

/** Drives the default public ordering: manual order first, then newest. */
teamSchema.index({ displayOrder: 1, createdAt: -1 });

/** Backs the dashboard search box across name and designation. */
teamSchema.index({ name: "text", designation: "text" });

/** Convenience for card headers — "Marcus Vane · Head Coach". */
teamSchema.virtual("displayTitle").get(function (this: { name: string; designation: string }) {
  return `${this.name} · ${this.designation}`;
});

export type TeamDocument = InferSchemaType<typeof teamSchema>;

/**
 * Model registry guard: Next hot-reloads modules in dev, and re-registering a
 * schema on an existing name throws `OverwriteModelError`.
 */
export const Team: Model<TeamDocument> =
  (mongoose.models.Team as Model<TeamDocument>) ??
  mongoose.model<TeamDocument>("Team", teamSchema);

export default Team;
