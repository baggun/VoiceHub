import mongoose, { Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;

export const userSchema = new Schema({
  // 아이디
  user_id: {
    type: String,
    required: true,
    unique: true,
  },

  // 닉네임
  user_nickname: {
    type: String,
    required: true,
    unique: true,
  },

  // 이메일
  user_email: {
    type: String,
    required: true,
    unique: true,
  },

  // 비밀번호
  user_pw: {
    type: String,
    required: true,
  },

  // 자기소개
  user_desc: {
    type: String,
    default: "",
  },

  // 프로필 사진
  user_profile: {
    type: String,
    required: true,
    default: "base_profile.png",
  },

  // 알림
  user_notification: {
    type: [
      {
        noticeType: String,
        target: {
          type: ObjectId,
          ref: "User",
        },
        message: String,
        date: {
          type: Date,
          default: Date.now,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  },

  // 로그
  user_log: {
    type: [String],
    default: [],
  },

  // 생성일
  user_createdAt: {
    type: Date,
    default: Date.now,
  },

  // 마지막 접속
  user_updatedAt: {
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

export default mongoose.models.User || mongoose.model("User", userSchema);
