import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import dbConnect from "@lib/db/dbConnect";
import User from "@models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        id: {
          label: "아이디",
          type: "text",
        },
        password: {
          label: "비밀번호",
          type: "password",
        },
      },

      async authorize(credentials, req) {
        await dbConnect();

        if (!credentials) throw new Error("Wrong input error - auth");

        try {
          const { id, password } = credentials;

          const user = await User.findOne({ user_id: id });

          if (!user) throw JSON.stringify({ success: false, message: `일치하는 아이디가 없습니다.`, error: "id" });

          const result = await bcrypt.compare(password, user.user_pw);
          if (!result)
            throw JSON.stringify({ success: false, message: "비밀번호가 옳지 않습니다.", error: "password" });

          return user;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, trigger, user, session }: any) {
      if (user) {
        token.user = {
          oid: user._id,
          id: user.user_id,
          nickname: user.user_nickname,
          profile: user.user_profile,
        };
      }
      // console.log('UPDATE SESS', token)

      if (trigger === "update" && session?.nickname) {
        token.user.nickname = session.nickname;
      }
      if (trigger === "update" && session?.profile) {
        token.user.profile = session.profile;
      }

      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session, trigger, token, newSession }: any) {
      if (token) {
        session.user = token.user;
      }

      if (trigger === "update" && newSession?.nickname) {
        session.user.nickname = newSession.nickname;
      }
      if (trigger === "update" && newSession?.profile) {
        session.user.nickname = newSession.profile;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
