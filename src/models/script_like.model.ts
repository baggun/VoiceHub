import mongoose, { Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

export const scriptLikeSchema = new Schema({
  // 유저 oid
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  // 대상 oid
  script: {
    type: ObjectId,
    required: true,
    ref: "Script",
  },

  // 알림설정
  followAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ScriptLike || mongoose.model("ScriptLike", scriptLikeSchema);
