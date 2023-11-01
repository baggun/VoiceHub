import mongoose, { Schema, models } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

const postLikeSchema = new Schema({
  // 유저 oid
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  // 대상 oid
  post: {
    type: ObjectId,
    required: true,
    ref: "Post",
  },

  // 알림설정
  followAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PostLike || mongoose.model("PostLike", postLikeSchema);
