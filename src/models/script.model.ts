import mongoose, { Schema, models } from "mongoose";

const scriptSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  script: {
    type: String,
    required: true,
    default: "",
  },

  tags: {
    type: [String],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Script || mongoose.model("Script", scriptSchema);
