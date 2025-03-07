import mongoose, { Schema, Document, Model } from "mongoose";

// Define interface for blog document
export interface IBlog extends Document {
  title: string;
  description: string;
  mediaType?: "image" | "video";
  code?: string;
  programmingLanguage?: string;
  file?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define Mongoose schema
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: false },
    code: { type: String, required: false },
    programmingLanguage: { type: String, required: false },
    file: { type: String, required: false },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Export model
const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;
