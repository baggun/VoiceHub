import mongoose, { Schema, models } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

const voiceLikeSchema = new Schema({
  // 유저 oid
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  // 대상 oid
  voice: {
    type: ObjectId,
    required: true,
    ref: "Voice",
  },

  // 알림설정
  followAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.VoiceLike ||
  mongoose.model("VoiceLike", voiceLikeSchema);
