import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [100, "Title must not exceed 100 characters"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["unassigned", "assigned", "in-progress", "Complete"],
      default: "unassigned",
    },
    due_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
