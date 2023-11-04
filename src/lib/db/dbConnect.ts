import mongoose, { mongo } from "mongoose";

import { voiceSchema } from "@models/voice.model";
import { userSchema } from "@models/user.model";
import { voiceLikeSchema } from "@models/voice_like.model";
import { tagSchema } from "@models/tag.model";
import { scriptSchema } from "@models/script.model";
import { scriptLikeSchema } from "@models/script_like.model";
import { postSchema } from "@models/post.model";
import { postLikeSchema } from "@models/post_like.model";
import { followSchema } from "@models/follow.model";
import { contestSchema } from "@models/contest.model";

declare global {
  var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then(mongoose => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;

    mongoose.model("User", voiceSchema);
    mongoose.model("Voice", voiceSchema);
    mongoose.model("VoiceLike", voiceLikeSchema);
    mongoose.model("Tag", tagSchema);
    mongoose.model("Script", scriptSchema);
    mongoose.model("ScriptLike", scriptLikeSchema);
    mongoose.model("Post", postSchema);
    mongoose.model("PostLike", postLikeSchema);
    mongoose.model("Follow", followSchema);
    mongoose.model("Contest", contestSchema);
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
