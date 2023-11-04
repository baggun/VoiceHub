import mongoose, { Schema } from "mongoose";

export const tagSchema = new Schema({
  // 태그
  tag: {
    type: String,
    unique: true,
    required: true,
  },

  // 가중치
  weighting: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Tag || mongoose.model("Tag", tagSchema);
