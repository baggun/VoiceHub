import mongoose, { Schema } from "mongoose";

export const contestSchema = new Schema(
  {
    // 공모 이름
    contest: {
      type: String,
      required: true,
    },

    // 썸네일
    thumbnail: {
      type: String,
    },

    // 주최
    company: {
      type: String,
      required: true,
    },

    // 조회수
    hit: {
      type: Number,
      default: 0,
    },

    // 시작일
    startDate: {
      type: Date,
      required: true,
    },
    // 마감일
    endDate: {
      type: Date,
      required: true,
    },
  },
  {},
);

export default mongoose.models.Contest || mongoose.model("Contest", contestSchema);
