import mongoose, { Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

export const postSchema = new Schema({
  // 글 제목
  title: {
    type: String,
    required: true,
    unique: true,
  },

  // 글 내용
  content: {
    type: String,
    required: true,
  },

  // 글 타입
  type: {
    type: String,
    required: true,
  },

  // 작성자
  author: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  tags: {
    type: [String],
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

  // 생성일
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});
postSchema.set("toJSON", {
  virtuals: true, // 가상 필드를 포함시킬지 여부
}); 

export default mongoose.models.Post || mongoose.model("Post", postSchema);
