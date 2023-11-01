import mongoose, { Schema, models } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

const voiceSchema = new Schema({
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
    ref: "Scr",
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
});

export default mongoose.models.Voice || mongoose.model("Voice", voiceSchema);
