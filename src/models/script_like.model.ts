import mongoose, { Schema, models } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

const scriptLikeSchema = new Schema({
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
    ref: "Scr",
  },

  // 알림설정
  followAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ScriptLike || mongoose.model("ScriptLike", scriptLikeSchema);
