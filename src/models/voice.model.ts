import mongoose, { Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

export const voiceSchema = new Schema({
  // 제목
  title: {
    type: String,
    required: true,
  },

  // [likes]
  // voice_like - schema

  // [scripts]
  // script - schema
  script: {
    type: ObjectId,
    ref: "Script",
  },

  comments: {
    type: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        content: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },

  voice_src: {
    type: String,
    required: true,
    default: "", // TOOD : 나중에 지워야 함
  },

  author: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  tags: {
    type: [String],
  },

  // 생성일
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Soft Delete
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.models.Voice || mongoose.model("Voice", voiceSchema);
