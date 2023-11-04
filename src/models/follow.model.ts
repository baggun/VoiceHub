import mongoose, { Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

export const followSchema = new Schema({
  // 유저 oid
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  // 대상 oid
  target: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  // 알림설정
  followAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Follow || mongoose.model("Follow", followSchema);
