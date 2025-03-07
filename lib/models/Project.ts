import mongoose, { Schema, Document, Model } from "mongoose";

// Define interface for project document
export interface IProject extends Document {
  title: string;
  description: string;
  mediaType?: "image" | "video";
  file?: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define Mongoose schema
const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    mediaType: { type: String, enum: ["image", "video"], required: false },
    file: { type: String, required: false },
    url: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Export model with proper naming
const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
