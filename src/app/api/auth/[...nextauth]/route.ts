import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import dbConnect from "@lib/db/dbConnect";
import User from "@models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    // 인증 방식 선택 ( 현재는 "id" + "password" )
    CredentialsProvider({
      // 여기서 입력한 이름을 "signIn(이름)" 형태로 사용
      name: "Credentials",
      // 여기서 작성한 타입 그대로 아래 "authorize()"의 "credentials"의 타입 적용
      // 또한 "next-auth"에서 생성해주는 로그인창에서 사용 ( http://localhost:3000/api/auth/signin )
      credentials: {
        id: {
          label: "아이디",
          type: "text",
          placeholder: "아이디를 입력하세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력하세요.",
        },
      },

      // 로그인 유효성 검사
      // 로그인 요청인 "signIn("credentials", { id, password })"에서 넣어준 "id", "password"값이 그대로 들어옴
      async authorize(credentials, req) {
        await dbConnect();

        if (!credentials) throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

        try {
          const { id, password } = credentials;

          const user = await User.findOne({ user_id: id });
          // const exUser = await prisma.user.findUnique({
          //   where: { id },
          //   include: { photo: true },
          // });
          if (!user) throw new Error("존재하지 않는 아이디입니다.");

          const result = await bcrypt.compare(password, user.user_pw);
          if (!result) throw new Error("비밀번호가 불일치합니다.");

          // 반환하는 값중에 name, email, image만 살려서 "session.user"로 들어감
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
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          oid: user._id,
          id: user.user_id,
          nickname: user.user_nickname,
        };
      }
      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session, token }: any) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
