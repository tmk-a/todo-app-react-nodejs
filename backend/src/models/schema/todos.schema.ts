import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  dec: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  dec: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: ["todo", "in-progress", "done"],
  },
  priority: { type: String, required: true, enum: ["low", "medium", "high"] },
});

export const TodoModel = mongoose.model<ITodo>("Todo", todoSchema);
