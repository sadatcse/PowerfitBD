import mongoose, { Schema, type Model, type InferSchemaType } from "mongoose";

/**
 * Contact submission model for storing public site inquiries.
 */
const contactSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters."],
      maxlength: [100, "Full name must be 100 characters or fewer."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required."],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required."],
      trim: true,
      minlength: [10, "Message must be at least 10 characters."],
      maxlength: [3000, "Message must be 3000 characters or fewer."],
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, versionKey: false },
    toObject: { virtuals: true, versionKey: false },
  },
);

contactSchema.index({ createdAt: -1 });
contactSchema.index({ fullName: "text", email: "text", subject: "text" });

export type ContactDocument = InferSchemaType<typeof contactSchema>;

export const Contact: Model<ContactDocument> =
  (mongoose.models.Contact as Model<ContactDocument>) ??
  mongoose.model<ContactDocument>("Contact", contactSchema);

export default Contact;
